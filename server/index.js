const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { db, initDb } = require('./db');

const app = express();
const port = process.env.PORT || 5001;
const SECRET_KEY = process.env.JWT_SECRET || "default_secret_key";

const rootDir = path.resolve(__dirname, '..');
const frontendBuild = path.join(rootDir, 'frontend', 'build');
const adminBuild = path.join(rootDir, 'backend', 'build');

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Access denied" });
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') next();
    else res.status(403).json({ error: "Admins only" });
};

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.post('/api/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Required fields missing" });
        const hashedPassword = bcrypt.hashSync(password, 8);
        const [result] = await db.query("INSERT INTO users (email, password, firstName, lastName, role) VALUES (?, ?, ?, ?, ?)", [email, hashedPassword, firstName, lastName, 'user']);
        const token = jwt.sign({ id: result.insertId, email, role: 'user' }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ auth: true, token, user: { id: result.insertId, email, firstName, lastName, role: 'user' } });
    } catch (err) {
        res.status(500).json({ error: "User already exists" });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (!users[0] || !bcrypt.compareSync(password, users[0].password)) return res.status(401).json({ error: "Invalid login" });
        const user = users[0];
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ auth: true, token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products");
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/orders', authenticateToken, isAdmin, async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM orders ORDER BY id DESC");
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.use('/admin', express.static(adminBuild));
app.use(express.static(frontendBuild));

initDb().catch(err => console.error("Database initialization failed:", err));

app.use((req, res) => {
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: "API not found" });
    }
    if (req.path.includes('.')) {
        return res.status(404).send('Not Found');
    }
    if (req.path.startsWith('/admin')) {
        const adminIndex = path.join(adminBuild, 'index.html');
        if (fs.existsSync(adminIndex)) {
            return res.sendFile(adminIndex);
        } else {
            return res.status(500).send("Admin app not built correctly");
        }
    }
    const frontendIndex = path.join(frontendBuild, 'index.html');
    if (fs.existsSync(frontendIndex)) {
        res.sendFile(frontendIndex);
    } else {
        res.status(500).send("Main app not built correctly");
    }
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
