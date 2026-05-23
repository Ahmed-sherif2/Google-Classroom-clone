import { useState } from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Classroom</h1>
        <form className="login-form" action="submit">
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              className="login-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter your password"
              className="login-input"
            />
          </div>
          <div className="button-group">
            <button type="submit" className="btn btn-signin">
              Sign in
            </button>
            <button type="button" className="btn btn-register">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
