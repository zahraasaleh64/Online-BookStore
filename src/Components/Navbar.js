import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

function Navbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <img src="/logo512.png" alt="Online BookStore" className="logo-img" />
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/books" className="nav-link">Books</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              Cart {cartCount > 0 && <span className="cart-badge">({cartCount})</span>}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;