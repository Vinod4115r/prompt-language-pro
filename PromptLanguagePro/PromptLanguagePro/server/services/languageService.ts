// Mapping of language patterns to detect language
const languagePatterns = {
  Hindi: /[\u0900-\u097F]/,
  Tamil: /[\u0B80-\u0BFF]/,
  Bengali: /[\u0980-\u09FF]/,
  Kannada: /[\u0C80-\u0CFF]/,
  Malayalam: /[\u0D00-\u0D7F]/,
  Telugu: /[\u0C00-\u0C7F]/,
  Gujarati: /[\u0A80-\u0AFF]/,
  Punjabi: /[\u0A00-\u0A7F]/,
  Odia: /[\u0B00-\u0B7F]/,
};

/**
 * Detects the language of the input text
 * In a production environment, this would use a proper language detection API
 * like Google Cloud Translation or a language-detection library
 */
export async function detectLanguage(text: string): Promise<string> {
  // Simulate a short delay to make language detection more noticeable to users
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simple language detection based on script characters
  for (const [language, pattern] of Object.entries(languagePatterns)) {
    if (pattern.test(text)) {
      console.log(`Detected language: ${language}`);
      return language;
    }
  }
  
  // Some additional checking for common Indian language words
  const lowerText = text.toLowerCase();
  
  // Check for common Hindi words/phrases
  if (lowerText.includes("namaste") || lowerText.includes("dhanyawad") || 
      lowerText.includes("kaise ho") || lowerText.includes("shubh")) {
    return "Hindi";
  }
  
  // Check for common Tamil words/phrases
  if (lowerText.includes("vanakkam") || lowerText.includes("nandri") || 
      lowerText.includes("eppadi")) {
    return "Tamil";
  }
  
  // Check for common Bengali words/phrases
  if (lowerText.includes("nomoshkar") || lowerText.includes("dhonnobad") || 
      lowerText.includes("kemon acho")) {
    return "Bengali";
  }
  
  // Check for common Kannada words/phrases
  if (lowerText.includes("namaskara") || lowerText.includes("dhanyavada") || 
      lowerText.includes("hegiddira")) {
    return "Kannada";
  }
  
  // Default to English if no patterns match
  return "English";
}

/**
 * Translates text to English
 * In a production environment, this would use a proper translation API
 * like Google Translate or Microsoft Translator
 */
export async function translateText(text: string): Promise<string> {
  // Simulate a delay to make translation feel more realistic
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, we would call a translation API here
  // For now, we'll implement a simple mock translation for specific phrases

  // Hindi examples
  if (text.includes("बायोडाटा") || text.includes("रेज्यूमे")) {
    return "I need help creating a resume";
  }
  
  if (text.includes("कहानी") || text.includes("कथा")) {
    return "Tell me a story";
  }
  
  if (text.includes("मदद") || text.includes("सहायता")) {
    return "I need help with my problem";
  }
  
  // Tamil examples
  if (text.includes("வாழ்க்கை") || text.includes("உதவி")) {
    return "I need advice about life";
  }
  
  // Kannada examples
  if (text.includes("ಸಹಾಯ") || text.includes("ನೆರವು")) {
    return "I need assistance with this task";
  }
  
  if (text.includes("ಕಥೆ") || text.includes("ಕಾವ್ಯ")) {
    return "Tell me a story or poem";
  }
  
  // Bengali examples
  if (text.includes("সাহায্য") || text.includes("জীবন")) {
    return "I need help with my life situation";
  }
  
  // For text without specific patterns, create a generic meaningful translation
  return `Translate from non-English language: ${text}`;
}
