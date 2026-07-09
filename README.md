# Network Access Logger & Policy Simulator

A comprehensive Full Stack Web Application to simulate, log, and analyze network access requests with Role-Based Access Control (RBAC).

## Features

1. **Professional Dashboard**: Dark-mode enabled responsive UI using Tailwind CSS and Recharts for analytics.
2. **Policy Management**: Full CRUD operations to define access rules by role and resource.
3. **Access Logs**: Complete audit trail with timestamps, IP address, OS, browser, and response time.
4. **Dashboard Analytics**: Visualizations for allowed vs denied traffic over the last 7 days.
5. **Role Based Access Control (RBAC)**: Enforced authorization across APIs for Admin, Security Analyst, and Employees.
6. **Access Simulator**: Test and simulate access policies directly from the UI.
7. **Security Improvements**: Protected APIs using Helmet, Express Rate Limiter, CORS, and JWT.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios, Recharts, React Icons
- **Backend**: Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcryptjs

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account

### Setup
1. Clone the repository.
2. Setup Backend:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
   Run the backend:
   ```bash
   npm run dev
   ```

3. Setup Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Default Credentials
If registering a new account, users default to `Employee` role. Update manually in MongoDB for `Admin` access to test policies.

## Architecture
- Clean MVC Architecture on the Backend.
- Service-oriented API wrapper on the Frontend.
- Centralized Auth and Protected Routes layout.