import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { AuthContext } from '../Context/AuthContext';

function Navbar() {
    const { getCartCount } = useCart();
    const { user, logout } = useContext(AuthContext);
    const cartCount = getCartCount();
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const handleLogout = () => {
        logout();
        closeMobileMenu();
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
                    <img src="/logo512.png" alt="Online BookStore" className="logo-img" />
                </Link>

                <div className="menu-icon" onClick={handleClick} style={{ fontSize: '1.8rem', cursor: 'pointer' }}>
                    {click ? "✕" : "☰"}
                </div>

                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={closeMobileMenu}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/books" className="nav-link" onClick={closeMobileMenu}>Books</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link" onClick={closeMobileMenu}>About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-link" onClick={closeMobileMenu}>Contact</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/cart" className="nav-link" onClick={closeMobileMenu}>
                            Cart {cartCount > 0 && <span className="cart-badge">({cartCount})</span>}
                        </Link>
                    </li>

                    {user ? (
                        <>
                            <li className="nav-item">
                                <span className="nav-link" style={{ cursor: 'default', color: '#1e3a8a', fontWeight: 'bold' }}>
                                    Hi, {user.firstName}
                                </span>
                            </li>
                            <li className="nav-item">
                                <Link to="/myorders" className="nav-link" onClick={closeMobileMenu}>My Orders</Link>
                            </li>
                            <li className="nav-item">
                                <button
                                    onClick={handleLogout}
                                    className="nav-link"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontFamily: 'inherit' }}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link
                                to="/signup"
                                className="nav-link nav-signup-btn"
                                onClick={closeMobileMenu}
                                style={{ backgroundColor: '#1e3a8a', color: 'white', borderRadius: '4px', padding: '5px 10px', textDecoration: 'none' }}
                            >
                                Sign Up
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
