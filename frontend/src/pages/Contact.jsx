const Contact = () => {
  return (
    <div className="contact-page">

      <div className="page-title">
        <p className="small-title">GET IN TOUCH</p>

        <h1>Contact Us</h1>

        <p>
          Have any questions? We would love to hear from you.
        </p>
      </div>

      <div className="contact-box">

        <div className="contact-info">
          <h2>Let's Talk</h2>

          <p>
            📧 Email: minishop@gmail.com
          </p>

          <p>
            📞 Phone: +91 98765 43210
          </p>

          <p>
            📍 Location: Hyderabad, India
          </p>
        </div>

        <div className="contact-form">

          <input
            type="text"
            placeholder="Your Name"
          />

          <input
            type="email"
            placeholder="Your Email"
          />

          <textarea
            placeholder="Your Message"
            rows="5"
          ></textarea>

          <button
            className="main-button"
            onClick={() =>
              alert("Thank you! Your message has been received.")
            }
          >
            Send Message
          </button>

        </div>

      </div>

    </div>
  );
};

export default Contact;