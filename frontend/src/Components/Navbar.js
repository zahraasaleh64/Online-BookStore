import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext';

function Navbar() {
  const { getCartCount } = useCart();
  const { user, logout } = useContext(AuthContext);
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

          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link" style={{ cursor: 'default', color: '#1e3a8a', fontWeight: 'bold' }}>Hi, {user.firstName}</span>
              </li>
              <li className="nav-item">
                <Link to="/myorders" className="nav-link">My Orders</Link>
              </li>
              <li className="nav-item">
                <button onClick={logout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontFamily: 'inherit' }}>Logout</button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/signup" className="nav-link" style={{ backgroundColor: '#1e3a8a', color: 'white', borderRadius: '4px', padding: '5px 10px', textDecoration: 'none' }}>Sign Up</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;