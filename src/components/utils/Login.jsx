import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login = ({ loginData, setLoginData, handleLogin }) => {
  useEffect(() => {
    setLoginData({ email: "", password: "" });
  }, []);

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleLogin}>
        <h2 className="auth-title">Welcome Back</h2>

        <div className="auth-input-group">
          <label>Email</label>
          <input
            type="email"
            value={loginData.email}
            placeholder="Enter your email"
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </div>

        <div className="auth-input-group">
          <label>Password</label>
          <input
            type="password"
            value={loginData.password}
            placeholder="Enter your password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>

        <button className="auth-btn" type="submit">Login</button>

        <p className="auth-link">
          Don’t have an account? <Link to="/signup">Create Account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
