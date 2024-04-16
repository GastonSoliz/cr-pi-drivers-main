import { Link } from "react-router-dom";
//import style from "./NavBar.module.css";
import React from "react";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/form" className="nav-link">
                FORM
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
