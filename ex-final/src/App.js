import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./app/views/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./app/views/homepage/Homepage";
import { history } from "./app/helpers/history";
import MyRequest from "./app/views/staff/myrequest/MyRequest";
import User from "./app/Page/user";
import Register from "./app/Page/user/formUser/Register";
import ListUser from "./app/Page/user/listUser/ListUser";

import { Layout, Menu } from "antd";
import MenuSider from "./app/views/menuSider/MenuSider";
import Header from "./app/views/header/Header";
import DetailDayoff from "./app/views/staff/detailDayoff/DetailDayoff";

function App() {
  const { Content, Footer, Sider } = Layout;

  return (
    <div className="App">
      <BrowserRouter>
        {/* login */}
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>

        {/* layout page */}
        <Layout>
          <Sider
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
            <Content>
              <div>
                <Routes history={history}>
                  <Route path="/request" element={<Home />} />
                  <Route path="/dayoff" element={<MyRequest />} />
                  <Route path="/detail-dayoff" element={<DetailDayoff />} />

                  <Route path="user" element={<User />}>
                    <Route index element={<Register />} />
                    <Route path="form" element={<Register />} />
                    <Route path="list" element={<ListUser />} />
                  </Route>
                  {/* <Route path="/" element={<Home />} /> */}
                </Routes>
              </div>
            </Content>

            <Footer
              style={{
                textAlign: "center",
              }}
            >
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
