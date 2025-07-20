# AI PDF Chat Agent

An intelligent AI agent that understands and answers questions about any PDF document using Google Gemini AI and advanced retrieval techniques.
-for example i upload a resume and ask some question and you can see response below 
<img width="892" height="590" alt="image" src="https://github.com/user-attachments/assets/c02c1009-0f14-4d32-a37d-1f25e010a6c0" />


## What This Agent Does

- Reads and understands PDF document content
- Creates semantic embeddings for intelligent search
- Answers natural language questions about the PDF
- Provides accurate, context-aware responses through RAG

## Prerequisites

- Node.js (v14+)
- Google Gemini API key

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   npm install @google/generative-ai @langchain/google-genai
   ```

2. Create `.env` file:

   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. Place your PDF document in `data/` folder (e.g., `data/document.pdf`)

4. Start the AI agent:
   ```bash
   npx tsc
   npm run dev
   ```

The agent initializes on port 3000 and begins learning from your PDF document.

## Talk to the Agent

Ask the agent questions about the PDF content:

```bash
curl -X POST http://localhost:3000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What are the key points mentioned in this document?"}'
```

## Agent Response

The AI agent responds with intelligent answers:

```json
{
  "answer": "Based on the document, the key points include..."
}
```

## Setup Agent's Knowledge

1. Visit: https://aistudio.google.com/app/apikey
2. Sign in and create a new API key
3. Add it to your `.env` file

## Agent Architecture

```
src/
├── index.ts    # Agent API server
├── agent.ts    # AI agent logic
└── ingest.ts   # PDF processing
data/
└── your_document.pdf
```

## Troubleshooting

- Check your `GEMINI_API_KEY` in `.env`
- Ensure PDF is in `data/` folder
- Run `npx tsc` to check for compilation errors
