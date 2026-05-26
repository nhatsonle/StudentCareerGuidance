# Student Career Guidance

Interactive IT career assessment, roadmap learning paths, and mentor-style guidance for students.

## Current Behavior

- The assessment flow is fully rule-based and runs on the local Express server.
- The Career Mentor Chat uses hard-coded keyword responses from the local server.
- No Gemini API calls are made anywhere in the app.
- No `GEMINI_API_KEY` or external AI API configuration is required.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
3. Open:
   `http://localhost:3000`

## Useful Commands

- Type-check the app:
  `npm run lint`
- Build for production:
  `npm run build`
