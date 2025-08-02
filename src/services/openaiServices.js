import axios from "axios";
import fs from "fs/promises"; // 👈 usamos Promesas
import path from "path";


export async function getChatResponse(message) {
    const contextPath = path.resolve("context", "context.txt");
    const systemPrompt = await fs.readFile(contextPath, "utf-8");
    
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:  systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
}