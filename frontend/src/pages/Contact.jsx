import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    try {
      const response = await fetch(
        "https://e-commerce-app-v9zz.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            message
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Thank you! Your message has been received.");

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.log(error);
      alert("Failed to send message");
    }
  };

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

          <p>📧 Email: minishop@gmail.com</p>
          <p>📞 Phone: +91 98765 43210</p>
          <p>📍 Location: Hyderabad, India</p>
        </div>

        <div className="contact-form">

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Your Message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button
            className="main-button"
            onClick={sendMessage}
          >
            Send Message
          </button>

        </div>

      </div>

    </div>
  );
};

export default Contact;