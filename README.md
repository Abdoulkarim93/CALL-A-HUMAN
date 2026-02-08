<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/13fph-zt7ydgSN9qX3_ifeTjVoBMusMrH

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment to Cloudflare

### Frontend (Cloudflare Pages)
1. Build the project: `npm run build`
2. Deploy the `dist` directory to Cloudflare Pages.
3. Set the environment variable `VITE_API_URL` to your Worker URL.

### Backend (Cloudflare Workers)
1. Go to the `worker` directory.
2. Deploy the worker: `npx wrangler deploy`
3. Set the Telegram token secret:
   `npx wrangler secret put TELEGRAM_TOKEN` (Enter: 8016558063:AAHk4H0JoUenjqiR9o80Qz44pBq0RMz57j4)
4. Ensure the R2 bucket `call-a-human-media` is created.

Note: The `components/` directory was missing from the initial repository, so minimal stubs have been created to allow the project to build. Replace them with actual component files for full functionality.
