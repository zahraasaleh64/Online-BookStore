# 📚 Online Bookstore - Production Deployment Guide (Hostinger/cPanel)

This guide explains how to host your bookstore on **Hostinger** or **cPanel** using a single domain.

---

## 🏗️ How the Project Works (The "Brain" Concept)
You have three main folders, but you only run **ONE** Node.js application.
1.  **`/server`**: This is the **Master App**. It contains the API, the Database, and the logic to serve the entire website.
2.  **`/frontend/build`**: The Customer Site (Pre-compiled).
3.  **`/backend/build`**: The Admin Dashboard (Pre-compiled).

**Crucial Logic:** The Master App (`server/index.js`) is programmed to automatically serve the customer site from `frontend/build` and the admin dashboard from `backend/build`.

---

## 🚀 Step 1: Prepare the Files (Local Mac/PC)
Shared hosting does not have enough RAM/CPU to build React apps. You must build them on your computer first.

1.  **Build the Customer Site**:
    ```bash
    cd frontend && npm install && npm run build
    ```
2.  **Build the Admin Dashboard**:
    ```bash
    cd backend && npm install && npm run build
    ```
3.  **Push Everything to GitHub**:
    ```bash
    cd ..
    git add .
    git commit -m "Build ready for production"
    git push origin main
    ```
    *Note: I have also created a `hostinger_ready.zip` in the root folder which is ready to be uploaded directly if you don't want to use Git on the server.*

---

## 🌐 Step 2: Deployment on Hostinger/cPanel

### 1. File Placement
The files must be placed in your `public_html` folder. Your directory structure on the server should look like this:
- `public_html/server/`
- `public_html/frontend/build/`
- `public_html/backend/build/`
- `public_html/.htaccess`
- `public_html/package.json`

### 2. Configure the Node.js App (CRITICAL STEPS)
In your hosting panel (Hostinger or cPanel), go to **"Setup Node.js App"**:

- **📁 WHICH FOLDER?**: Select the **ROOT folder** (usually `/public_html`). 
  - *Do NOT select the 'server', 'frontend' or 'backend' folders here. The Root folder contains them all.*
- **🚀 Application Startup File**: `server/index.js` 
  - *This tells the host to start the "Brain" of the project.*
- **Application URL**: `yourdomain.com`
- **Node.js Version**: 20.x or higher.
- **Application Mode**: Production.

### 3. Connection & Dependencies
- **Install Server Requirements**: In the Node.js setup page, click the **"Run npm install"** button. This installs the specific needs for the server (Express, SQLite3, etc.) located in `server/package.json`.
- **Database**: The shop uses **SQLite**. It connects to `server/database.sqlite` automatically. You **do not** need to create a MySQL database in cPanel.

---

## 🗄️ Step 4: Folder Permissions (IMPORTANT)
If you can't add products or see images, check these permissions in your **File Manager**:
1.  Right-click the `server` folder -> **Permissions** -> Set to **755** (Ensure "Write" is checked for the owner).
2.  Do the same for `server/uploads` (the folder for book covers).
3.  Ensure `server/database.sqlite` is writable.

---

## 🛠️ Accessing your Site
- **Customer Store**: `https://yourdomain.com/`
- **Admin Panel**: `https://yourdomain.com/admin`
- **API (Internal)**: `https://yourdomain.com/api/`

---

## 🔒 Security
Change the `SECRET_KEY` inside `server/index.js` (Line 11) to a private random string before you start taking real orders.
