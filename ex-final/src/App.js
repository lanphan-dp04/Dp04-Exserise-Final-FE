import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./app/views/login/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Router from "./app/views/router/Router";
import { useSelector } from "react-redux";

function App() {
  // console.log('Test', process.env.REACT_APP_API_LOGIN)



  const isToken = useSelector((state) => state.auth.login.isToken);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={isToken ? <Router /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
