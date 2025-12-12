import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ handleSearch, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-3 text-purple" to="/">
          <span className="px-2 py-1 bg-purple text-white rounded">PM</span>
          <span className="ms-2" style={{ color: "#9571b5ff" }}>
            Product Management
          </span>
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item mx-2">
              <NavLink
                className="nav-link fw-semibold rounded px-3"
                style={({ isActive }) => ({
                  background: isActive ? "#9571b5ff" : "transparent",
                  color: isActive ? "white" : "#9571b5ff",
                })}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink
                className="nav-link fw-semibold rounded px-3"
                style={({ isActive }) => ({
                  background: isActive ? "#9571b5ff" : "transparent",
                  color: isActive ? "white" : "#9571b5ff",
                })}
                to="/viewdata"
              >
                View Data
              </NavLink>
            </li>
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <form className="d-flex">
                <input
                  className="form-control rounded-pill px-3 w-100"
                  type="search"
                  placeholder="Search product & cate"
                  style={{ borderColor: "#9571b5ff" }}
                  onChange={handleSearch}
                />
              </form>
            </li>
            <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
              <button
                onClick={handleLogout}
                className="btn px-3 py-2 fw-semibold text-white"
                style={{ backgroundColor: "#9571b5ff", borderRadius: "25px" }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
