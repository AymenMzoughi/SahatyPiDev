import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./views/Landing";
import Contact from "./views/Contact";
import NavBar from "./components/NavBar";
import DoctorView from "./views/DoctorView";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<DoctorView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
