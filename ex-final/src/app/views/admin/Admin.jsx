import { Layout, Slider } from "antd";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { history } from "../../helpers/history";
import EditUser from "../../Page/user/editUser/EditUser";
import Register from "../../Page/user/formUser/Register";
import ListUser from "../../Page/user/listUser/ListUser";
import Header from "../header/Header";
import Request from "../homepage/Homepage";
import MenuSider from "../menuSider/MenuSider";
import CreateRequest from "../staff/createRequest/CreateRequest";
import DetailDayoff from "../staff/detailDayoff/DetailDayoff";
import DayOff from "../staff/dayoff/DayOff";

function Admin() {
  const { Content, Sider } = Layout;

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        style={{ height: "100%" }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <MenuSider />
      </Sider>
      <Layout>
        <Header />
        <Content style={{ height: "100%", overflow: "scroll" }}>
          <div>
            <Routes history={history}>
              <Route path="/request" element={<Request />} />
              <Route path="/create-request" element={<CreateRequest />} />

              <Route path="/dayoff" element={<DayOff />} />
              <Route path="/detail-dayoff" element={<DetailDayoff />} />
              <Route path="/list/form" element={<Register />} />
              <Route path="/list/edit/:id" element={<EditUser />} />
              <Route path="/list" element={<ListUser />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
