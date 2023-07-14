import React, { useRef } from 'react';
import { useForm } from "react-hook-form";

const Contact = () => {
  const { register, handleSubmit } = useForm();
  const contactFormRef = useRef();

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  }

  const onSubmit = data => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...data })
    })
      .then(() => {
        contactFormRef.current.classList.add("sent");
        console.log("Posting:", data);
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="contact-page-container">
      <div className="contact-container" id="contact" ref={contactFormRef}>
        <div className="letter-send">
          <form className="letter" name="contact" onSubmit={handleSubmit(onSubmit)} data-netlify="true">
            <div className="side">
              <h1 className="contact-title">Contact us</h1>
              <textarea
                className="contact-input contact-textarea"
                name="message"
                placeholder="Your message"
                required
                {...register("message")}
              />
            </div>
            <div className="side">
              <input
                className="contact-input"
                type="text"
                name="name"
                placeholder="Your name"
                {...register("name")}
              />
              <input
                className="contact-input"
                type="email"
                name="email"
                placeholder="Your email"
                {...register("email")}
              />
              {/* This input is hidden because it is required by netlify - name="form-name" also cannot be changed */}
              <input type="hidden" name="form-name" value="contact" />
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
