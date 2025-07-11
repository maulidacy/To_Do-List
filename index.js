import Replicate from "replicate";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  // Contoh prompt untuk meminta kode JavaScript kalkulator sederhana
  const input = {
    prompt: "Tulis kode JavaScript untuk kalkulator sederhana",
    max_tokens: 512,
    temperature: 0.6,
  };

  try {
    const output = await replicate.run("ibm-granite/granite-3.3-8b-instruct", { input });
    console.log("Model output:", output);
  } catch (error) {
    console.error("Error calling IBM Granite model:", error);
  }
}

main();
