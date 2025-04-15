# OpenAI Cost Tracker

A React application built with Vite, TypeScript, and Tailwind CSS to track your OpenAI API costs.

## Overview

This application fetches cost data directly from OpenAI's organization cost API endpoint (`/v1/organization/costs`) to provide insights into your spending. It displays the total cost over the last 30 days, breaks down costs by project, and visualizes daily usage trends.

Due to limitations in the OpenAI API (which doesn't provide model-specific breakdowns in the cost endpoint), token usage is estimated based on the cost data and known OpenAI pricing.

## Features

-   **API Key Management**: Securely enter your OpenAI API key or use an environment variable (`VITE_OPENAI_API_KEY`).
-   **Cost Fetching**: Retrieves cost data from the official `/v1/organization/costs` endpoint.
-   **Pagination & Rate Limiting**: Handles paginated API responses and implements exponential backoff for rate limiting.
-   **Total Cost Display**: Shows the total cost incurred over the last 30 days.
-   **Project Breakdown**: Groups costs by `project_id` and displays a breakdown with estimated tokens.
-   **Daily Usage Chart**: Visualizes daily cost trends using a line chart.
-   **Token Estimation**: Estimates token usage based on cost and model pricing (since the API doesn't provide exact token counts per cost bucket).
-   **Pricing Information**: Toggleable display of current OpenAI model and tool pricing.
-   **Mock Data Fallback**: Uses mock data for demonstration if the API call fails (e.g., due to missing admin permissions or invalid key).
-   **Responsive Design**: Built with Tailwind CSS for a responsive UI.

## Technologies Used

-   **Framework**: React (Vite)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Charting**: Recharts
-   **Icons**: Lucide React
-   **Notifications**: React Hot Toast
-   **API Client**: Fetch API (native browser)

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

## Environment Variables

Create a `.env` file in the root of the project and add your OpenAI API key. **Important:** This key needs **admin permissions** for your OpenAI organization to access the `/v1/organization/costs` endpoint.

```env
VITE_OPENAI_API_KEY=sk-admin-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Note:** The `.env` file is included in `.gitignore` to prevent accidentally committing your API key. An example file (`.env.example`) is provided.

## Running the Project

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
2.  Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## API Limitations

-   **Admin Permissions Required**: Accessing the `/v1/organization/costs` endpoint requires an API key with **admin-level permissions** for your OpenAI organization. Standard API keys will not work.
-   **No Model Breakdown**: The `/v1/organization/costs` endpoint currently returns costs aggregated per day (and optionally project) but **does not** break down costs by specific model (e.g., gpt-4o vs. gpt-3.5-turbo) within each bucket.
-   **Token Estimation**: Due to the lack of model-specific cost data and token counts in the API response, token usage shown in this application is an **estimation** based on the total daily/project cost and average model pricing.

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

This will create a `dist` folder with the optimized production build. 