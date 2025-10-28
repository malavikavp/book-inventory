Book Inventory - Full Stack Project
===================================
This is a full-stack Book Inventory project with:
- Backend: Node.js + Express + Mongoose (MongoDB)
- Frontend: React (Create React App) + Material UI + Axios

Steps to run:
1. Backend:
   cd backend
   cp .env.example .env
   (edit .env and replace MONGO_URI with your Atlas URI)
   npm install
   npm run dev

2. Frontend:
   cd frontend
   npm install
   npm start

Notes:
- The backend exposes /api/books for CRUD operations.
- Do NOT commit your .env with secrets to GitHub. Use .env.example to show placeholders.
