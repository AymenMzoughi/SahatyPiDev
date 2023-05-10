import { Route, Routes , Navigate} from "react-router-dom";
import "./App.css";
import Landing from "./views/Landing";
import Contact from "./views/Contact";
import Claim from "./views/Claim";
import NavBar from "./components/NavBar";
import Footer from "./components/footer"
import DoctorView from "./components/Doctor";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import ForgotPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import BookAppointment from "./components/BookAppointment";
import MedicalRecords from "./views/showMedicalRecordPatient";
import MedicalRecordsD from "./views/showMedicalRecordDoctor";
import AmbulanceServiceP from "./components/ambulancePatient";
import PatientListDocteur from "./views/PatientList";
import AddMedicalRecord from "./views/AddMedicalRecord";
import GestionPharmacie from './components/GestionPharmacie';
import PharmacyDetails from './components/PharmacyDetails';
import ProfileD from "./views/ProfileD"
import RoomPage from "./room";
import ProfileP from "./views/ProfileP";
import Notifications from "./views/Notifications";
import Tips from "./views/Tips";
import Room from "./views/Room";
import Payment from "./views/payment";
import Dashboard from "./views/dashboard";
import { useLocation } from 'react-router-dom';
function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || null;
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname === '/dash' || location.pathname==='/dash/addTip' || location.pathname==='/dash/ListTip'|| location.pathname==='/dash/ambulance' || location.pathname==='/dash/hospital'|| location.pathname==='/dash/ListTip'|| location.pathname==='/dash/ambulance' || location.pathname==='/dash/medicalrecord'? null : <NavBar />}

      <Routes>

        <Route path="/contact" element={<Contact />} />
        <Route path="/Claim" element={<Claim />} />
        <Route path="/doctors" element={<DoctorView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path={"/home"} element={<Landing />} />
        <Route path={"/forgetpassword"} element={<ForgotPassword />} />
        <Route path={"/resetpassword/:token"} element={<ResetPassword />} />
        <Route path={"/medicalRecordPatient/:idUser"} element={<MedicalRecords />} />
        <Route path={"/medicalRecordDocteur/:idUser"} element={<MedicalRecordsD />} />
        <Route path={"/patientlist/:idUser"} element={<PatientListDocteur />} />
        <Route path={"/addMedicalRecord/:idUser"} element={<AddMedicalRecord />} />
        <Route path={"/ambulance"} element={<AmbulanceServiceP />} />
        <Route
          path={"/profile"}
          element={
            userRole === "Docteur" ? (
              <ProfileD />
            ) : userRole === "Patient" ? (
              <ProfileP />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path={"/notification"} element={<Notifications />} />
        <Route path={"/profile"} element={<ProfileD />} />
        <Route path={"/Appointment/:idUser"} element={<BookAppointment />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path='/pharmacy' element={<GestionPharmacie />} />
        <Route path='/pharmacy/:id' element={<PharmacyDetails />} />
        <Route path="/MedicalTips/*" element={<Tips />} />
        <Route path="/room/:roomID" element={<Room />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="dash/*" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
