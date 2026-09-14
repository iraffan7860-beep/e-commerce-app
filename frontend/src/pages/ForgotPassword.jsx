import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://e-commerce-app-v9zz.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            newPassword
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Password changed successfully!");

      setEmail("");
      setNewPassword("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-box">

        <h1>Reset Password</h1>

        <p>
          Enter your registered email and create a new password.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            type="submit"
            className="main-button"
          >
            Reset Password
          </button>

        </form>

        <Link to="/login" className="auth-link">
          Back to Login
        </Link>

      </div>

    </div>
  );
};

export default ForgotPassword;