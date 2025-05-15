/**
 * Enhances a prompt based on the provided text, language, tone, and role
 */
export function enhancePrompt(
  text: string,
  detectedLanguage: string,
  tone?: string,
  role?: string
): string {
  // Start building the enhanced prompt
  let enhancedPrompt = "";
  
  // Add role prefix if provided
  if (role && role !== "none") {
    enhancedPrompt += `Act as a ${role.toLowerCase()}. `;
  }
  
  // Add tone-specific adjectives
  let toneAdjective = "";
  if (tone && tone !== "none") {
    switch (tone) {
      case "Professional":
        toneAdjective = "detailed and well-structured";
        break;
      case "Casual":
        toneAdjective = "conversational and approachable";
        break;
      case "Creative":
        toneAdjective = "imaginative and engaging";
        break;
      case "Formal":
        toneAdjective = "polished and precise";
        break;
      case "Enthusiastic":
        toneAdjective = "energetic and positive";
        break;
      case "Academic":
        toneAdjective = "scholarly and research-based";
        break;
      case "Persuasive":
        toneAdjective = "convincing and compelling";
        break;
      case "Instructional":
        toneAdjective = "clear and step-by-step";
        break;
      default:
        toneAdjective = "helpful";
    }
  }
  
  // Handle specific academic/student patterns
  if (text.toLowerCase().includes("study") || text.toLowerCase().includes("exam") || 
      text.toLowerCase().includes("test") || text.toLowerCase().includes("homework") ||
      text.toLowerCase().includes("assignment")) {
    
    // Handle specific roles for study-related queries
    if (role === "Student") {
      return `Act as a student who excels in academics. Create a comprehensive study plan for: ${text}. Include specific techniques for memorization, organization, and understanding concepts deeply.`;
    }
    
    if (role === "Study Partner") {
      return `Act as a study partner. Help me understand and work through: ${text}. Ask questions to guide my thinking, provide examples, and offer different perspectives to deepen my understanding.`;
    }
    
    if (role === "Exam Prep Coach") {
      return `Act as an exam prep coach. Prepare me for: ${text}. Provide a structured approach with practice questions, key concepts to review, time management tips, and test-taking strategies.`;
    }
    
    if (role === "Academic Advisor") {
      return `Act as an academic advisor. Give me advice on: ${text}. Suggest resources, techniques, and approaches that align with different learning styles.`;
    }
    
    // Generic study-related enhancement
    return `${role && role !== "none" ? `Act as a ${role.toLowerCase()}. ` : ""}Provide a ${toneAdjective || "comprehensive"} study guide for: ${text}. Include key concepts, resources, practice exercises, and study techniques.`;
  }
  
  // Handle specific project-related patterns
  if (text.toLowerCase().includes("project") || text.toLowerCase().includes("research") || 
      text.toLowerCase().includes("paper") || text.toLowerCase().includes("thesis") ||
      text.toLowerCase().includes("dissertation")) {
    
    if (role === "Research Assistant") {
      return `Act as a research assistant. Help me with: ${text}. Suggest methodologies, research questions, sources, and a structured approach to organizing the findings.`;
    }
    
    if (role === "Project Partner") {
      return `Act as a project partner. Collaborate with me on: ${text}. Provide ideas, methodology suggestions, and a project timeline with milestones.`;
    }
    
    // Generic project-related enhancement
    return `${role && role !== "none" ? `Act as a ${role.toLowerCase()}. ` : ""}Develop a ${toneAdjective || "comprehensive"} project plan for: ${text}. Include objectives, methodology, timeline, resources needed, and potential challenges with solutions.`;
  }
  
  // Handle specific resume patterns
  if (text.toLowerCase().includes("resume") || text.toLowerCase().includes("cv") || 
      text.toLowerCase().includes("biography") || text.toLowerCase().includes("portfolio")) {
    return `${role && role !== "none" ? `Act as a ${role.toLowerCase()}. ` : ""}Help me create a ${toneAdjective || "professional"} resume for: ${text}. Include sections for skills, experience, education, and achievements with specific guidance for each.`;
  } 
  
  // Handle specific story/creative writing patterns
  if (text.toLowerCase().includes("story") || text.toLowerCase().includes("tell me") || 
      text.toLowerCase().includes("write") || text.toLowerCase().includes("narrative")) {
    if (text.toLowerCase().includes("kid") || text.toLowerCase().includes("child")) {
      return `${role && role !== "none" ? `Act as a ${role.toLowerCase()}. ` : ""}Create a ${toneAdjective || "fun and age-appropriate"} story suitable for children about: ${text}. Include moral lessons, engaging characters, and a positive message.`;
    }
    
    if (role === "Creative Writer") {
      return `Act as a creative writer. Craft an original story about: ${text}. Use vivid descriptions, compelling characters, engaging dialogue, and an unexpected plot twist.`;
    }
    
    return `${role && role !== "none" ? `Act as a ${role.toLowerCase()}. ` : ""}Tell a ${toneAdjective || "captivating"} story about: ${text}. Include well-developed characters, an engaging plot, and meaningful themes.`;
  }
  
  // Generic prompt enhancement for all other cases
  if (toneAdjective) {
    enhancedPrompt += `Provide a ${toneAdjective} response to: ${text}`;
  } else {
    enhancedPrompt += `Provide a helpful response to: ${text}`;
  }
  
  return enhancedPrompt;
}
