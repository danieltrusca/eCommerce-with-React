import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import logo from "../../assets/logo2.png";

const Header = (props) => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="callToAction">
          <ul>
            <li>
              <Link to="/registration">Register</Link>
            </li>
            <li>
              <Link to="/registration">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
