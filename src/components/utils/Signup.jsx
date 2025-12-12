import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Signup = ({ signupData, setSignupData, handleSignup }) => {
  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSignup}>
        <h2 className="auth-title">Create Account</h2>

        <div className="auth-input-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={signupData.username}
            placeholder="Enter your username"
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
          />
        </div>

        <div className="auth-input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={signupData.email}
            placeholder="Enter your email"
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
          />
        </div>

        <div className="auth-input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={signupData.password}
            placeholder="Enter your password"
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
        </div>

        <div className="auth-input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={signupData.confirmPassword}
            placeholder="Re-enter your password"
            onChange={(e) =>
              setSignupData({
                ...signupData,
                confirmPassword: e.target.value,
              })
            }
          />
        </div>

        <button className="auth-btn" type="submit">
          Sign Up
        </button>

        <p className="auth-link">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
