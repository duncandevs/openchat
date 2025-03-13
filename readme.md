## Project Overview

This project implements a simple chat application based on open source models
It leverages LangChain for LLM (Large Language Model) integration. The frontend is built using Next.js (TypeScript) and the backend is developed in Python, interacting with LangChain to facilitate dynamic conversations with an AI model.

## Backend Setup

### API Endpoints

The backend exposes the following endpoint:

- **POST /api/v1/chat**
  - **Description**: Accepts a user message and returns a response from the AI model.
  - **Request Body**: A JSON object containing:
    - `id`: Unique identifier for the conversation.
    - `messages`: An array of message objects containing the `role` ("user" or "ai") and `content` (the message).
    - `data`: Optional object for chat options (including `model` and `prompt`).
  - **Response**: A streaming response containing the AI’s generated messages in NDJSON format.
  - **Status Codes**:
    - `200 OK`: If the request is successful and the model responds.
    - `400 Bad Request`: If there are missing fields in the request.
    - `500 Internal Server Error`: If there’s an error with the backend or model.

## Frontend Setup

### UI Implementation

The frontend is a single-page chat application that allows users to send messages to an AI model and receive real-time responses.

- **Tech Stack**:
  - **Next.js (TypeScript)**: For building the web app with functional components.
  - **Tailwind CSS**: For styling the UI components.
  - **Shadcn/UI**: For reusable UI components like buttons, inputs, and chat bubbles.

## Monorepo Structure

This project is organized as a monorepo, containing both the backend and frontend in separate directories:

```
/apps
├── /openchat-backend       # Python backend service
│   ├── Dockerfile
│   ├── main.py     # Main application file
│   └── requirements.txt
├── /openchat-frontend      # Next.js frontend service
│   ├── Dockerfile
│   ├── app/     # Next.js pages
│   ├── components/ # React components
│   ├── tailwind.config.js
│   └── package.json
├── docker-compose.yml  # Docker Compose configuration for both services
└── README.md       # This README file
```

## Timeboxing & Scope

Core functionality (2 hours)
- The focus was on setting up the core functionality—getting the backend and frontend working together
- Prioritized getting the backend API running.
- Prioritized integration between Langchain and Together AI
- The frontend was kept simple with a focus on API integration and basic UI.
- Full authentication and advanced deployment practices were deferred to meet the timebox.

Took some additional time to polish the frontend and create the readme which consisted of
- adding a dark/light mode
- creating a 3 panel layout
- adding the ability to switch models

## Proposed Authentication Flow
1. **Token Issuance**: When a user logs in or signs up, the backend sends a JWT to the frontend.
2. **Storage**: The frontend stores the JWT securely in `localStorage` or `httpOnly` cookies.
3. **Sending the Token**: The frontend includes the JWT in API requests using the `Authorization` header or cookies.
4. **Verification**: The backend checks the token and grants access if valid. If the token is expired or invalid, it returns a `401 Unauthorized`.
5. **Session Expiry**: The frontend handles token expiry with refresh tokens or re-authentication.

## Build & Run Instructions

### Backend

1. Install dependencies:
   ```bash
   cd apps/openchat-backend
   pip install -r requirements.txt
   ```

2. Run the backend locally:
   ```bash
   uvicorn app:app --reload
   ```

3. Alternatively, use Docker to build and run the backend:
   ```bash
   docker-compose up --build
   ```

### Frontend

1. Install dependencies:
   ```bash
   cd apps/openchat-frontend
   yarn install
   ```

2. Run the frontend locally:
   ```bash
   yarn dev
   ```

3. Alternatively, use Docker to build and run the frontend:
   ```bash
   docker-compose up --build
   ```

### Docker Compose

To run both the frontend and backend services together:

```bash
docker-compose up --build
```

This will build and start the backend and frontend services, making the chat application accessible locally.