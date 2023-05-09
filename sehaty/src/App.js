import { Route, Routes } from "react-router-dom";
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
import ProfileP from "./views/Profile"
import RoomPage from "./room";
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/Claim" element={<Claim />} />
        <Route path="/doctors" element={<DoctorView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path={"/"} element={<Landing />} />
        <Route path={"/forgetpassword"} element={<ForgotPassword />} />
        <Route path={"/resetpassword/:token"} element={<ResetPassword />} />
        <Route path={"/medicalRecordPatient/:idUser"} element={<MedicalRecords/>} />
        <Route path={"/medicalRecordDocteur/:idUser"} element={<MedicalRecordsD/>}/>
        <Route path={"/patientlist/:idUser"} element={<PatientListDocteur/>}/>
        <Route path={"/addMedicalRecord/:idUser"} element ={<AddMedicalRecord/>}/>
        <Route path={"/ambulance"} element={  <AmbulanceServiceP /> } />
        <Route path={"/profile"} element={<ProfileP/>}/>
        <Route path={"/Appointment/:idUser"} element={<BookAppointment />} />
        <Route path="/room/:roomId" element={<RoomPage />}/>
        <Route path='/pharmacy' element={<GestionPharmacie />} />
				<Route path='/pharmacy/:id' element={<PharmacyDetails />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
