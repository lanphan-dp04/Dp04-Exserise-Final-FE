import "./Navigation.scss"
import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="header">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/user/list">Product List</NavLink>
        </li>
        <li>
          <NavLink to="/user/form">Product Form</NavLink>
        </li>
      </ul>
    </div>
  );
}
