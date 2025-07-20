import fs from "fs";
import pdfparse from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import "dotenv/config";



// promise <string> we use for return type and path:string for request what user send
export const LoadPdf = async (path: string): Promise<string> => {
  const dataBuffer = fs.readFileSync(path);
  //why we use await here because it is time taking process
  const pdfData = await pdfparse(dataBuffer);


  return pdfData.text;
}

export const embedPdf = async () => {
  const text = await LoadPdf("data/amit_resume.pdf");
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  })

  const chunks = await splitter.createDocuments([text]);
  //generate embeddings and store in vector db
  const vectorstore = await MemoryVectorStore.fromDocuments(
    chunks,
    new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004", // Latest Gemini embedding model
      apiKey: process.env.GEMINI_API_KEY,
    })
  )

  return vectorstore
}


