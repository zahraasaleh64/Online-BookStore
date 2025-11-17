import React from 'react';
import './App.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Welcome to Online BookStore</h1>
        <p>Discover your next favorite book</p>
        <div className="header-search">
          <input 
            type="text" 
            placeholder="Search for books..." 
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </div>
    </header>
  );
}

export default Header;