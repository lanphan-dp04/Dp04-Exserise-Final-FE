import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/layout-navigation/Navigation";
import Home from "./Page/Home";
import User from "./Page/user/index";
import Register from "./Page/user/formUser/Register";
import ListUser from "./Page/user/listUser/ListUser";

export default function Container() {
  return (
    <div>
      <BrowserRouter>
        {/* NAVIGATION */}
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="user" element={<User />}>
            <Route index element={<Register />} />
            <Route path="form" element={<Register />} />
            <Route path="list" element={<ListUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
