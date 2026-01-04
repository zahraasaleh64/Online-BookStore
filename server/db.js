const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql2');
const path = require('path');
const bcrypt = require('bcryptjs');

let db;
const isProduction = process.env.NODE_ENV === 'production' || process.env.DB_HOST;

if (isProduction && process.env.DB_HOST) {
    const mysqlConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };

    if (process.env.DB_SOCKET) {
        mysqlConfig.socketPath = process.env.DB_SOCKET;
    } else {
        mysqlConfig.host = process.env.DB_HOST || 'localhost';
    }

    db = mysql.createPool(mysqlConfig).promise();
} else {
    const dbPath = path.resolve(__dirname, 'database.sqlite');
    const sqliteDb = new sqlite3.Database(dbPath);

    db = {
        query: (sql, params) => new Promise((resolve, reject) => {
            if (sql.trim().toLowerCase().startsWith('select')) {
                sqliteDb.all(sql, params, (err, rows) => err ? reject(err) : resolve([rows]));
            } else {
                sqliteDb.run(sql, params, function (err) {
                    if (err) reject(err);
                    else resolve([{ insertId: this.lastID, affectedRows: this.changes }]);
                });
            }
        }),
        execute: (sql, params) => db.query(sql, params)
    };
}

const initDb = async () => {
    try {
        await db.query(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            firstName VARCHAR(100),
            lastName VARCHAR(100),
            role VARCHAR(20) DEFAULT 'user'
        )`);

        await db.query(`CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255),
            price VARCHAR(50),
            category VARCHAR(100),
            image TEXT
        )`);

        await db.query(`CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            firstName VARCHAR(100),
            lastName VARCHAR(100),
            items TEXT,
            total VARCHAR(50),
            status VARCHAR(50) DEFAULT 'Pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        const [users] = await db.query("SELECT * FROM users WHERE email = ?", ['admin@bookstore.com']);
        if (users.length === 0) {
            const hashedPassword = bcrypt.hashSync('admin123', 8);
            await db.query("INSERT INTO users (email, password, firstName, lastName, role) VALUES (?, ?, ?, ?, ?)",
                ['admin@bookstore.com', hashedPassword, 'Admin', 'User', 'admin']);
        }

        const [products] = await db.query("SELECT COUNT(*) as count FROM products");
        const count = (products[0] && (products[0].count || products[0]['count(*)'])) || 0;

        if (count === 0) {
            const initialBooks = [
                { title: "The Product Book", author: "Josh Anon", price: "19.99", category: "Business", image: "/assets/products/book1.jpg" },
                { title: "PM Interview", author: "Gayle McDowell", price: "14.77", category: "Career", image: "/assets/products/book2.jpeg" },
                { title: "1984", author: "George Orwell", price: "13.99", category: "Fiction", image: "/assets/products/book3.jpg" }
            ];
            for (const book of initialBooks) {
                await db.query("INSERT INTO products (title, author, price, category, image) VALUES (?, ?, ?, ?, ?)",
                    [book.title, book.author, book.price, book.category, book.image]);
            }
        }

        const [orders] = await db.query("SELECT COUNT(*) as count FROM orders");
        const orderCount = (orders[0] && (orders[0].count || orders[0]['count(*)'])) || 0;

        if (orderCount === 0) {
            const sampleItems = JSON.stringify([{ title: "Sample Book", price: "$45.99", quantity: 1 }]);
            await db.query("INSERT INTO orders (firstName, lastName, items, total, status) VALUES (?, ?, ?, ?, ?)",
                ["John", "Doe", sampleItems, "$45.99", "Delivered"]);
        }
    } catch (err) {
        console.error("Database initialization error:", err.message);
    }
};

module.exports = { db, initDb };
