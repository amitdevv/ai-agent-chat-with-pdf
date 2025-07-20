import { embedPdf } from "./ingest";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RetrievalQAChain } from "langchain/chains";

let qaChain: RetrievalQAChain;


export const initAgent = async () => {
  const vectorstore = await embedPdf();
  //RAG
  const retriever = vectorstore.asRetriever();

  //choose Model
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    apiKey: process.env.GEMINI_API_KEY,
  });

  qaChain = RetrievalQAChain.fromLLM(model, retriever);
}

export const askAgent = async (question: string): Promise<string> => {
  if (!qaChain) {
    throw new Error("Agent not initialized. Please call initAgent first")
  }
  const res = await qaChain.invoke({ query: question });
  return res.text;
}