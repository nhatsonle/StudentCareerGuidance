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

## Free Deploy on Render

This app is configured for Render's free web service plan through `render.yaml`.

1. Push the repository to GitHub.
2. Open Render and choose **New +** > **Blueprint**.
3. Connect this repository: `nhatsonle/StudentCareerGuidance`.
4. Render will read `render.yaml` and create a free Node web service.
5. Deploy the service.

Render settings used by the blueprint:

- Build command: `npm ci && npm run build`
- Start command: `npm start`
- Runtime: Node
- Plan: Free
- Environment: `NODE_ENV=production`

The server reads `process.env.PORT`, so it works with Render's assigned port automatically.

## CI/CD

GitHub Actions is configured in `.github/workflows/ci-cd.yml`.

On every pull request and push to `main`, CI runs:

- `npm ci`
- `npm run lint`
- `npm run build`

For CD, create a Render deploy hook and save it as a GitHub Actions secret:

1. In Render, open the web service.
2. Go to **Settings** > **Deploy Hook**.
3. Copy the deploy hook URL.
4. In GitHub, open **Settings** > **Secrets and variables** > **Actions**.
5. Add a repository secret named `RENDER_DEPLOY_HOOK_URL`.

After the secret is set, every push to `main` runs CI and then triggers a Render deploy.
