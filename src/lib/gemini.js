import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generatePortfolioInsight = async (portfolioData) => {
  if (!API_KEY) {
    console.warn("Gemini API Key is missing");
    return "AI Insights are unavailable. Please configure VITE_GEMINI_API_KEY.";
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const prompt = `
    You are an expert crypto portfolio analyst. Analyze the following portfolio data and provide concise, actionable insights, risk assessment, and suggestions.
    
    Portfolio Data:
    ${JSON.stringify(portfolioData, null, 2)}
    
    Format the response in Markdown with bullet points. Keep it under 150 words. Focus on diversification and risk.
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating AI insight:", error);

    // If the error is about model not found, provide a helpful message
    if (
      error.message?.includes("not found") ||
      error.message?.includes("404")
    ) {
      return "⚠️ AI model unavailable. The Gemini API key may need to be regenerated at [Google AI Studio](https://aistudio.google.com). Please verify your API key has access to the models.";
    }

    return "Failed to generate AI insights. Please check your API key and try again.";
  }
};
