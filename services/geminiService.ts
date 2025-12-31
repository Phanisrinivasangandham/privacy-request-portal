
import { GoogleGenAI, Type } from "@google/genai";
import { DeletionFormData, AIResponse } from "../types";

export const processDeletionRequest = async (formData: DeletionFormData): Promise<AIResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const prompt = `
    Analyze this user data deletion request for a human privacy team review.
    
    User Data:
    - Full Name: ${formData.fullName}
    - Email: ${formData.email}
    - Selected Request: ${formData.requestType}
    - Additional Details provided: ${formData.additionalDetails || "None"}

    TASKS:
    1. Classify the request into EXACTLY one of these categories: "Account Deletion", "Marketing Data Deletion", or "Complete Data Erasure".
    2. Check for completeness: Is there sufficient information (Name, Email, and clear intent) to proceed with manual review?
    3. Generate a short, polite confirmation message acknowledging receipt.

    STRICT RULES:
    - DO NOT confirm that any deletion has already occurred.
    - DO NOT use legal jargon or mention specific laws (like GDPR, CCPA).
    - DO NOT make legal or compliance claims.
    - Explicitly state that a human privacy team will review the request.
    - Keep the confirmation message warm but professional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            classification: {
              type: Type.STRING,
              description: "Must be 'Account Deletion', 'Marketing Data Deletion', or 'Complete Data Erasure'.",
            },
            isComplete: {
              type: Type.BOOLEAN,
              description: "True if the request has all required fields to begin review.",
            },
            confirmationMessage: {
              type: Type.STRING,
              description: "A short, polite acknowledgment of receipt mentioning human review.",
            },
          },
          required: ["classification", "isComplete", "confirmationMessage"],
        },
      },
    });

    const jsonStr = response.text;
    if (!jsonStr) {
      throw new Error("No response from AI service");
    }

    return JSON.parse(jsonStr) as AIResponse;
  } catch (error) {
    console.error("Error processing request with Gemini:", error);
    return {
      classification: "Unclassified",
      isComplete: false,
      confirmationMessage: "We have received your request. Our privacy team will review the details provided and contact you if further information is needed."
    };
  }
};
