import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { FaLock, FaCreditCard, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import '../App.css';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    // Billing Address (optional)
    sameAsShipping: true,
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    console.log('Order submitted:', { formData, cartItems, total: getTotalPrice() });
    
    // Show success message and clear cart
    alert('Order placed successfully! Thank you for your purchase.');
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <section className="checkout-hero">
          <div className="container">
            <h1>Your cart is empty</h1>
            <p>Add some items to your cart before checkout</p>
            <button onClick={() => navigate('/books')} className="shop-now-btn">
              Continue Shopping
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <section className="checkout-hero">
        <div className="container">
          <h1>Checkout</h1>
          <p>Complete your order below</p>
        </div>
      </section>

      <section className="checkout-section">
        <div className="container">
          <div className="checkout-content">
            <div className="checkout-form-wrapper">
              <form onSubmit={handleSubmit} className="checkout-form">
                {/* Shipping Information */}
                <div className="form-section">
                  <h2 className="section-title-form">
                    <FaMapMarkerAlt /> Shipping Information
                  </h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Street Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City *</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State/Province *</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">Zip Code *</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country *</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="LB">Lebanon</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                      <option value="AU">Australia</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="form-section">
                  <h2 className="section-title-form">
                    <FaCreditCard /> Payment Information
                  </h2>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number *</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardName">Name on Card *</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Address (Optional) */}
                <div className="form-section">
                  <h2 className="section-title-form">
                    <FaUser /> Billing Address
                  </h2>
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        name="sameAsShipping"
                        checked={formData.sameAsShipping}
                        onChange={handleChange}
                      />
                      Same as shipping address
                    </label>
                  </div>
                  {!formData.sameAsShipping && (
                    <>
                      <div className="form-group">
                        <label htmlFor="billingAddress">Billing Address</label>
                        <input
                          type="text"
                          id="billingAddress"
                          name="billingAddress"
                          value={formData.billingAddress}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="billingCity">City</label>
                          <input
                            type="text"
                            id="billingCity"
                            name="billingCity"
                            value={formData.billingCity}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="billingState">State</label>
                          <input
                            type="text"
                            id="billingState"
                            name="billingState"
                            value={formData.billingState}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="billingZipCode">Zip Code</label>
                          <input
                            type="text"
                            id="billingZipCode"
                            name="billingZipCode"
                            value={formData.billingZipCode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <button type="submit" className="place-order-btn">
                  <FaLock /> Place Order
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="checkout-summary">
              <h2>Order Summary</h2>
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.title} />
                    <div className="order-item-details">
                      <h4>{item.title}</h4>
                      <p>Qty: {item.quantity}</p>
                      <p className="order-item-price">
                        ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="total-row">
                  <span>Tax:</span>
                  <span>$0.00</span>
                </div>
                <div className="total-row final-total">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;