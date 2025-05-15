export interface PromptRequest {
  userInput: string;
  tone?: string;
  role?: string;
}

export interface EnhancedPromptResponse {
  enhancedPrompt: string;
  detectedLanguage: string;
}

export interface ExamplePrompt {
  id: number;
  originalText: string;
  enhancedText: string;
  language: string;
  tone?: string;
  role?: string;
}

export interface User {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
