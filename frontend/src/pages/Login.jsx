import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const googleToken = new URLSearchParams(
  window.location.hash.substring(1)
).get("token");

if (googleToken) {
  localStorage.setItem("token", googleToken);
  window.history.replaceState(null, "", "/login");
  navigate("/");
  window.location.reload();
}

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://e-commerce-app-v9zz.onrender.com//api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
      window.location.reload();
    } catch (error) {
      setMessage("Login failed");
    }
  };

  const googleLogin = () => {
    window.location.href =
      "https://e-commerce-app-v9zz.onrender.com//api/auth/google";
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>Login</h2>

        <form onSubmit={login}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        {message && <p>{message}</p>}

        <p>
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </p>

        <button
          onClick={googleLogin}
          className="google-btn"
        >
          Continue with Google
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;