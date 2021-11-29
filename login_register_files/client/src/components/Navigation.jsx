import React from "react";
import { NavLink } from "react-router-dom";
import "../css/nav.css";
import logo from "../images/pawprint_logo.png";
function Navigation() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <div className="pawprint_header">
              <img className="pawprint_logo" src={logo} alt="Pawprint logo" />
              <strong>Pawprint</strong>
            </div>
          </NavLink>
          <div>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/update">
                  Update
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/social">
                  Posts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;
