import Replicate from "replicate";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function generateTodayTasksComponentCode() { // Renamed function for clarity
  try {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const prompt = `
Put the prompt to create the code here...
`;

    const output = await replicate.run("ibm-granite/granite-3.3-8b-instruct", {
      input: { prompt },
    });

    // Handle different output formats gracefully
    const generatedCode = Array.isArray(output)
      ? output.join("")
      : typeof output === "string"
      ? output
      : JSON.stringify(output, null, 2); // Fallback for unexpected output

    console.log("✅ Generated Today Tasks Component Code:\n\n", generatedCode);
  } catch (error) {
    console.error("❌ Error generating Today Tasks Component Code:", error.message || error);
  }
}

// Call the function to generate the code
generateTodayTasksComponentCode();
