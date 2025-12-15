import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        
        {}
        <div className="contact-left">
          <h1>
            Get in <span className="line">—</span> <br /> touch with us
          </h1>

          <p>
            We’re here to help! Whether you have a question about our services,
            need assistance with your account, or want to provide feedback,
            our team is ready to assist you.
          </p>

          <div className="contact-info">
            <p><strong>Email:</strong></p>
            <p className="highlight">hello@SkillTrackPro.com</p>

            <p><strong>Phone:</strong></p>
            <p>+92 326 52 710 05</p>

            <span className="timing">
              Available Monday to Friday, 9 AM - 6 PM GMT
            </span>
          </div>

          <button className="live-chat-btn">
            Live Chat →
          </button>
        </div>

        {}
        <div className="contact-right">
          <form className="contact-form">
            <div className="form-row">
              <div>
                <label>First Name</label>
                <input type="text" placeholder="Enter your first name..." />
              </div>

              <div>
                <label>Last Name</label>
                <input type="text" placeholder="Enter your last name..." />
              </div>
            </div>

            <div>
              <label>Email</label>
              <input type="email" placeholder="Enter your email address..." />
            </div>

            <div>
              <label>How can we help you?</label>
              <textarea placeholder="Enter your message..."></textarea>
            </div>

            <button type="submit" className="send-btn">
              Send Message →
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
