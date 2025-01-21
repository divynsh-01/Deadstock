import React from 'react';
import "./Contact.css";
import logoHead from "../../images/logoHead.png"

const Contact = () => {
    return (
        <>
            <div className="cc">
                <div className="contact-container">
                    <section id="logoHead">
                        <div className="headlogo">
                            <div className="logo">
                                <img src={logoHead} style={{ maxWidth: "600px", height: "auto" }} alt="" />
                            </div>
                        </div>
                    </section>
                    <h2>Contact Us</h2>

                    <div className="contact-details">
                        <p><strong>Address:</strong> 123 Dead Stock Marketplace, Street Name, City, State, 12345</p>
                        <p><strong>Email:</strong> support@deadstockmarketplace.com</p>
                        <p><strong>Phone:</strong> (+91) 123-456-7890</p>
                        <p><strong>Working Hours:</strong> Mon - Fri, 9:00 AM - 6:00 PM</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
