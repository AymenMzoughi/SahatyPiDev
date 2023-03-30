import logo from './logo.svg';
import './App.css';
import AddMedicalRecordForm from './components/addMedicalRecordForm';
import MedicalRecords from './components/showMedicalRecord';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
function App() {
  const handleFormSubmit = (formData) => {
    // Do something with the form data
    console.log(formData);
  };
  return (
    <div>
    <AddMedicalRecordForm onSubmit={handleFormSubmit}/>
    <MedicalRecords/>
  </div>
  );
}

export default App;
