import express from "express";
import dotenv from 'dotenv';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config();
import { initAgent, askAgent } from "./agent";


const model = new ChatGoogleGenerativeAI({
  model: 'gemini-2.0-flash',
  temperature: 0,
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "question is required" });
  }
  try {
    const answer = await askAgent(question);
    return res.json({ answer });
  } catch (error) {
    console.error("Error asking agent:", error);
    return res.status(500).json({ error: "failed to get an answer from agent" });
  }
});

app.listen(3000, async () => {
  console.log("server is running on port 3000");
  initAgent();
})


