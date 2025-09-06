# Contributing to To-Do List

Thank you for your interest in contributing to the To-Do List project! We welcome contributions from developers of all skill levels. Whether you're fixing a bug, adding a new feature, or improving documentation, your help is greatly appreciated.

This guide will help you get started with contributing to the project. Please take a moment to read through it to ensure a smooth collaboration process.

## How to Contribute

### 1. Fork the Repository
- Go to the [To-Do List repository](https://github.com/maulidacy/To_Do-List) on GitHub.
- Click the "Fork" button in the top-right corner to create your own copy of the repository.

### 2. Clone Your Fork
- Clone your forked repository to your local machine:
  ```bash
  git clone https://github.com/your-username/To_Do-List.git
  ```
- Navigate to the project directory:
  ```bash
  cd To_Do-List
  ```

### 3. Set Up the Development Environment
- Ensure you have Node.js and npm installed.
- Install the project dependencies:
  ```bash
  npm install
  ```
- If needed, set up any environment variables as described in the README.md.

### 4. Create a Branch
- Create a new branch for your changes:
  ```bash
  git checkout -b feature/your-feature-name
  ```
  - Use descriptive branch names, e.g., `fix/bug-description` or `feature/new-functionality`.

### 5. Make Your Changes
- Implement your changes, following the code style guidelines below.
- Test your changes thoroughly to ensure they work as expected.
- Update any relevant documentation if necessary.

### 6. Commit Your Changes
- Stage your changes:
  ```bash
  git add .
  ```
- Commit with a clear, descriptive message:
  ```bash
  git commit -m "Add: Brief description of your changes"
  ```
  - Follow conventional commit format where possible (e.g., "Fix: Resolve issue with task deletion").

### 7. Push to Your Fork
- Push your branch to your forked repository:
  ```bash
  git push origin feature/your-feature-name
  ```

### 8. Submit a Pull Request
- Go to the original repository on GitHub.
- Click "New Pull Request".
- Select your branch and provide a clear description of your changes.
- Reference any related issues if applicable.
- Wait for review and address any feedback.

## Reporting Issues

If you encounter a bug or have a suggestion for a new feature, please create an issue on GitHub. Here's how to make your report helpful:

### Bug Reports
- **Title**: Use a clear, descriptive title (e.g., "Task deletion not working on mobile devices").
- **Description**: Provide detailed steps to reproduce the issue, including:
  - What you were doing when the bug occurred.
  - Expected behavior vs. actual behavior.
  - Browser and operating system information.
  - Screenshots or error messages if applicable.
- **Environment**: Mention the version of the app, Node.js, and any other relevant details.

### Feature Requests
- **Title**: Suggestive title (e.g., "Add dark mode toggle").
- **Description**: Explain the proposed feature, why it's needed, and how it would benefit users.
- **Additional Context**: Include mockups, examples, or references if possible.

## Code Style Guidelines

To maintain consistency across the codebase, please follow these simple guidelines:

### JavaScript
- Use ES6+ features where appropriate (e.g., `const`/`let`, arrow functions, template literals).
- Write clear, descriptive variable and function names (e.g., `taskList` instead of `tl`).
- Use consistent indentation (2 spaces preferred).
- Add comments for complex logic or functions.
- Follow camelCase for variables and functions.

### HTML/CSS
- Use semantic HTML elements.
- Keep CSS organized and use classes for reusability.
- Ensure responsive design principles are followed.
- Use meaningful class and ID names.

### General
- Keep code clean and readable.
- Remove any unused code or console.log statements before committing.
- Test your changes in multiple browsers if applicable.

## Additional Notes

- Be respectful and constructive in all communications.
- If you're new to open-source contributing, don't hesitate to ask questions!
- For major changes, consider discussing them in an issue first to align with the project's direction.

We appreciate your contributions and look forward to collaborating with you!
