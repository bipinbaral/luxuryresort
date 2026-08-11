"use server";

export async function askAI(prompt: string) {
  // In a real application, this would call OpenAI, Anthropic, or another LLM API
  // e.g., using the `ai` package from Vercel
  
  if (!process.env.OPENAI_API_KEY) {
    console.warn("No OPENAI_API_KEY provided. Returning mock response.");
    return {
      success: true,
      data: "This is a simulated AI response. Please configure your OPENAI_API_KEY to enable real AI features."
    }
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    })

    const data = await response.json()
    return { success: true, data: data.choices[0].message.content }
  } catch (error) {
    console.error("AI API Error:", error)
    return { success: false, error: "Failed to fetch response from AI" }
  }
}
