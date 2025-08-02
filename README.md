# CI/CD Deployment to Vercel using GitHub Actions

This repository is configured with GitHub Actions to automatically deploy to [Vercel](https://vercel.com/) when changes are pushed to the `main` branch.

## Prerequisites

* A Vercel account and project set up.
* GitHub repository with `main` branch.
* Vercel CLI installed in your local environment (optional, for manual testing).

## Workflow Overview

This setup utilizes GitHub Actions to automate the deployment process to Vercel on every push to the `main` branch. When changes are pushed, the following steps are executed:

1. **Checkout the repository** – The latest changes are fetched from the GitHub repository.
2. **Set up Node.js** – The workflow uses Node.js version 20.
3. **Install Vercel CLI** – The latest version of the Vercel CLI is installed.
4. **Deploy to Vercel** – The application is deployed to Vercel using the `vercel` CLI, leveraging tokens stored in GitHub Secrets for authentication.

## GitHub Actions Configuration

This repository uses the following GitHub Actions configuration file (`.github/workflows/vercel-deploy.yml`) for the CI/CD pipeline:

```yaml
name: Vercel production deploy

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_TOKEN }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: deploy to vercel
        run: npx vercel --token ${{ secrets.VERCEL_TOKEN }} --prod --yes
        env: 
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_USER_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Steps to Set Up the CI/CD Pipeline

1. **Create GitHub Secrets for Vercel**
   You'll need to store your Vercel authentication tokens as GitHub secrets. Go to your GitHub repository settings and add the following secrets:

   * `VERCEL_TOKEN` – Your Vercel token.
   * `VERCEL_PROJECT_ID` – The Vercel Project ID for the project you're deploying.
   * `VERCEL_USER_ID` – Your Vercel User ID.

2. **Create the Workflow File**
   Inside your GitHub repository, create the following directory and file structure:

   ```
   .github
     └── workflows
         └── vercel-deploy.yml
   ```

   Copy the GitHub Actions YAML configuration into `vercel-deploy.yml`.

3. **Push Changes to the Main Branch**
   After you push the changes to the `main` branch, the workflow will automatically trigger and deploy your application to Vercel.

## Manual Deployment (Optional)

If you prefer to manually deploy your app to Vercel, you can use the Vercel CLI. Here's how to do it:

1. Install the Vercel CLI globally:

   ```bash
   npm install --global vercel
   ```

2. Authenticate with your Vercel account:

   ```bash
   vercel login
   ```

3. Deploy your project:

   ```bash
   vercel --prod
   ```

## Troubleshooting

* **Error: `VERCEL_TOKEN` not found**
  Ensure that the `VERCEL_TOKEN` is correctly set in your GitHub Secrets. If it's missing, the deployment will fail.

* **Deployment stuck or failed**
  Check Vercel’s dashboard for logs and errors related to the deployment.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.