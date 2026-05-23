import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api.js";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ============================================
  // Handle Sign In
  // ============================================
  // Calls backend API to authenticate user
  const handleSignIn = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call login API
      const response = await loginUser(email, password);

      if (response.success) {
        // Login successful - update auth state and redirect
        setIsLoggedIn?.(true);
        navigate("/home");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // Handle Register Navigation
  // ============================================
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Classroom</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleSignIn}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              className="login-input"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter your password"
              className="login-input"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              disabled={loading}
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-signin" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <button
              type="button"
              className="btn btn-register"
              onClick={handleRegister}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
