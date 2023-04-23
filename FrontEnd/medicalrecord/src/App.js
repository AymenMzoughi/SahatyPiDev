import logo from './logo.svg';
import './App.css';
import AddMedicalRecordForm from './components/addMedicalRecordForm';
import MedicalRecords from './components/showMedicalRecordPatient';
import MedicalRecordsD  from './components/showMedicalRecordDoctor';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AmbulanceServiceP from './components/ambulancePatient';
import AmbulanceServiceA from './components/ambulanceAdmin';
import MyComponent from './components/test';
import HospitalComponent from './components/hospital';
function App() {
  const handleFormSubmit = (formData) => {
    // Do something with the form data
    console.log(formData);
  };
  return (
    <div>
     {/* <AddMedicalRecordForm onSubmit={handleFormSubmit}/> */}
    {/* <MedicalRecordsD/>   */}
    
    <AmbulanceServiceA/> 

    {/* <MyComponent/> */}
    {/* <HospitalComponent/> */}
  </div>
  );
}

export default App;
