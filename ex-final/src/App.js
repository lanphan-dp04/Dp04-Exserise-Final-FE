import "./App.css";
import Login from "./app/views/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./app/views/homepage/Homepage";
import { history } from "./app/helpers/history";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes history={history}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
