# Deployment Guide

This guide will walk you through deploying your portfolio to Vercel with automated CI/CD using GitHub Actions.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository for this project

## Initial Setup

### 1. Create GitHub Repository

If you haven't already, initialize a git repository and push to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Connect to Vercel

#### Option A: Vercel Dashboard (Recommended for First-Time Setup)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the Vite framework
5. Click "Deploy"

#### Option B: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel
```

### 3. Get Vercel Credentials for CI/CD

To enable automated deployments via GitHub Actions, you need to add secrets to your GitHub repository:

#### Get Vercel Token

1. Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
2. Create a new token
3. Copy the token (you won't see it again!)

#### Get Project IDs

Run these commands in your project directory:

```bash
# Install Vercel CLI if not already installed
npm install -g vercel

# Link your project
vercel link

# This creates a .vercel directory with project.json
# The file contains your VERCEL_ORG_ID and VERCEL_PROJECT_ID
```

Or find them in the Vercel dashboard:
- **Project ID**: Project Settings → General
- **Org ID**: Account Settings → General

### 4. Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click "New repository secret" and add:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Your organization/team ID
   - `VERCEL_PROJECT_ID`: Your project ID

## How the CI/CD Pipeline Works

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:

### On Pull Requests
1. ✅ Runs linting checks
2. 🔨 Builds the project
3. 🚀 Deploys a preview to Vercel
4. 💬 Comments the preview URL on the PR

### On Push to Main
1. ✅ Runs linting checks
2. 🔨 Builds the project
3. 🚀 Deploys to production on Vercel

## Manual Deployment

### Deploy to Production

```bash
vercel --prod
```

### Deploy Preview

```bash
vercel
```

## Custom Domain

### Add Custom Domain in Vercel

1. Go to your project in Vercel dashboard
2. Navigate to **Settings → Domains**
3. Add your custom domain
4. Follow the DNS configuration instructions

### Common DNS Providers

- **Namecheap**: Add A record pointing to `76.76.21.21`
- **Cloudflare**: Add CNAME record pointing to `cname.vercel-dns.com`
- **GoDaddy**: Add A record pointing to `76.76.21.21`

## Environment Variables

If you need environment variables:

1. Go to Vercel dashboard → Project Settings → Environment Variables
2. Add your variables for Production, Preview, and Development
3. Redeploy for changes to take effect

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify build command is correct: `npm run build`

### GitHub Actions Fails

- Verify all secrets are correctly set in GitHub
- Check the Actions tab for detailed error logs
- Ensure `VERCEL_TOKEN` has not expired

### Preview Deployment Not Working

- Check that PR is from the same repository (not a fork)
- Verify GitHub Actions workflow file is in `.github/workflows/`
- Ensure secrets are accessible to the workflow

## Useful Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Remove a deployment
vercel rm [deployment-url]

# Pull environment variables
vercel env pull
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

## Support

If you encounter issues:
- Check [Vercel Status](https://www.vercel-status.com/)
- Visit [Vercel Community](https://github.com/vercel/vercel/discussions)
- Review GitHub Actions logs in your repository
