import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./app/views/login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./app/views/admin/Admin";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/admin" element={<Admin />} /> */}
          <Route path="*" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
