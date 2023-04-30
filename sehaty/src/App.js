import { Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./views/Landing";
import Contact from "./views/Contact";
import Claim from "./views/Claim";
import NavBar from "./components/NavBar";
import DoctorView from "./views/DoctorView";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import ForgotPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import BookAppointment from "./components/BookAppointment";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/Appointment" element={<BookAppointment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Claim" element={<Claim />} />
        <Route path="/doctors" element={<DoctorView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path={"/"} element={<Landing />} />
        <Route path={"/forgetpassword"} element={<ForgotPassword />} />
        <Route path={"/resetpassword/:token"} element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
