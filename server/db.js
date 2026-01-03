const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const initDb = () => {
    db.serialize(() => {
        // Create users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            firstName TEXT,
            lastName TEXT,
            role TEXT DEFAULT 'user'
        )`);

        // Create products table
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT,
            price TEXT,
            category TEXT,
            image TEXT
        )`);

        // Create orders table
        db.run(`CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            customerName TEXT NOT NULL,
            orderDate TEXT NOT NULL,
            totalAmount TEXT NOT NULL,
            status TEXT NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )`);

        // Ensure Admin User Exists
        db.get("SELECT * FROM users WHERE email = ?", ['admin@bookstore.com'], (err, row) => {
            if (!row) {
                const hashedPassword = bcrypt.hashSync('admin123', 8);
                const stmt = db.prepare("INSERT INTO users (email, password, firstName, lastName, role) VALUES (?, ?, ?, ?, ?)");
                stmt.run('admin@bookstore.com', hashedPassword, 'Admin', 'User', 'admin');
                stmt.finalize();
                console.log("Admin user created: admin@bookstore.com / admin123");
            }
        });

        // Check if products table is empty and seed if necessary
        db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
            if (row && row.count === 0) {
                const initialBooks = [
                    { title: "The Product Book", author: "Josh Anon and Carlos Gonzalez De Villaumbrosia", price: "$19.99", category: "Business", image: "/assets/products/book1.jpg" },
                    { title: "Cracking the PM Interview", author: "Gayle Laakmann McDowell", price: "$14.77", category: "Career", image: "/assets/products/book2.jpeg" },
                    { title: "1984", author: "George Orwell", price: "$13.99", category: "Fiction", image: "/assets/products/book3.jpg" },
                    { title: "Pride and Prejudice", author: "Jane Austen", price: "$11.99", category: "Classic", image: "/assets/products/book4.jpg" },
                    { title: "The Catcher in the Rye", author: "J.D. Salinger", price: "$15.99", category: "Fiction", image: "/assets/products/book5.jpg" },
                    { title: "Lord of the Flies", author: "William Golding", price: "$12.99", category: "Fiction", image: "/assets/products/book6.jpg" },
                    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: "$12.99", category: "Classic", image: "/assets/products/book1.jpg" },
                    { title: "To Kill a Mockingbird", author: "Harper Lee", price: "$14.99", category: "Classic", image: "/assets/products/book2.jpeg" },
                    { title: "The Hobbit", author: "J.R.R. Tolkien", price: "$16.99", category: "Fantasy", image: "/assets/products/book3.jpg" },
                    { title: "Harry Potter", author: "J.K. Rowling", price: "$18.99", category: "Fantasy", image: "/assets/products/book4.jpg" },
                    { title: "The Alchemist", author: "Paulo Coelho", price: "$13.99", category: "Fiction", image: "/assets/products/book5.jpg" },
                    { title: "Sapiens", author: "Yuval Noah Harari", price: "$17.99", category: "Non-Fiction", image: "/assets/products/book6.jpg" }
                ];

                const stmt = db.prepare("INSERT INTO products (title, author, price, category, image) VALUES (?, ?, ?, ?, ?)");
                initialBooks.forEach(book => {
                    stmt.run(book.title, book.author, book.price, book.category, book.image);
                });
                stmt.finalize();
                console.log("Database seeded with initial products.");
            }
        });

        // Seed orders if empty
        db.get("SELECT COUNT(*) as count FROM orders", (err, row) => {
            if (row && row.count === 0) {
                const initialOrders = [
                    { customerName: "John Doe", orderDate: "2023-10-01", totalAmount: "$45.99", status: "Delivered" },
                    { customerName: "Jane Smith", orderDate: "2023-10-05", totalAmount: "$29.97", status: "Shipped" },
                    { customerName: "Michael Brown", orderDate: "2023-10-10", totalAmount: "$59.95", status: "Pending" },
                    { customerName: "Emily Wilson", orderDate: "2023-10-12", totalAmount: "$15.99", status: "Cancelled" }
                ];

                const stmt = db.prepare("INSERT INTO orders (customerName, orderDate, totalAmount, status) VALUES (?, ?, ?, ?)");
                initialOrders.forEach(order => {
                    stmt.run(order.customerName, order.orderDate, order.totalAmount, order.status);
                });
                stmt.finalize();
                console.log("Database seeded with initial orders.");
            }
        });
    });
};

module.exports = { db, initDb };
