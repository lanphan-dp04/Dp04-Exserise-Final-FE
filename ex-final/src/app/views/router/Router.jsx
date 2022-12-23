import { Layout, Slider } from "antd";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { history } from "../../helpers/history";
import EditUser from "../../Page/user/editUser/EditUser";
import Register from "../../Page/user/formUser/Register";
import ListUser from "../../Page/user/listUser/ListUser";
import Header from "../header/Header";
import Request from "../requests/Requests";
import MenuSider from "../menuSider/MenuSider";
import CreateRequest from "../staff/formDayOff/FormDayOff";
import DetailDayoff from "../staff/detailDayoff/DetailDayoff";
import DayOff from "../staff/dayoff/DayOff";
import Group from "../manager/groups/Group";
import GroupDetail from "../manager/groupDetail/GroupDetail";
import DetailUser from "../../Page/user/detailUser/DetailUser";
import DetailRequest from "../requests/DetailRequest";
import FormEditDayOff from "../requests/FormEditDayOff";
import CreateGroup from "../manager/createGroup/CreateGroup";
import Page404 from "../../Page/error/Page404";
import Page403 from "../../Page/error/Page403";

function Router() {
  const { Content, Sider } = Layout;

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        style={{ height: "100%" }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          
        }}
        onCollapse={(collapsed, type) => {
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
              <Route path="/requests" element={<Request />} />
              <Route path="/requests/detail/:id" element={<DetailRequest />} />
              <Route path="/requests/edit/:id" element={<FormEditDayOff />} />
              <Route path="/create-request" element={<CreateRequest />} />

              <Route path="/dayoff" element={<DayOff />} />
              <Route path="/dayoff/:id" element={<DetailDayoff />} />

              <Route path="/list/form" element={<Register />} />
              <Route path="/list/detail/:id" element={<DetailUser />} />
              <Route path="/list/edit/:id" element={<EditUser />} />
              <Route path="/list" element={<ListUser />} />

              <Route path="/group/" element={<Group />} />
              <Route path="/group/create" element={<CreateGroup />} />
              <Route path="/group/detail/:id" element={<GroupDetail />} />

              <Route path="/error-404" element={<Page404 />} />
              <Route path="/error-403" element={<Page403 />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Router;
