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

function App() {
  const { Content, Footer, Sider } = Layout;

  return (
    <div className="App">
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
              <BrowserRouter>
                <Routes history={history}>
                  <Route path="/" element={<Home />} />
                  <Route path="/myrequest" element={<MyRequest />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="user" element={<User />}>
                    <Route index element={<Register />} />
                    <Route path="form" element={<Register />} />
                    <Route path="list" element={<ListUser />} />
                  </Route>
                  <Route path="/" element={<Home />} />
                </Routes>
              </BrowserRouter>
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
    </div>
  );
}

export default App;
