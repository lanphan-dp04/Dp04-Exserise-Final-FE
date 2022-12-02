import "./App.css";
import Login from "./app/views/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./app/views/homepage/Homepage";
import { history } from "./app/helpers/history";
import MyRequest from "./app/views/staff/myrequest/MyRequest";
import CreateRequest from "./app/views/staff/createRequest/CreateRequest";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes history={history}>
          <Route path="/" element={<Home />} />
          <Route path="/myrequest" element={<MyRequest />} />
          <Route path="/createrequest" element={<CreateRequest />} />

          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
