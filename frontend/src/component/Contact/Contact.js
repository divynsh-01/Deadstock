import React from 'react';
import "./Contact.css";
import contactImage from "../../images/Customer.png"; // Add your contact image

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-left">
                <h2>Contact Us About <br /><span className="highlight">Dead Stock Marketplace</span></h2>
                <p>
                    We’d love to help you clear dead stock, optimize storage, and recover capital. 
                    Here are a few ways to get in touch with our team.
                </p>

                <div className="contact-options">
                    <div className="contact-card">
                        <i className="fas fa-phone"></i>
                        <h3>Call us directly</h3>
                        <p>+91 123-456-7890</p>
                        <a href="tel:+911234567890">See more local numbers</a>
                    </div>

                    <div className="contact-card">
                        <i className="fas fa-comments"></i>
                        <h3>Mail our team</h3>
                        <p>support@deadstockmarketplace.com</p>
                        <a href="tel:support@deadstockmarketplace.com">Mail us</a>
                    </div>

                </div>
            </div>

            <div className="contact-right">
                <img src={contactImage} alt="Contact Support" />
            </div>
        </div>
    );
};

export default Contact;