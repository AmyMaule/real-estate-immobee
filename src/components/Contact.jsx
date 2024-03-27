import React, { useRef } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";

const Contact = () => {
  const { register, handleSubmit } = useForm();
  const contactFormRef = useRef();
  const contactErrorRef = useRef();

  const onSubmit = data => {
    axios.post(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
      "form-name": "contact",
      ...data
    })
    .then(res => {
      if (res.status === 200) {
        contactFormRef.current.classList.add("sent");
        contactErrorRef.current.classList.add("hide");
      } else {
        throw Error(`Error submitting form, status ${res.status}`)
      }
    })
    .catch(err => {
      console.error(err);
      contactErrorRef.current.classList.remove("hide");
    });
  }

  return (
    <div className="contact-page-container">
      <div className="contact-container" id="contact" ref={contactFormRef}>
        <div className="letter-send">
          <form className="letter" name="contact" onSubmit={handleSubmit(onSubmit)}>
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
                required
                {...register("name")}
              />
              <input
                className="contact-input"
                type="email"
                name="email"
                placeholder="Your email"
                {...register("email")}
              />
              <button className="btn-contact-submit">Send</button>
            </div>
          </form>
          <div className="envelope front" />
          <div className="envelope back" />
        </div>
        <p className="result-message">Thank you for your message!{"\n"}We'll get back to you shortly.</p>
      </div>
      <p className="contact-error hide" ref={contactErrorRef}>
        Oops! Something went wrong. Please try again soon.
      </p>
    </div>
  )
}

export default Contact;
