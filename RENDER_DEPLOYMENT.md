# Render Deployment Guide

This guide will walk you through deploying your backend server to Render.

## Prerequisites

- A Render account (sign up at https://render.com)
- Your OpenAI API key
- Your GitHub repository connected to Render

## Step-by-Step Deployment

### Option 1: Using render.yaml (Recommended)

1. **Push the render.yaml file to your repository**
   - The `render.yaml` file is already created in the root of your project
   - Commit and push it to your main branch

2. **Connect your repository to Render**
   - Go to https://dashboard.render.com
   - Click "New +" → "Blueprint"
   - Connect your GitHub account if not already connected
   - Select your repository (`gkhot27.github.io`)
   - Render will automatically detect the `render.yaml` file

3. **Set Environment Variables**
   - In the Render dashboard, go to your service
   - Navigate to "Environment" tab
   - Add the following environment variable:
     - **Key**: `OPENAI_API_KEY`
     - **Value**: Your OpenAI API key (paste it here)
   - Click "Save Changes"

4. **Deploy**
   - Render will automatically start deploying
   - Wait for the deployment to complete (usually 2-5 minutes)
   - Once deployed, you'll get a URL like: `https://portfolio-backend-xxxx.onrender.com`

### Option 2: Manual Setup (Alternative)

If you prefer to set up manually:

1. **Create a new Web Service**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure the Service**
   - **Name**: `portfolio-backend` (or any name you prefer)
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free (or choose a paid plan)

3. **Set Environment Variables**
   - Add `OPENAI_API_KEY` with your OpenAI API key value
   - Add `NODE_ENV` with value `production`

4. **Deploy**
   - Click "Create Web Service"
   - Render will start deploying automatically

## After Deployment

### 1. Update CORS Configuration

Once you have your Render URL, update the `allowedOrigins` array in `server/index.js`:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://gkhot27.github.io',
  'https://your-render-url.onrender.com' // Replace with your actual Render URL
];
```

Then commit and push the changes. Render will automatically redeploy.

### 2. Update Frontend Configuration

The frontend is already configured to use the `VITE_API_URL` environment variable. Your GitHub Actions workflow (`.github/workflows/deploy.yml`) already has this set to:
- `https://gkhot27-github-io.onrender.com`

**Update this URL** in `.github/workflows/deploy.yml` line 44 with your actual Render URL:

```yaml
env:
  VITE_API_URL: https://your-actual-render-url.onrender.com
```

### 3. Test the Deployment

1. Visit your Render service URL + `/health` (e.g., `https://your-service.onrender.com/health`)
   - Should return: `{"status":"ok","timestamp":"..."}`

2. Test the API endpoint:
   ```bash
   curl -X POST https://your-service.onrender.com/api/summarize \
     -H "Content-Type: application/json" \
     -d '{"url":"https://example.com"}'
   ```

## Important Notes

### Free Tier Limitations

- **Spinning down**: Free services spin down after 15 minutes of inactivity
- **Cold starts**: First request after spin-down may take 30-60 seconds
- **Upgrade**: Consider upgrading to a paid plan for production use

### Environment Variables

- Never commit your `OPENAI_API_KEY` to the repository
- Always set it in Render's dashboard under Environment Variables
- The `.env` file is for local development only

### Monitoring

- Check the "Logs" tab in Render dashboard for any errors
- Monitor the "Metrics" tab for performance and usage

## Troubleshooting

### Service won't start
- Check the logs in Render dashboard
- Verify all environment variables are set correctly
- Ensure `package.json` has the correct start script

### CORS errors
- Verify your frontend URL is in the `allowedOrigins` array
- Check that you've updated the Render URL in the server code
- Redeploy after making CORS changes

### API not responding
- Check if the service has spun down (free tier)
- Wait 30-60 seconds for cold start
- Verify the health endpoint works: `/health`

## Next Steps

1. Deploy to Render using the steps above
2. Update the Render URL in `server/index.js` (CORS)
3. Update the Render URL in `.github/workflows/deploy.yml` (frontend build)
4. Test the deployed backend
5. Push changes to trigger frontend rebuild with new API URL

Your backend will now be accessible from anywhere, not just your local machine!

