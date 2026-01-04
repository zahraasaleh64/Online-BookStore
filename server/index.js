require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db, initDb } = require('./db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey_change_in_production";

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- SERVE APPS ---
app.use('/admin', express.static(path.join(__dirname, '..', 'backend', 'build')));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Initialize Database
initDb();

// --- Auth Routes ---

app.post('/api/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Email and password required" });

        const hashedPassword = bcrypt.hashSync(password, 8);
        const role = 'user';

        const [result] = await db.query(
            "INSERT INTO users (email, password, firstName, lastName, role) VALUES (?, ?, ?, ?, ?)",
            [email, hashedPassword, firstName, lastName, role]
        );

        const id = result.insertId;
        const token = jwt.sign({ id, email, role }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ auth: true, token, user: { id, email, firstName, lastName, role } });
    } catch (err) {
        res.status(500).json({ error: "User already exists or server error" });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        const user = users[0];

        if (!user) return res.status(404).json({ error: "User not found" });

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ auth: true, token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// --- Product & Order Routes ---

app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM orders ORDER BY id DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/orders/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const [rows] = await db.query("SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC", [userId]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ error: "Product not found" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', upload.single('imageFile'), async (req, res) => {
    try {
        const { title, author, price, category } = req.body;
        let image = req.body.image;
        if (req.file) {
            image = `/uploads/${req.file.filename}`;
        }

        if (!title) return res.status(400).json({ error: "Title is required" });

        const [result] = await db.query(
            "INSERT INTO products (title, author, price, category, image) VALUES (?, ?, ?, ?, ?)",
            [title, author, price, category, image]
        );

        res.json({ id: result.insertId, title, author, price, category, image });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/products/:id', upload.single('imageFile'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, price, category } = req.body;
        let image = req.body.image;

        if (req.file) {
            image = `/uploads/${req.file.filename}`;
        }

        const [result] = await db.query(
            "UPDATE products SET title = ?, author = ?, price = ?, category = ?, image = ? WHERE id = ?",
            [title, author, price, category, image, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product updated successfully", image });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const { firstName, lastName, total, user_id } = req.body;
        const customerName = `${firstName} ${lastName}`;
        const orderDate = new Date().toISOString().split('T')[0];
        const status = 'Pending';
        const totalAmount = typeof total === 'number' ? `$${total.toFixed(2)}` : total;

        if (!firstName || !lastName || !total) return res.status(400).json({ error: "Missing required fields" });

        const [result] = await db.query(
            "INSERT INTO orders (user_id, customerName, orderDate, totalAmount, status) VALUES (?, ?, ?, ?, ?)",
            [user_id || null, customerName, orderDate, totalAmount, status]
        );

        res.json({ id: result.insertId, message: "Order placed successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SPA Fallback
app.get(/(.*)/, (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: "API endpoint not found" });
    if (req.path.startsWith('/admin')) return res.sendFile(path.join(__dirname, '..', 'backend', 'build', 'index.html'));
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
