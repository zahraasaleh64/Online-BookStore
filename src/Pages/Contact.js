import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock } from 'react-icons/fa';
import '../App.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-main-section">
        <div className="container">
          <div className="contact-main-content">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2 className="section-title">Send Us a Message</h2>
              <form className="contact-form-full" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more..."
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>

            {/* Contact Info */}
<div className="contact-info-wrapper">
  <div className="contact-info-single-box">
  <h2 className="section-title">Contact Information</h2>
    <div className="contact-info-item">
      <div className="contact-icon">
        <FaMapMarkerAlt />
      </div>
      <div className="contact-info-content">
        <h3>Address</h3>
        <p>123 Book Street</p>
        <p>Reading City, RC 12345</p>
        <p>United States</p>
      </div>
    </div>

    <div className="contact-info-item">
      <div className="contact-icon">
        <FaEnvelope />
      </div>
      <div className="contact-info-content">
        <h3>Email</h3>
        <p>info@onlinebookstore.com</p>
        <p>support@onlinebookstore.com</p>
      </div>
    </div>

    <div className="contact-info-item">
      <div className="contact-icon">
        <FaPhone />
      </div>
      <div className="contact-info-content">
        <h3>Phone</h3>
        <p>+961 3 856 843</p>
        <p>+961 78 968 221</p>
      </div>
    </div>

    <div className="contact-info-item">
      <div className="contact-icon">
        <FaClock />
      </div>
      <div className="contact-info-content">
        <h3>Business Hours</h3>
        <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</p>
        <p><strong>Saturday - Sunday:</strong> 10:00 AM - 4:00 PM</p>
        <p><strong>Sunday:</strong> Off</p>
      </div>
    </div>
  </div>
</div>
          </div>

      {/* Map Section */}
<div className="map-section">
  <h2 className="section-title">Find Us</h2>
  <div className="map-container">
    <iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.1234567890!2d35.3732507!3d33.5571538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ef03ff51e8597%3A0x181e41e3b9ff1086!2sSidon!5e0!3m2!1sen!2slb!4v1234567890123!5m2!1sen!2slb"
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="BookStore Location"
    ></iframe>
  </div>
  <p className="map-note" style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
    123 Book Street, Saida, Lebanon
  </p>
</div>
        </div>
      </section>
    </div>
  );
}

export default Contact;