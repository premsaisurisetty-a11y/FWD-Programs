
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || 'mock-key' });

export interface EvalResult {
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compilation Error';
  message: string;
  feedback: string;
}

export const evaluateCodeWithAI = async (problemTitle: string, problemDesc: string, code: string): Promise<EvalResult> => {
  try {
    // Check if API Key is available
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

    if (!apiKey || apiKey === 'your-api-key-here') {
      console.warn("No API Key found, using Mock Judge.");
      throw new Error("No API Key");
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: `Evaluate the following code for the problem "${problemTitle}". 
      Problem Description: ${problemDesc}
      User Code: ${code}
      
      Respond only in JSON format with status, message, and constructive feedback.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, description: "One of: Accepted, Wrong Answer, Runtime Error, Compilation Error" },
            message: { type: Type.STRING, description: "A brief summary of the result (e.g. 'All test cases passed')" },
            feedback: { type: Type.STRING, description: "Constructive feedback or debugging tips." }
          },
          required: ["status", "message", "feedback"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result as EvalResult;
  } catch (error) {
    console.warn("Gemini Evaluation Failed/Skipped, switching to Mock Judge:", error);

    // Fallback Mock Judge Logic
    await new Promise(r => setTimeout(r, 800)); // Simulate processing

    // Basic Validation: Check if code is too short
    if (!code || code.trim().length < 20) {
      return {
        status: 'Wrong Answer',
        message: 'Solution too short',
        feedback: 'Please write a complete solution. Your code is too sparse.'
      };
    }

    // Advanced Validation: Check for required tags based on Problem Title/Desc
    const validationRules: { [key: string]: string[] } = {
      'Hello World': ['<h1>', '<p>'],
      'Text Formatting': ['<b>', '<i>', '<u>'],
      'Lists': ['<ul>', '<ol>', '<li>'],
      'Hyperlinks': ['<a href', '<img src'],
      'Tables': ['<table>', '<tr>', '<td>'],
      'Form': ['<form>', '<input'], // Matches "Registration Form" and "Accessible ARIA Form"
      'Semantic': ['<header>', '<main>', '<footer>'],
      'Media': ['<audio', '<video'],
      'Meta': ['<meta charset', '<meta name="viewport"'],
      'Accessible': ['<label', 'aria-']
    };

    let missingTags: string[] = [];
    const lowerCode = code.toLowerCase();

    // Find applicable rules
    for (const [key, tags] of Object.entries(validationRules)) {
      if (problemTitle.includes(key) || problemDesc.includes(key)) {
        tags.forEach(tag => {
          // precise check not perfect with lowercase but good enough for mock
          if (!lowerCode.includes(tag.toLowerCase())) {
            missingTags.push(tag);
          }
        });
      }
    }

    if (missingTags.length > 0) {
      return {
        status: 'Wrong Answer',
        message: 'Missing Requirements',
        feedback: `Your solution is missing the following required tags/elements: ${missingTags.map(t => `\`${t}\``).join(', ')}. Please ensure you follow the instructions.`
      };
    }

    return {
      status: 'Accepted',
      message: 'Mock Judge: Perfect!',
      feedback: 'Excellent work! Your code uses the correct tags and matches the requirements. (Offline Mode)'
    };
  }
};

export const getAIHint = async (problemTitle: string, problemDesc: string, userCode: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is stuck on "${problemTitle}". 
      Problem: ${problemDesc}
      Current Code: ${userCode}
      Give a subtle hint without providing the full solution. Keep it encouraging and under 100 words.`,
    });
    return response.text || "Try breaking the problem into smaller parts.";
  } catch (error) {
    return "Check your base cases and constraints.";
  }
};
