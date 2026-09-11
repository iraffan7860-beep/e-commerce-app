import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      alert(data.message);

      if (response.ok) {
        setEmail("");
        setNewPassword("");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Forgot Password</h1>

        <p>Enter your email and create a new password.</p>

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

          <button type="submit" className="main-button">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;