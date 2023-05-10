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
import Tips from "./views/Tips";
import Room from "./views/Room";
import Payment from "./views/payment";
import Dashboard from "./views/dashboard";
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === '/dash' || location.pathname==='/dash/addTip' || location.pathname==='/dash/ListTip'|| location.pathname==='/dash/ambulance' || location.pathname==='/dash/hospital'|| location.pathname==='/dash/ListTip'|| location.pathname==='/dash/ambulance' || location.pathname==='/dash/medicalrecord'? null : <NavBar />}
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
        <Route path="/MedicalTips/*" element={<Tips />} />
        <Route path="/room/:roomID" element={<Room />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="dash/*" element={<Dashboard />} />

      </Routes>
    </div>
  );
}

export default App;
