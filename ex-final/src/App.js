import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./app/views/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Router from "./app/views/router/Router";
import { useSelector } from "react-redux";
import { getData, listKey } from "./app/helpers/common";
import { useEffect } from "react";

function App() {

  const isToken = useSelector((state) => state.auth.login.isToken);
  const token = getData(listKey.token)

  useEffect(() => {
  },[isToken])
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={token ? <Router /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
