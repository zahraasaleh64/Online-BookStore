import React, { useState } from 'react';
import { useCart } from '../Context/CartContext'; 
import '../App.css';


import '../App.css';
import book1 from '../assets/products/book1.jpg';
import book2 from '../assets/products/book2.jpeg';
import book3 from '../assets/products/book3.jpg';
import book4 from '../assets/products/book4.jpg';
import book5 from '../assets/products/book5.jpg';
import book6 from '../assets/products/book6.jpg';

function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();  

  const allBooks = [
    { id: 1, title: "The Product Book", author: "Josh Anon and Carlos Gonzalez De Villaumbrosia", price: "$19.99", image: book1, category: "Business" },
    { id: 2, title: "Cracking the PM Interview", author: "Gayle Laakmann McDowell", price: "$14.77", image: book2, category: "Career" },
    { id: 3, title: "1984", author: "George Orwell", price: "$13.99", image: book3, category: "Fiction" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", price: "$11.99", image: book4, category: "Classic" },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", price: "$15.99", image: book5, category: "Fiction" },
    { id: 6, title: "Lord of the Flies", author: "William Golding", price: "$12.99", image: book6, category: "Fiction" },
    { id: 7, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: "$12.99", image: book1, category: "Classic" },
    { id: 8, title: "To Kill a Mockingbird", author: "Harper Lee", price: "$14.99", image: book2, category: "Classic" },
    { id: 9, title: "The Hobbit", author: "J.R.R. Tolkien", price: "$16.99", image: book3, category: "Fantasy" },
    { id: 10, title: "Harry Potter", author: "J.K. Rowling", price: "$18.99", image: book4, category: "Fantasy" },
    { id: 11, title: "The Alchemist", author: "Paulo Coelho", price: "$13.99", image: book5, category: "Fiction" },
    { id: 12, title: "Sapiens", author: "Yuval Noah Harari", price: "$17.99", image: book6, category: "Non-Fiction" }
  ];

  const categories = ['all', 'Fiction', 'Classic', 'Business', 'Career', 'Fantasy', 'Non-Fiction'];

  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="books-page">
      {/* Hero Section */}
      <section className="books-hero">
        <div className="container">
          <h1>Our Book Collection</h1>
          <p>Discover thousands of books across all genres</p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="books-filter-section">
        <div className="container">
          <div className="filter-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="book-search-input"
              />
            </div>
            <div className="category-filter">
              <label>Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="results-count">{filteredBooks.length} book(s) found</p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="books-section">
        <div className="container">
          {filteredBooks.length > 0 ? (
            <div className="books-grid">
              {filteredBooks.map((book) => (
                <div key={book.id} className="book-card">
                  <div className="book-image">
                    <img src={book.image} alt={book.title} />
                    <div className="book-overlay">
                      <button className="quick-view-btn">Quick View</button>
                    </div>
                  </div>
                  <div className="book-info">
                    <span className="book-category">{book.category}</span>
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                    <p className="book-price">{book.price}</p>
                    <button className="add-to-cart-btn"
                    onClick={() => addToCart(book)}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No books found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Books;