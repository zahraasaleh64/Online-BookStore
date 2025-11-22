import React from 'react';
import '../App.css';
import ourmission from '../assets/ourmission.jpg';
import person1 from '../assets/person/person1.jpg';
import person33 from'../assets/person/person33.jpeg';
import person44 from'../assets/person/person44.jpg';

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About Online BookStore</h1>
          <p>Your trusted partner in discovering great books</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title">Our Mission</h2>
              <p>
                At Online BookStore, we believe that books have the power to transform lives, 
                inspire creativity, and connect people across cultures and generations. Our mission 
                is to make reading accessible to everyone by providing a vast collection of books 
                at affordable prices.
              </p>
              <p>
                We are committed to curating the finest selection of books from around the world, 
                ensuring that every reader can find something that speaks to their heart and mind.
              </p>
            </div>
            <div className="mission-image">
              <img src={ourmission} alt="Our Mission"/>
              <div className="mission-placeholder">
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"></div>
              <h3>Quality</h3>
              <p>We carefully select every book to ensure the highest quality content for our readers.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"></div>
              <h3>Diversity</h3>
              <p>Our collection spans all genres, cultures, and perspectives to serve every reader.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"></div>
              <h3>Customer First</h3>
              <p>Your satisfaction is our priority. We're here to help you find your next favorite book.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"></div>
              <h3>Innovation</h3>
              <p>We continuously improve our platform to provide the best shopping experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <h2 className="section-title">Our Story</h2>
          <div className="story-content">
            <p>
              Online BookStore was founded in 2020 with a simple vision: to create a digital 
              space where book lovers could discover, explore, and purchase books from the 
              comfort of their homes.
            </p>
            <p>
              What started as a small collection of curated books has grown into a comprehensive 
              online bookstore with over 10,000 titles across multiple genres. We've served 
              thousands of customers and built a community of passionate readers.
            </p>
            <p>
              Today, we continue to expand our collection, partner with publishers worldwide, 
              and innovate our platform to make book shopping easier and more enjoyable than ever.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar"><img src={person1} alt="person1"/></div>
              <h3>John Doe</h3>
              <p className="member-role">Founder & CEO</p>
              <p className="member-bio">Passionate reader and entrepreneur with 15+ years in the book industry.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar"><img src={person33} alt="person 33"/></div>
              <h3>Jane Smith</h3>
              <p className="member-role">Head of Curation</p>
              <p className="member-bio">Book critic and literary enthusiast who ensures only the best books make it to our shelves.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar"><img src={person44} alt="person44"/></div>
              <h3>Mike Johnson</h3>
              <p className="member-role">Customer Success</p>
              <p className="member-bio">Dedicated to providing exceptional service and helping customers find their perfect read.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats-section">
        <div className="container">
          <h2 className="section-title">By The Numbers</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <h3>100+</h3>
              <p>Books Available</p>
            </div>
            <div className="stat-box">
              <h3>5000+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-box">
              <h3>5+</h3>
              <p>Categories</p>
            </div>
            <div className="stat-box">
              <h3>70+</h3>
              <p>Countries Served</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;