const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { db, initDb } = require('./db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "supersecretkey_change_in_production";

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
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
const port = 5001;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// --- SERVE APPS ---

// 1. Serve Admin Dashboard (Backend)
app.use('/admin', express.static(path.join(__dirname, '..', 'backend', 'build')));

// 2. Serve Customer Site (Frontend)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));


// Initialize Database
initDb();

// --- Auth Routes ---

app.post('/api/signup', (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });

    const hashedPassword = bcrypt.hashSync(password, 8);
    const role = 'user'; // Default role

    const stmt = db.prepare("INSERT INTO users (email, password, firstName, lastName, role) VALUES (?, ?, ?, ?, ?)");
    stmt.run(email, hashedPassword, firstName, lastName, role, function (err) {
        if (err) {
            return res.status(500).json({ error: "User already exists or error creating user" });
        }
        const token = jwt.sign({ id: this.lastID, email, role }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ auth: true, token, user: { id: this.lastID, email, firstName, lastName, role } });
    });
    stmt.finalize();
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
        if (err) return res.status(500).json({ error: "Server error" });
        if (!user) return res.status(404).json({ error: "User not found" });

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ auth: true, token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role } });
    });
});

// --- Product & Order Routes ---

app.get('/api/products', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/orders', (req, res) => {
    // Admin route - get all orders (or filter?)
    db.all("SELECT * FROM orders", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/orders/user/:userId', (req, res) => {
    const { userId } = req.params;
    db.all("SELECT * FROM orders WHERE user_id = ?", [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.json(row);
    });
});

app.post('/api/products', upload.single('imageFile'), (req, res) => {
    const { title, author, price, category } = req.body;
    let image = req.body.image; // Fallback to URL if no file uploaded

    if (req.file) {
        image = `/uploads/${req.file.filename}`;
    }

    if (!title) {
        res.status(400).json({ error: "Title is required" });
        return;
    }
    const stmt = db.prepare("INSERT INTO products (title, author, price, category, image) VALUES (?, ?, ?, ?, ?)");
    stmt.run(title, author, price, category, image, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, title, author, price, category, image });
    });
    stmt.finalize();
});

app.put('/api/products/:id', upload.single('imageFile'), (req, res) => {
    const { id } = req.params;
    const { title, author, price, category } = req.body;
    let image = req.body.image;

    if (req.file) {
        image = `/uploads/${req.file.filename}`;
    }

    db.run(
        `UPDATE products SET title = ?, author = ?, price = ?, category = ?, image = ? WHERE id = ?`,
        [title, author, price, category, image, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (this.changes === 0) {
                res.status(404).json({ error: "Product not found" });
                return;
            }
            res.json({ message: "Product updated successfully", image });
        }
    );
});

app.post('/api/orders', (req, res) => {
    const { firstName, lastName, total, user_id } = req.body;
    const customerName = `${firstName} ${lastName}`;
    const orderDate = new Date().toISOString().split('T')[0];
    const status = 'Pending';
    const totalAmount = typeof total === 'number' ? `$${total.toFixed(2)}` : total;

    if (!firstName || !lastName || !total) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }

    const stmt = db.prepare("INSERT INTO orders (user_id, customerName, orderDate, totalAmount, status) VALUES (?, ?, ?, ?, ?)");
    stmt.run(user_id || null, customerName, orderDate, totalAmount, status, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID, message: "Order placed successfully" });
    });
    stmt.finalize();
});

app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.json({ message: "Product deleted successfully" });
    });
});

// 3. SPA Fallback (Must be after API routes)
app.get(/(.*)/, (req, res) => {
    // Exclude API routes
    if (req.path.startsWith('/api')) {
        return res.status(404).json({ error: "API endpoint not found" });
    }

    // If request starts with /admin, serve Admin index.html
    if (req.path.startsWith('/admin')) {
        return res.sendFile(path.join(__dirname, '..', 'backend', 'build', 'index.html'));
    }

    // Otherwise, serve Frontend index.html
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
