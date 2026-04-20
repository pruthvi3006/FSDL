# Student Feedback Review System

A full-stack web application built with React, Express, and MongoDB for collecting and reviewing student feedback.

## Features

- Submit feedback for courses, instructors, and ratings
- View all feedback submissions in a review list
- MongoDB backend with Express API
- React frontend with simple UI components

## Setup

1. Install dependencies:

   ```bash
   npm run install-all
   ```

2. Create a MongoDB connection string in `server/.env`.

3. Start both servers:

   ```bash
   npm run dev
   ```

4. Open the client app at `http://localhost:3000`.

## Server

- `server/index.js`
- `server/routes/feedback.js`
- `server/models/Feedback.js`

## Client

- `client/src/App.js`
- `client/src/components/FeedbackForm.js`
- `client/src/components/FeedbackList.js`
