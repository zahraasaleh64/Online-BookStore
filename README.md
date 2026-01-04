# Online Bookstore

A full-stack bookstore application with customer-facing store and admin dashboard.

## What's Inside

- **Frontend**: React app for browsing and buying books
- **Backend**: Admin dashboard for managing products and orders
- **Server**: Node.js API handling everything

## Getting Started

1. Clone the repo
```bash
git clone https://github.com/zahraasaleh64/Online-BookStore.git
cd Online-BookStore-1
```

2. Install dependencies
```bash
cd server && npm install
cd ../frontend && npm install
cd ../backend && npm install
```

3. Set up environment variables
```bash
cd server
cp .env.example .env
# Edit .env with your settings
```

4. Run the thing
```bash
# Terminal 1 - API Server
cd server && node index.js

# Terminal 2 - Customer Site
cd frontend && npm start

# Terminal 3 - Admin Dashboard
cd backend && npm start
```

Now you can visit:
- Customer site: http://localhost:3000
- Admin dashboard: http://localhost:3001/admin
- API: http://localhost:5001

## Admin Login

Email: `admin@bookstore.com`  
Password: `admin123`

## Database

Uses SQLite by default for local development. For production with MySQL, just uncomment the DB settings in `.env`.

## Deploying

Build both frontend and backend:
```bash
cd frontend && npm run build
cd ../backend && npm run build
```

Then upload to your hosting (cPanel, etc) and point it to `server/index.js`.

## Tech Stack

Node.js, Express, React, SQLite/MySQL, JWT for auth

---

That's pretty much it. Check the code if you need more details.
