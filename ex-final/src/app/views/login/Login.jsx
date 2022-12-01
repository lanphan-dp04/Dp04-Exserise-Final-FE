import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, link } from "react-router-dom";
import { loginUser } from "../../redux/action/apiRequest";
import "./login.css";
import PropTypes from "prop-types";
import { redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Login({ setToken }) {
  const [username, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      password: userPassword,
    };

    loginUser(newUser, dispatch, navigate);
  };

  return (
    <div className="fullscreen-container">
      <div className="login-container">
        <div className="login-logo">
          <img
            src="https://stunited.vn/wp-content/uploads/2019/09/stunited-e15650013362301.png"
            alt="stunited"
          />
          <h1 className="header-login-title">Login to your account</h1>
        </div>
        <form className="form-login" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Type your username"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Type your password"
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>
          <button className="button-login">Login</button>
        </form>

        <h3 className="signup-header">Log in with</h3>

        <div className="social-icons">
          <ul className="social-list">
            <li className="social-links">
              <a href="/">
                <span>
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </a>
            </li>
            <li className="social-links">
              <a href="/">
                <span>
                  <FontAwesomeIcon icon={faGoogle} />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
