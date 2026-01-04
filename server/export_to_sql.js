const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);
const outputPath = path.resolve(__dirname, 'dump.sql');
const stream = fs.createWriteStream(outputPath);

const tables = ['users', 'products', 'orders'];

const escape = (val) => {
    if (val === null || val === undefined) return 'NULL';
    if (typeof val === 'number') return val;
    return `'${val.toString().replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
};

console.log("Starting export...");
stream.write("-- MySQL Dump generated from SQLite\n");
stream.write("SET FOREIGN_KEY_CHECKS=0;\n\n");

// Add CREATE TABLE statements strictly for MySQL
stream.write(`
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  role VARCHAR(50) DEFAULT 'user'
) ENGINE=InnoDB;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  price VARCHAR(50),
  category VARCHAR(100),
  image TEXT
) ENGINE=InnoDB;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  customerName VARCHAR(255) NOT NULL,
  orderDate VARCHAR(50) NOT NULL,
  totalAmount VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

`);

const processTable = (index) => {
    if (index >= tables.length) {
        stream.write("\nSET FOREIGN_KEY_CHECKS=1;\n");
        stream.end();
        console.log("✅ Dump created successfully at: " + outputPath);
        db.close();
        return;
    }

    const tableName = tables[index];
    console.log(`Processing table: ${tableName}`);

    db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
        if (err) {
            console.error(`Error reading ${tableName}:`, err);
            return;
        }

        if (rows.length > 0) {
            stream.write(`\n-- Data for ${tableName}\n`);
            rows.forEach(row => {
                const keys = Object.keys(row);
                const values = keys.map(k => escape(row[k]));
                stream.write(`INSERT INTO ${tableName} (\`${keys.join('`, `')}\`) VALUES (${values.join(', ')});\n`);
            });
        }

        processTable(index + 1);
    });
};

processTable(0);
