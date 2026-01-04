const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql2');
const path = require('path');
const bcrypt = require('bcryptjs');

let db;
const isProduction = process.env.NODE_ENV === 'production' || process.env.DB_HOST;

if (isProduction && process.env.DB_HOST) {
    // MySQL Connection for cPanel/Hosting
    db = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }).promise();
    console.log("Using MySQL Database (Production)");
} else {
    // SQLite Connection for Local Development
    const dbPath = path.resolve(__dirname, 'database.sqlite');
    const sqliteDb = new sqlite3.Database(dbPath);

    // Wrapper to make SQLite act like a Promise-based MySQL pool for the rest of the app
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
    console.log("Using SQLite Database (Local)");
}

const initDb = async () => {
    try {
        // Create users table
        await db.query(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            firstName VARCHAR(100),
            lastName VARCHAR(100),
            role VARCHAR(20) DEFAULT 'user'
        )`);

        // Create products table
        await db.query(`CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255),
            price VARCHAR(50),
            category VARCHAR(100),
            image TEXT
        )`);

        // Create orders table
        await db.query(`CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            customerName VARCHAR(255) NOT NULL,
            orderDate VARCHAR(50) NOT NULL,
            totalAmount VARCHAR(50) NOT NULL,
            status VARCHAR(50) NOT NULL
        )`);

        // Seed Admin if missing
        const [users] = await db.query("SELECT * FROM users WHERE email = ?", ['admin@bookstore.com']);
        if (users.length === 0) {
            const hashedPassword = bcrypt.hashSync('admin123', 8);
            await db.query("INSERT INTO users (email, password, firstName, lastName, role) VALUES (?, ?, ?, ?, ?)",
                ['admin@bookstore.com', hashedPassword, 'Admin', 'User', 'admin']);
            console.log("Admin user created.");
        }

        // Seed Products if missing
        const [products] = await db.query("SELECT COUNT(*) as count FROM products");
        const count = isProduction && process.env.DB_HOST ? products[0].count : products[0][0]['count(*)'] || products[0][0]['COUNT(*)'];

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
            console.log("Database seeded with products.");
        }

        // Seed Orders if missing
        const [orders] = await db.query("SELECT COUNT(*) as count FROM orders");
        const orderCount = isProduction && process.env.DB_HOST ? orders[0].count : orders[0][0]['count(*)'] || orders[0][0]['COUNT(*)'];

        if (orderCount === 0) {
            await db.query("INSERT INTO orders (customerName, orderDate, totalAmount, status) VALUES (?, ?, ?, ?)",
                ["John Doe", "2023-10-01", "$45.99", "Delivered"]);
            console.log("Database seeded with orders.");
        }
    } catch (err) {
        console.error("Database Init Error:", err);
    }
};

module.exports = { db, initDb };
