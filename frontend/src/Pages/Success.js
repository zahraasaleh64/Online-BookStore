import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import '../App.css';

function Success() {
    const navigate = useNavigate();

    return (
        <div className="success-page">
            <div className="container">
                <div className="success-card">
                    <div className="success-icon">
                        <FaCheckCircle />
                    </div>
                    <h1>Thank You!</h1>
                    <h2>Your order has been successfully placed.</h2>
                    <p>
                        We've received your order and we're getting it ready for delivery.
                        You will receive a confirmation email shortly with your order details.
                    </p>
                    <div className="order-number">
                        <span>Order Number:</span>
                        <strong>#ORD-{Math.floor(Math.random() * 1000000)}</strong>
                    </div>
                    <div className="success-actions">
                        <button onClick={() => navigate('/books')} className="continue-shopping-btn">
                            <FaShoppingBag /> Continue Shopping
                        </button>
                        <button onClick={() => navigate('/')} className="back-home-btn">
                            Go to Homepage <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Success;
