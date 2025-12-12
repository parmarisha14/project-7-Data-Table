import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ handleSearch, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar bg-white shadow-sm py-3">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-3 text-purple" to="/">
          <span className="px-2 py-1 bg-purple text-white rounded">PM</span>
          <span className="ms-2" style={{ color: "#9571b5ff" }}>
            Product Management
          </span>
        </NavLink>
        <ul className="navbar-nav ms-auto d-flex flex-row align-items-center">
          <li className="nav-item mx-2">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <NavLink to="/viewdata" className="nav-link">
              View Data
            </NavLink>
          </li>
          <li className="nav-item mx-2">
            <input
              type="search"
              placeholder="Search..."
              onChange={handleSearch}
              className="form-control"
            />
          </li>
          <li className="nav-item mx-2">
            <button onClick={handleLogout} className="btn btn-purple">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
