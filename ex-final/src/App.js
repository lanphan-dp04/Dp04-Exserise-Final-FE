import "./App.css";
import Login from "./app/views/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./app/views/homepage/Homepage";
import { history } from "./app/helpers/history";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes history={history}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
