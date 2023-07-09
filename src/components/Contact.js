import React, { useRef } from 'react';

const Contact = () => {
  const contactFormRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <div className="contact-page-container">
      <div className="contact-container" id="contact" ref={contactFormRef}>
        <div className="letter-send">
            <form className="letter"  onSubmit={handleSubmit}>
              <div className="side">
                <h1 className="contact-title">Contact us</h1>
                <textarea
                  className="contact-input contact-textarea"
                  name="message"
                  placeholder="Your message"
                  required
                />
              </div>
              <div className="side">
                <input
                  className="contact-input"
                  type="text"
                  name="name"
                  placeholder="Your name"
                />
                <input
                  className="contact-input"
                  type="email"
                  name="email"
                  placeholder="Your email"
                />
                <button className="btn-contact-submit">Send</button>
              </div>
            </form>
          <div className="envelope front" />
          <div className="envelope back" />
        </div>
        <p className="result-message">Thank you for your message!{"\n"}We'll get back to you shortly.</p>
      </div>
    </div>
  )
}

export default Contact;
