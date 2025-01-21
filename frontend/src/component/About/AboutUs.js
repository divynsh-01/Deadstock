import React from 'react';
import './AboutUs.css';
import logo from "../../images/logoHead.png"

const AboutUs = () => {
  return (
    <main>
      <section id="logoHead" className="animated-section fade-in">
        <div className="headlogo">
          <div className="logo bounce">
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </section>

      <section id="description" className="animated-section slide-up">
        <div className="description-content">
          <h2>What is Dead Stock?</h2>
          <p>
            Dead stock refers to merchandise that remains unsold and unused for an extended period, tying up valuable
            resources and warehouse space for retailers and manufacturers.
          </p>
          <p>
            Managing dead stock is a significant challenge for businesses, as it represents lost revenue and wasted
            investment. It can also lead to increased storage costs, reduced cash flow, and diminished profitability.
          </p>

          <h2>What is Dead Stock Marketplace?</h2>
          <p>
            Dead Stock Marketplace is your premier platform for handling dead stock inventory effectively. Our platform
            connects retailers, wholesalers, and manufacturers with buyers interested in purchasing dead stock items at
            discounted prices.
          </p>
          <p>
            By facilitating the sale of dead stock inventory, we help businesses optimize their operations, recover
            capital, and free up valuable storage space for more profitable merchandise.
          </p>
          <p>
            For buyers, Dead Stock Marketplace offers a diverse range of products at discounted rates, providing
            opportunities to discover unique items and save money on their purchases.
          </p>
        </div>
      </section>

      <section id="impact" className="animated-section zoom-in">
        <div className="impact-content">
          <h2>Why Dead Stock Matters</h2>
          <ul>
            <li>
              <strong>Economic Impact:</strong> Managing dead stock efficiently improves cash flow and reduces inventory
              losses.
            </li>
            <li>
              <strong>Sustainability:</strong> Reducing waste through redistribution helps build a greener supply chain.
            </li>
            <li>
              <strong>Community Support:</strong> Buyers gain access to affordable goods, helping underserved
              communities.
            </li>
          </ul>
          <p>
            Dead Stock Marketplace is more than a solution—it's a movement toward smarter, more sustainable inventory
            management for a better future.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
