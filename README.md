# Online Bookstore - Production Deployment Guide

This project is a full-stack Online Bookstore including a **Customer Storefront**, an **Admin Dashboard**, and a **Node.js API Server**.

## 🏗 Project Structure
- **/frontend**: The main customer-facing website (React).
- **/backend**: The Admin Dashboard for managing products and orders (React).
- **/server**: The API server and database (Node.js & SQLite).

---

## 🚀 Production Deployment Instructions

This project is configured to run on a single domain (e.g., `www.yourdomain.com`) without requiring port numbers in the URL.

### 1. Build the Applications
Before uploading to your server, you must generate the production builds for both the storefront and the dashboard. 

Run these commands in your local terminal:
```bash
# Build Storefront
cd frontend
npm install
npm run build

# Build Admin Dashboard
cd backend
npm install
npm run build
```

### 2. Upload Files to Your Server
Upload the entire project to your host (via FTP, File Manager, or Git). Ensure the following folders exist:
- `backend/build`
- `frontend/build`
- `server/`
- `.htaccess` (in the root directory)

### 3. Server-Side Configuration (cPanel / Apache)
Your project includes an `.htaccess` file configured for domain-based hosting. 

1. **Node.js Setup**: Using your hosting's "Setup Node.js App" tool:
   - **Application root**: Select the root folder.
   - **Application URL**: Your domain (e.g., `yourdomain.com`).
   - **Application startup file**: `server/index.js`
2. **Environment Variables**: Add these in your hosting dashboard:
   - `NODE_ENV`: `production`
   - `PORT`: (The host usually provides this automatically)
   - `JWT_SECRET`: (Enter a long random string for security)

### 4. Database & Uploads
- The database is stored in `server/database.sqlite`. Ensure this file has **read/write permissions**.
- Product images are stored in `server/uploads/`. Ensure this folder has **write permissions**.

---

## 💻 Local Development
If you want to run it on your own computer:
1. **Start Server**: `cd server && node index.js` (Runs on port 5001)
2. **Access Storefront**: `http://localhost:5001`
3. **Access Admin**: `http://localhost:5001/admin`

---

## 🔒 Security Notes
- **SSL**: Ensure your site is running on `https://`.
- **Secret Key**: Change the `SECRET_KEY` in `server/index.js` or set it via `.env` before going live.
