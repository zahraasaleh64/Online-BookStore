import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const MyOrders = () => {
    const { user, token } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                // Fetch orders for this specific user
                const response = await fetch(`/api/orders/user/${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    // Sort orders by date descending (newest first)
                    const sortedOrders = data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
                    setOrders(sortedOrders);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, token, navigate]);

    if (loading) return <div className="contact-section" style={{ textAlign: 'center', padding: '100px' }}>Loading orders...</div>;

    return (
        <div className="contact-section" style={{ minHeight: '80vh' }}>
            <div className="container">
                <h2 className="section-title">My Orders</h2>

                {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '10px' }}>
                        <h3>No orders found</h3>
                        <p>You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {orders.map(order => (
                            <div key={order.id} className="contact-item" style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Order #{order.id}</h3>
                                        <p style={{ color: '#666', fontSize: '0.9rem' }}>Date: {order.orderDate}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '50px',
                                            background:
                                                order.status === 'Delivered' ? '#dcfce7' :
                                                    order.status === 'Shipped' ? '#dbeafe' :
                                                        order.status === 'Cancelled' ? '#fee2e2' : '#fef9c3',
                                            color:
                                                order.status === 'Delivered' ? '#166534' :
                                                    order.status === 'Shipped' ? '#1e40af' :
                                                        order.status === 'Cancelled' ? '#991b1b' : '#854d0e',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem',
                                            display: 'inline-block'
                                        }}>
                                            {order.status}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ margin: 0 }}><strong>Total Amount:</strong></p>
                                        <p style={{ fontSize: '1.5rem', color: '#1e3a8a', fontWeight: 'bold' }}>{order.totalAmount}</p>
                                    </div>
                                    {/* You could add a 'View Details' button here if you had order items stored */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
