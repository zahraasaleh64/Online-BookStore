import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import About from './Pages/About';
import Books from './Pages/Books';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';  // Add this import

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<Books />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />  {/* Add this route inside Routes */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;