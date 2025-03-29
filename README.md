# Authentication API

A simple Authentication API with ExpressJS & MongoDB that includes user registration, login, logout, and password reset functionality.

## Features

- User Registration
- User Login
- Password Reset via Email
- User Authentication with JWT
- Route Rate Limiting
- Admin and User Roles

## Prerequisites

- Node.js
- ExpressJS
- MongoDB
- Gmail Account (for sending password reset emails)

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `.env` file:

```
PORT = 3035
MONGODB_URI = mongodb://localhost:27017/your_database
JWT_SECRET = your_jwt_secret_key
EMAIL_USER = your.email@gmail.com
EMAIL_PASSWORD = your-app-password
```

4. Start the server:

```bash
npm start
```

Or for development:

```bash
npm run dev
```

## Setting up Gmail for Nodemailer

To send emails using Nodemailer, you need to:

1. Use a Gmail account
2. Generate an "App Password" (not your regular Gmail password):
   - Go to your Google Account
   - Select "Security"
   - Under "Signing in to Google," select "2-Step Verification" (enable it if not already)
   - At the bottom of the page, select "App passwords"
   - Select "Mail" as the app and give it a name like "AuthMailer"
   - Click "Generate"
   - Use the 16-character password that appears as your `EMAIL_PASSWORD` in the .env file

3. Update your `.env` file with:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASSWORD`: The app password you generated

## API Routes

### Authentication Routes
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/forget-password` - Request password reset email
- `POST /auth/reset-password/:token` - Reset password with token
- `POST /auth/logout` - Logout user

### Main Routes
- `GET /` - Home route
- `GET /dashboard` - User dashboard (requires authentication)
- `GET /admin-dashboard` - Admin dashboard (requires admin role)
