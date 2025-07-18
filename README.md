# 📝 To-Do List Project

---

## 📌 Description

The To-Do List Project is a web application designed to help users efficiently manage their daily tasks. This application provides a simple and responsive interface for noting, organizing, and tracking tasks, and supports automation features using AI technology to assist with the code development process.

---

## 🛠️ Technologies Used

* **JavaScript** – The primary language for application logic.
* **CSS** – For styling the user interface to be attractive and responsive.
* **Node.js** – Runs the backend and supports API integration.
* **npm** – Manages project dependencies.
* **Replicate API** – An intermediary for calling AI models.
* **IBM Granite Model** – Used for AI-powered automated code generation.

The selection of these technologies allows the application to run with good performance and be easily developed, especially in the implementation of AI features.

---

## ✨ Key Features

* ✅ **Task Management**: Easily add, edit, and delete tasks.
* 🗂️ **Task Organization**: Tasks can be categorized (All, In Progress, Completed) and sorted by priority.
* 📅 **Schedule Addition**: Supports task scheduling.
* 🔗 **Task File Link Icon**: View, upload, save, or delete files for each task using a modal popup and local storage.
* 🤖 **AI Integration for Code Generation**: Uses IBM Granite to generate code snippets based on user input.
* 📱 **Responsive Interface**: A comfortable design across various screen sizes.
* ⏱️ **Increased Productivity**: Automated code generation and efficient task management.

---

## ⚙️ How to Set Up

Make sure Node.js and npm are installed.

1.  **Clone** or download this repository locally:

    ```bash
    git clone https://github.com/maulidacy/To_Do-List
    ```

2.  **Install dependencies**:

    ```bash
    npm install replicate dotenv
    ```

3.  Create a `.env` file in the project's root and add your API token:

    ```ini
    REPLICATE_API_TOKEN=your_api_token_here
    ```

4.  Run the AI generator:

    ```bash
    node index.js
    ```

5.  Open the application via your **browser**:
    * Open `index.html` directly, or
    * Run a local server using the Live Server extension (in VS Code, for example).

---

## 🧠 Explanation of AI Features

This application integrates with an AI model from IBM Granite via the Replicate API, which allows:

* Users to input requirements (e.g., "Create a function to calculate the total project progress percentage based on the number of completed and uncompleted subtasks.").
* The input is sent to the Replicate API.
* The Granite model processes and generates code.
* The code is displayed in the interface for use or modification.

### Benefits of AI Integration:

* ⏩ Automated code generation.
* 🔧 Personalized results based on input context.
* 🧹 Minimizes manual errors during development.
* 🧠 Helps users who are not yet proficient in programming.

---

## 📄 License

This project currently has no license.
