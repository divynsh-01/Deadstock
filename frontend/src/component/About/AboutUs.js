import React from 'react';
import './AboutUs.css';
import heroImage from "../../images/shopLogo.png"; // Add your hero image

const AboutUs = () => {
  return (
    <main className="about-container">
      <section className="hero animated fade-in">
        <div className="hero-content slide-up">
          <h3>ABOUT US</h3>
          <h1>
            Helping small businesses seize a <span className="highlight">second chance</span> through the power<br />of the internet.       
          </h1>
          <p>
            Dead stock refers to products that remain unsold and unused for an extended period, tying up valuable
            resources and warehouse space for retailers and manufacturers.
          </p>
        </div>
        <div className="hero-image zoom-in">
          <img src={heroImage} alt="Person working on laptop" />
        </div>
      </section>
      
      <section className="info animated fade-in">
        <h2 className="slide-up">
          We help businesses optimize their operations, recover capital, and free up valuable storage space for more profitable merchandise.
        </h2>
        <p className="slide-up">
          Dead Stock Marketplace is your premier platform for handling dead stock inventory effectively. Our platform
          connects retailers, wholesalers, and manufacturers with buyers interested in purchasing dead stock items at
          discounted prices.
        </p>
      </section>
    </main>
  );
};

export default AboutUs;