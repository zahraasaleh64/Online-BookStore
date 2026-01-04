const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log("Dropping orders table...");
    db.run("DROP TABLE IF EXISTS orders", (err) => {
        if (err) console.error("Error dropping table:", err);
        else console.log("Orders table dropped successfully.");
    });
});

setTimeout(() => {
    db.close();
}, 1000);
