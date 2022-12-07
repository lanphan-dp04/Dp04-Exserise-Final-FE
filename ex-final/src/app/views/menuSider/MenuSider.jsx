import React, { useState } from "react";
import "./menuSider.css";
import "../header/header.css";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Homepage from "../homepage/Homepage";
import MyRequest from "../staff/dayoff/DayOff";
import { Link } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  // getItem("Account", "sub1", <MailOutlined />, [
  //   getItem("Dashboard", "1"),
  //   getItem("Requests", <Homepage />),
  //   ,
  //   getItem("Days off", "3"),
  //   // getItem("Option 4", "4"),
  // ]),
  // getItem("Manager", "sub2", <AppstoreOutlined />, [
  //   getItem("Members", "5"),
  //   getItem("Groups", "6"),
  //   getItem("Notification", "sub3", null, [
  //     getItem("slack", "7"),
  //     getItem("Brouwser", "8"),
  //   ]),
  // ]),
  // getItem("Administation", "sub4", <SettingOutlined />, [
  //   getItem("Workspaces", "9"),
  // ]),

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
        label: <Link to="/request">Request</Link>,
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
  const [theme, setTheme] = useState("dark");
  const [current, setCurrent] = useState("1");
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <>
      <div className="box-logo">
        <img
          src="https://stunited.vn/wp-content/uploads/2019/09/stunited-e15650013362301.png"
          alt=""
        />
      </div>
      <Menu
        theme={theme}
        onClick={onClick}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="inline"
        items={items}
        // style={{ marginTop: "60px" }}
      />
    </>
  );
};
export default MenuSider;
