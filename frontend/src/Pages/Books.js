import React, { useState, useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import '../App.css';


function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/products');
        const data = await response.json();
        setAllBooks(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const categories = ['all', 'Fiction', 'Classic', 'Business', 'Career', 'Fantasy', 'Non-Fiction'];

  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}><h2>Loading books...</h2></div>;
  }

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
                    <img src={book.image && book.image.startsWith('/uploads') ? `http://localhost:5001${book.image}` : book.image} alt={book.title} />
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