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
Generate a complete, fully functional HTML + internal CSS + JavaScript code block (in a single file) for a “Today Tasks” dashboard component. Follow a modern, clean UI design like Dribbble or Figma.

Required Features:

1.  **No Static Data**:
    -   Do not include any sample task data.
    -   The task list is empty by default and only shows tasks added by the user.

2.  **Add Task Functionality**:
    -   Include a **“+” icon button** (floating or top-right aligned) that, when clicked, opens a basic form (can be a modal, dropdown, or collapsible).
    -   The form should have the following fields:
        -   Task Title (text input)
        -   Subject (dropdown: Biography, Math, Psychology)
        -   Teacher Name (text input)
        -   Type (dropdown: Task or Theory)
        -   Submit button to save

3.  **Task List Display**:
    -   Show task cards under the “Forum” tab (active by default).
    -   Each task includes:
        -   Title
        -   Subject
        -   Teacher’s name
        -   Type (Task or Theory)
        -   Action button:
            -   If type = "Task" → show “Add or Create”
            -   If type = "Theory" → show “Mark as Done”
    -   Task item should include subject-based pastel icon/color

4.  **Action Buttons**:
    -   "Mark as Done" → visually mark task as complete (strikethrough or faded style)
    -   "Add or Create" → trigger a prompt for user to enter task detail or content
    -   All changes must be persisted using \`localStorage\`

5.  **Tabs Navigation**:
    -   Tabs at the top: Forum (default), To-do, Members
    -   Each tab switches content visibility
    -   Tabs must work using pure JavaScript

6.  **Persistence**:
    -   All tasks should be saved in localStorage
    -   Tasks must remain on page reload

Design Requirements:
-   Use clean, soft, professional color palette (light blue, orange, purple, white)
-   Rounded corners, shadows on cards
-   Icons must be inline SVG only (no external icons or emoji)
-   Modern font like Poppins, Inter, or system-ui

Responsive:
-   Layout must adapt for mobile and desktop
-   “+” add button must be visible and usable on all screen sizes

Technical Constraints:
-   Plain HTML, CSS, and JavaScript only (no React, Vue, or jQuery)
-   All CSS should be internal (within \`<style>\` tag)
-   JS should be placed in \`<script>\` tag at the bottom
-   No external frameworks or libraries (no Tailwind, Bootstrap, etc.)
-   Do not include \`<html>\`, \`<head>\`, or \`<body>\` tags in the output

Your output should begin with \`<style>\`, then the main layout in \`<div>\`, and finally \`<script>\` at the end.
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