# Token Exchange Challenge

Interview starter for a MERN + TypeScript auth flow.

A client already holds an access token. Your task is to finish the unfinished exchange so login can complete through short-lived codes and end with a session token.

## Stack

- MongoDB, Express, React, Node
- TypeScript on the API and the client

## Setup

```bash
# API
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev

# Client (second terminal)
cd frontend
npm install
npm run dev
```

MongoDB should be running locally. The seed script creates a demo user. Use the client to request a demo access token, then complete the flow.

## Task

Implement the missing auth handlers and connect the client so the exchange works end to end. Do not commit secrets.
