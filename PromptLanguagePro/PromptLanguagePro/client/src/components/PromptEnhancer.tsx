import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { PromptRequest, EnhancedPromptResponse, ExamplePrompt } from "@/types";
import { LanguageImages } from "./LanguageImages";
import { ExamplePrompt as ExamplePromptComponent } from "./ExamplePrompt";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Copy, Wand2, RotateCcw, Languages, Lightbulb } from "lucide-react";

// Form schema
const formSchema = z.object({
  userInput: z.string().min(1, "Input is required"),
  tone: z.string().optional(),
  role: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PromptEnhancerProps {
  examples: ExamplePrompt[];
}

export function PromptEnhancer({ examples }: PromptEnhancerProps) {
  const { toast } = useToast();
  const [enhancedResult, setEnhancedResult] = useState<EnhancedPromptResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form definition
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInput: "",
      tone: "none",
      role: "none",
    },
  });

  // Form submission handler
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setEnhancedResult(null);
    
    try {
      console.log("Form submitted with values:", values);
      
      const requestData = {
        userInput: values.userInput,
        tone: values.tone === "none" ? undefined : values.tone,
        role: values.role === "none" ? undefined : values.role,
      };
      
      console.log("Sending request to /api/enhance:", requestData);
      
      const response = await fetch("/api/enhance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      
      console.log("Received response:", response);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Parsed response data:", data);
      
      setEnhancedResult(data);
      
      toast({
        title: "Success!",
        description: "Your prompt has been enhanced.",
      });
    } catch (error) {
      console.error("Error enhancing prompt:", error);
      toast({
        title: "Error",
        description: "Failed to enhance prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Copy to clipboard
  const copyToClipboard = () => {
    if (enhancedResult) {
      navigator.clipboard.writeText(enhancedResult.enhancedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      });
    }
  };

  // Reset form
  const resetForm = () => {
    form.reset();
    setEnhancedResult(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Input Section */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-heading font-semibold text-gray-800 mb-6">
            Input Your Request
          </h2>

          {/* Language Images */}
          <LanguageImages />

          {/* Instructions */}
          <div className="bg-primary-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700">
              Enter your request in{" "}
              <span className="font-semibold">any major Indian language</span> or
              English. We'll detect, translate (if needed), and enhance it into a
              powerful prompt.
            </p>
          </div>

          {/* Input Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Text Input */}
              <FormField
                control={form.control}
                name="userInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your request</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your request in Hindi, Tamil, Bengali, Kannada, English, or any major Indian language..."
                        className="multilingual-input min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Dropdowns Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tone Dropdown */}
                <FormField
                  control={form.control}
                  name="tone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose a Tone (Optional)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a tone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="Professional">Professional</SelectItem>
                          <SelectItem value="Casual">Casual</SelectItem>
                          <SelectItem value="Creative">Creative</SelectItem>
                          <SelectItem value="Formal">Formal</SelectItem>
                          <SelectItem value="Enthusiastic">Enthusiastic</SelectItem>
                          <SelectItem value="Academic">Academic</SelectItem>
                          <SelectItem value="Persuasive">Persuasive</SelectItem>
                          <SelectItem value="Instructional">Instructional</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Role Dropdown */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose a Role (Optional)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="Teacher">Teacher</SelectItem>
                          <SelectItem value="Friend">Friend</SelectItem>
                          <SelectItem value="Career Coach">Career Coach</SelectItem>
                          <SelectItem value="Marketing Expert">Marketing Expert</SelectItem>
                          <SelectItem value="Student">Student</SelectItem>
                          <SelectItem value="Study Partner">Study Partner</SelectItem>
                          <SelectItem value="Project Partner">Project Partner</SelectItem>
                          <SelectItem value="Research Assistant">Research Assistant</SelectItem>
                          <SelectItem value="Academic Advisor">Academic Advisor</SelectItem>
                          <SelectItem value="Exam Prep Coach">Exam Prep Coach</SelectItem>
                          <SelectItem value="Creative Writer">Creative Writer</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  type="submit"
                  className={`flex-1 transition-all duration-300 ${
                    isLoading 
                      ? "bg-amber-500 hover:bg-amber-600" 
                      : "bg-orange-500 hover:bg-orange-600"
                  } text-white font-medium`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="animate-pulse">Processing...</span>
                    </div>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      ENHANCE
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={resetForm}
                  disabled={isLoading}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Right Column: Output Section */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-heading font-semibold text-gray-800 mb-6">
            Output
          </h2>

          {/* Result Display */}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-lg border border-gray-200 p-6 mb-6"
              >
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-t-orange-500 border-r-orange-300 border-b-orange-200 border-l-orange-400 rounded-full animate-spin"></div>
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-lg font-medium text-gray-700">Processing...</h3>
                  </div>
                </div>
              </motion.div>
            ) : enhancedResult ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 relative">
                  {/* Original Language Display (if detected) */}
                  {enhancedResult.detectedLanguage !== "English" && (
                    <div className="mb-2">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        <Languages className="mr-1 h-3 w-3" />
                        Detected: {enhancedResult.detectedLanguage}
                      </Badge>
                    </div>
                  )}

                  {/* Enhanced Prompt */}
                  <p className="text-gray-800 whitespace-pre-line font-medium">{enhancedResult.enhancedPrompt}</p>

                  {/* Copy Button */}
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute top-3 right-3 h-8 w-8"
                    onClick={copyToClipboard}
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-50 rounded-lg border border-dashed border-gray-300 p-6 flex items-center justify-center h-36 mb-6"
              >
                <p className="text-gray-500 font-medium">
                  Enter your text and click ENHANCE
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Examples Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Example Prompts</h3>

            <div className="space-y-4">
              {examples.map((example) => (
                <ExamplePromptComponent key={example.id} example={example} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
