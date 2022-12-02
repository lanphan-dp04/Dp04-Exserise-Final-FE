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

function App() {
  return (
    <div className="App">
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
  );
}

export default App;
