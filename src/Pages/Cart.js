import React from 'react';
import { useCart } from '../Context/CartContext';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../App.css';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  return (
    <div className="cart-page">
      <section className="cart-hero">
        <div className="container">
          <h1>Shopping Cart</h1>
          <p>Review your items before checkout</p>
        </div>
      </section>

      <section className="cart-section">
        <div className="container">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <p>Add some books to your cart to get started!</p>
            </div>
          ) : (
            <div className="cart-content">
              <div className="cart-items">
                <div className="cart-header">
                  <h2>Cart Items ({cartItems.length})</h2>
                  <button onClick={clearCart} className="clear-cart-btn">
                    Clear Cart
                  </button>
                </div>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="cart-item-details">
                      <h3>{item.title}</h3>
                      <p className="cart-item-author">{item.author}</p>
                      <p className="cart-item-price">{item.price}</p>
                    </div>
                    <div className="cart-item-quantity">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        <FaMinus />
                      </button>
                      <span className="quantity-number">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="cart-item-total">
                      <p>${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <h2>Order Summary</h2>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <Link to="/checkout"className="checkout-btn">Proceed to Checkout</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Cart;