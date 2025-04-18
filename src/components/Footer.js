import React, { useState } from "react";
import "./footer.css";

function Footer() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <footer className="site-footer">
                <div className="footer-content">
                    <button className="contact-btn" onClick={() => setShowModal(true)}>Contact Us</button>
                    <p>© {new Date().getFullYear()} Online Marketing. All rights reserved.</p>
                </div>
            </footer>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Contact Information</h3>
                        <p>Email: support@onlinemarket.com</p>
                        <p>Phone: +1 (123) 456-7890</p>
                        <p>Customer Service Hours: 9am - 6pm EST</p>
                        <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Footer;
