import { PromptRequest, EnhancedPromptResponse, ExamplePrompt } from "@/types";
import { apiRequest } from "./queryClient";

/**
 * Enhance a prompt based on the input, tone, and role
 */
export async function enhancePrompt(
  promptData: PromptRequest
): Promise<EnhancedPromptResponse> {
  try {
    console.log("Sending prompt data to API:", promptData);
    const response = await fetch("/api/enhance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(promptData),
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error:", response.status, errorText);
      throw new Error(`API error: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    console.log("API response:", result);
    return result;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    throw error;
  }
}

/**
 * Get example prompts
 */
export async function getExamplePrompts(): Promise<ExamplePrompt[]> {
  const response = await fetch("/api/examples", {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch example prompts");
  }
  
  return response.json();
}
