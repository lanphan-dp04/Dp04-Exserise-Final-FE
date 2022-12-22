import React, { useState } from "react";
import "./menuSider.css";
import "../header/header.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from '../../assets/logo.svg';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const itemsStaff = [
  {
    key: "account",
    icon: "",
    label: "Account",
    children: [
      {
        key: "account1",
        label: <Link to="/dashboard">Dashboard</Link>,
      },
      {
        key: "account2",
        label: <Link to="/requests">Request</Link>,
      },
      {
        key: "account3",
        label: <Link to="/dayoff">Day Off</Link>,
      },
      {
        key: "account4",
        label: <Link to="/group">Groups</Link>,
      },
    ],
  },
];
const itemsAdmin = [
  {
    key: "account",
    icon: "",
    label: "Account",
    children: [
      {
        key: "account1",
        label: <Link to="/dashboard">Dashboard</Link>,
      },
      {
        key: "account2",
        label: <Link to="/requests">Request</Link>,
      },
      {
        key: "account3",
        label: <Link to="/dayoff">Day Off</Link>,
      },
    ],
  },
  {
    key: "manager",
    icon: "",
    label: "Manager",
    children: [
      {
        key: "manager1",
        label: <Link to="/list">Members</Link>,
      },
      {
        key: "manager2",
        label: <Link to="/group">Groups</Link>,
      },
      {
        key: "manager3",
        label: <Link to="/notifications">Notifications</Link>,
        children: [
          {
            key: "manager3-1",
            label: <Link to="/noti-slack">Slack</Link>,
          },
          {
            key: "manager3-2",
            label: <Link to="/noti-browser">Browser</Link>,
          },
        ],
      },
      {
        key: "manager4",
        label: <Link to="/sync">Sync</Link>,
      },
    ],
  },
  {
    key: "admin",
    icon: "",
    label: "Administation",
    children: [
      {
        key: "admin1",
        label: <Link to="/administation">Administation</Link>,
      },
    ],
  },
];
const MenuSider = () => {
  const role = useSelector((state) => state.auth.login.currentUser.role);
  const renderNav =
    role === "admin" || role === "manager" 
      ? itemsAdmin
      : itemsStaff;
  const [theme, setTheme] = useState("dark");
  const [current, setCurrent] = useState("1");
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <>
      <div className="box-logo">
        <img
          src={logo}
          alt=""
        />
      </div>
      <Menu
        theme={theme}
        onClick={onClick}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="inline"
        items={renderNav}
      />
    </>
  );
};
export default MenuSider;
