const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const newBooks = [
    { title: "Pride and Prejudice", author: "Jane Austen", price: "$11.99", category: "Classic", image: "/assets/products/book4.jpg" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", price: "$15.99", category: "Fiction", image: "/assets/products/book5.jpg" },
    { title: "Lord of the Flies", author: "William Golding", price: "$12.99", category: "Classic", image: "/assets/products/book6.jpg" }
];

db.serialize(() => {
    const stmt = db.prepare("INSERT INTO products (title, author, price, category, image) VALUES (?, ?, ?, ?, ?)");
    newBooks.forEach(book => {
        // Check if book exists by title to avoid duplicates
        db.get("SELECT id FROM products WHERE title = ?", [book.title], (err, row) => {
            if (!row) {
                stmt.run(book.title, book.author, book.price, book.category, book.image, (err) => {
                    if (err) console.error("Error inserting " + book.title, err);
                    else console.log("Added: " + book.title);
                });
            } else {
                console.log("Skipping (already exists): " + book.title);
            }
        });
    });
    stmt.finalize();
});

// Close normally after a short delay to allow callbacks
setTimeout(() => {
    db.close();
    console.log("Seeding complete.");
}, 1000);
