import "./App.css";
import Login from "./app/views/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./app/views/homepage/Homepage";
import { history } from "./app/helpers/history";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./app/Page/user";
import Register from "./app/Page/user/formUser/Register";
import ListUser from "./app/Page/user/listUser/ListUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes history={history}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/*  */}
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

export default App;
