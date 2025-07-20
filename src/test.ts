import { embedPdf } from "./ingest";

async function test() {
  try {
    console.log("Starting PDF embedding with Google Gemini...");
    const vectorstore = await embedPdf();
    console.log("✅ PDF embedded successfully!");

    // Test a simple similarity search
    const results = await vectorstore.similaritySearch("experience", 2);
    console.log("📄 Sample search results:");
    results.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.pageContent.substring(0, 100)}...`);
    });
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

test();
