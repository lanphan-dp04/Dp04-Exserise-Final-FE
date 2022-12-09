import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./app/views/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./app/views/admin/Admin";
import { useSelector } from "react-redux";

function App() {
  // const isToken = useSelector(state => state.auth.login.isToken)

  // console.log(isToken);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route
            path="*"
            element={isToken ? <Admin /> : <Navigate to={"/login"} />}
          /> */}
          <Route path="*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
