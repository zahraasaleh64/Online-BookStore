# 📚 Online Bookstore - Production Deployment Guide

This guide explains how to host your bookstore on **cPanel** or **Hostinger** using a single domain.

---

## 🏗️ How the Project Works (Critical)
You have three folders, but **you only run ONE Node.js application**.
1.  **`/server`**: This is the "Brain". It contains the API, the Database, and the logic to show the website.
2.  **`/frontend/build`**: This is the Customer Site (generated after you run build).
3.  **`/backend/build`**: This is the Admin Dashboard (generated after you run build).

**The Server is the Master:** When you start `server/index.js`, it automatically looks inside the `frontend/build` and `backend/build` folders to show your website to the world.

---

## 🚀 Step 1: Prepare Locally (On your Mac/PC)
Shared hosting does not have enough power to "Build" React apps. You must do this on your computer first.

```bash
# 1. Build the Customer Front-end
cd frontend && npm install && npm run build

# 2. Build the Admin Dashboard
cd backend && npm install && npm run build

# 3. Push everything (including the new 'build' folders) to GitHub
cd ..
git add .
git commit -m "Build ready for production"
git push origin main
```

---

## 🌐 Step 2: cPanel / Hostinger Setup

### 1. Identify your Folder
On Hostinger/cPanel, your files usually live in `public_html`. Ensure your folders look like this on the server:
- `public_html/server/`
- `public_html/frontend/build/`
- `public_html/backend/build/`
- `public_html/.htaccess`

### 2. Configure the Node.js App
In your hosting panel, look for **"Setup Node.js App"** and use these EXACT settings:
- **Node.js Version**: 20.x or higher.
- **Application Mode**: Production.
- **Application Root**: `public_html` (This is the parent folder containing server, frontend, and backend).
- **Application URL**: `yourdomain.com`
- **Application Startup File**: `server/index.js` (Tell the host to start the 'Brain').

### 3. Install Dependencies
After creating the app, click the **"Run npm install"** button (or use terminal in `public_html/server`) to install the server's requirements (Express, SQLite3, etc.).

---

## 🗄️ Step 3: Database & Permissions
Your shop uses **SQLite**, which stores everything in a single file: `server/database.sqlite`.

1.  **Database Connection**: You don't need a MySQL username or password. The code automatically connects to the file.
2.  **Writing Access (Important)**: For the shop to save products and orders, the server must be allowed to "Write". 
    - Using your hosting's **File Manager**, right-click the `server` folder.
    - Select **Permissions**.
    - Ensure it is set to **755** or **775** (Owner and Group must have "Write" permission).
    - Do the same for the `server/uploads` folder so you can upload book covers.

---

## 🛠️ Summary of Access
- **Customer Site**: `https://yourdomain.com`
- **Admin Dashboard**: `https://yourdomain.com/admin`
- **API Endpoints**: `https://yourdomain.com/api/...`

---

## 🔒 Security Fix
Before going live, open `server/index.js` and change the `SECRET_KEY` on line 11 to a long, random password. This protects your user logins.
