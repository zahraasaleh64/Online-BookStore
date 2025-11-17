import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img src="/logo512.png" alt="Online BookStore" className="logo-img" />
          <h2>Online BookStore</h2>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/books" className="nav-link">Books</a>
          </li>
          <li className="nav-item">
            <a href="/categories" className="nav-link">Categories</a>
          </li>
          <li className="nav-item">
            <a href="/cart" className="nav-link">Cart</a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">About</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;