import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { detectLanguage, translateText } from "./services/languageService";
import { enhancePrompt } from "./services/promptService";
import { promptSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);
  
  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  // API endpoint to enhance prompts
  app.post("/api/enhance", async (req, res) => {
    try {
      console.log("Received enhance request with body:", req.body);
      
      // Validate request body
      const validatedData = promptSchema.parse(req.body);
      console.log("Validated data:", validatedData);
      
      // Detect language
      console.log("Detecting language for:", validatedData.userInput);
      const detectedLanguage = await detectLanguage(validatedData.userInput);
      console.log("Detected language:", detectedLanguage);
      
      // Translate if not in English
      let textToEnhance = validatedData.userInput;
      if (detectedLanguage !== "English") {
        console.log("Translating from", detectedLanguage, "to English");
        textToEnhance = await translateText(validatedData.userInput);
        console.log("Translated text:", textToEnhance);
      }
      
      // Enhance prompt
      console.log("Enhancing prompt with tone:", validatedData.tone, "and role:", validatedData.role);
      const enhancedPrompt = enhancePrompt(
        textToEnhance,
        detectedLanguage,
        validatedData.tone,
        validatedData.role
      );
      console.log("Enhanced prompt:", enhancedPrompt);
      
      const responseData = {
        enhancedPrompt,
        detectedLanguage
      };
      
      console.log("Sending response:", responseData);
      res.json(responseData);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        console.error("Validation error:", validationError.message);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error processing prompt:", error);
        res.status(500).json({ message: "Failed to enhance prompt" });
      }
    }
  });

  // API endpoint to get example prompts
  app.get("/api/examples", async (req, res) => {
    try {
      // Get examples from the database
      const examples = await storage.getExamplePrompts();
      
      // If no examples found, seed the database with initial examples
      if (examples.length === 0) {
        console.log("No examples found in database, seeding initial examples...");
        
        // Define initial example prompts
        const initialExamples = [
          {
            originalText: "मुझे एक बायोडाटा बनवाना है",
            enhancedText: "Act as a professional career coach. Help me write a strong resume including skills, experience, education, and achievements.",
            language: "Hindi",
            tone: "Professional",
            role: "Career Coach"
          },
          {
            originalText: "Tell me a funny story for kids",
            enhancedText: "Act as a teacher. Tell a funny and imaginative story suitable for 7-year-old kids.",
            language: "English",
            tone: "Creative",
            role: "Teacher"
          },
          {
            originalText: "ಮುಂಬರುವ ಪರೀಕ್ಷೆಗೆ ಅಭ್ಯಾಸ ಮಾಡಲು ಸಹಾಯ ಮಾಡಿ",
            enhancedText: "Act as a professional teacher. Help me create an effective study plan for my upcoming exam with specific strategies, time management tips, and subject prioritization.",
            language: "Kannada",
            tone: "Professional",
            role: "Teacher"
          }
        ];
        
        // Insert each example into the database
        for (const example of initialExamples) {
          await storage.createExamplePrompt(example);
        }
        
        // Fetch the newly added examples
        const seededExamples = await storage.getExamplePrompts();
        res.json(seededExamples);
      } else {
        // Return existing examples
        res.json(examples);
      }
    } catch (error) {
      console.error("Error fetching examples:", error);
      res.status(500).json({ message: "Failed to fetch example prompts" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
