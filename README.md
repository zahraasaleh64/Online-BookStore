# Online Bookstore - Production Deployment Guide

This project is a full-stack Online Bookstore including a **Customer Storefront**, an **Admin Dashboard**, and a **Node.js API Server**.

## 🛠 Project Structure
- **/frontend**: The main customer-facing website (React).
- **/backend**: The Admin Dashboard for managing products and orders (React).
- **/server**: The API server and database (Node.js & SQLite).

---

## ⚙️ Requirements
- **Node.js Version**: `v20.x` or higher (Developed using `v25.1.0`).

---

## 🚀 Production Deployment Instructions (cPanel / Hostinger)

### 1. Build the Applications Locally
**DO NOT build on the server.** Shared hosting (cPanel/Hostinger) often lacks the RAM for React builds. 

Run these on your **Local Computer**:
```bash
# Build Storefront
cd frontend && npm run build

# Build Admin Dashboard
cd backend && npm run build

# Push to GitHub
git add .
git commit -m "Prepare production builds"
git push origin main
```

### 2. cPanel / Hostinger Setup Guide
Follow these steps in your hosting dashboard:

1. **Go to "Setup Node.js App"** (often found in the Software section).
2. **Create New Application**:
   - **Node.js version**: Choose `20.x` or the latest available.
   - **Application mode**: `Production`.
   - **Application root**: `public_html` (or the folder where you pulled the code).
   - **Application URL**: Select your domain.
   - **Application startup file**: `server/index.js`.
3. **Environment Variables**:
   - Add `PORT` (usually given by host, e.g., 5001 or handled internally).
   - Add `JWT_SECRET`: (A secure random string).
4. **Run npm install**:
   - In the Node.js App section, look for the button **"Run JS script"** or **"Execute npm install"**. 
   - You must run this for the `server` directory so the API works.

### 3. Git Pull on Server
If you are using terminal on the server:
```bash
cd public_html
git pull origin main
```

---

## 💻 Local Development
1. **Start Server**: `cd server && node index.js` (Runs on port 5001)
2. **Access Storefront**: `http://localhost:5001`
3. **Access Admin**: `http://localhost:5001/admin`

---

## 🔒 Security Notes
- **SSL**: Ensure your site is running on `https://`.
- **Secret Key**: Change the `SECRET_KEY` in `server/index.js` or set it via `.env` before going live.
