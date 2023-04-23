import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import ambulanceIcon from "./ambulance-icon.png";
import ambulanceIcon2 from "./unavailable.png";

const AmbulanceServiceA = () => {
    const [ambulances, setAmbulances] = useState([]);
    const [newAmbulanceName, setNewAmbulanceName] = useState("");
    const [newAmbulanceLatitude, setNewAmbulanceLatitude] = useState(0);
    const [newAmbulanceLongitude, setNewAmbulanceLongitude] = useState(0);
    const [clientId, setClientId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("danger");
    const [hospitals, setHospitals] = useState([]);
    const [selectedAmbulanceId, setSelectedAmbulanceId] = useState(null);
    const [selectedHospitalId, setSelectedHospitalId] = useState(null);

    useEffect(() => {
        getAmbulances();
        getHospitals(); // Call getHospitals to fetch hospitals data
    }, []);

    const getAmbulances = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Ambulance");
            setAmbulances(response.data.ambulances);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const getHospitals = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Hospital");
            const fetchedHospitals = response.data;
            setHospitals(fetchedHospitals);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddAmbulance = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/Ambulance/add",
                {
                    name: newAmbulanceName,
                    latitude: newAmbulanceLatitude,
                    longitude: newAmbulanceLongitude,
                }
            );
            console.log(response);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const affectAmbulance = async (selectedHospitalId,selectedAmbulanceId) => {
        try {
            if (selectedAmbulanceId && selectedHospitalId) {
                // Call your API to affect ambulance to hospital
                const response = await axios.put(
                    `http://localhost:5000/Ambulance/assignToHospital/${selectedAmbulanceId}/${selectedHospitalId}`
                );
             
                // Show success alert
                setAlertMessage("Ambulance affected to hospital");
                setAlertVariant("success");
                setShowAlert(true);
            } else {
                setAlertMessage("Please select an ambulance and a hospital");
                setAlertVariant("danger");
                setShowAlert(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
          {/* Add ambulance form */}
          <h2>Add Ambulance</h2>
          <form onSubmit={handleAddAmbulance}>
            {/* Existing form inputs */}
            <input
              type="text"
              placeholder="Ambulance Name"
              value={newAmbulanceName}
              onChange={(e) => setNewAmbulanceName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Latitude"
              value={newAmbulanceLatitude}
              onChange={(e) => setNewAmbulanceLatitude(e.target.value)}
            />
            <input
              type="number"
              placeholder="Longitude"
              value={newAmbulanceLongitude}
              onChange={(e) => setNewAmbulanceLongitude(e.target.value)}
            />
            <button type="submit">Add Ambulance</button>
          </form>
      
         
      
          {/* Ambulance list */}
          <h2>Ambulance List</h2>
          <ul>
            {ambulances.map((ambulance) => (
              <li key={ambulance._id}>
                {ambulance._id} - Name: {ambulance.name} - Latitude: {ambulance.latitude} - Longitude:{ambulance.longitude}
                {ambulance.longitude}
                <select
            value={selectedHospitalId}
            onChange={(e) => setSelectedHospitalId(e.target.value)}
          >
            <option value="">Select Hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital._id} value={hospital._id}>
                {hospital.name}
              </option>
            ))}
          </select>
          <button onClick={() => affectAmbulance(ambulance._id,selectedHospitalId)}>
            Affect
          </button>
          {/* Console log ambulanceId and hospitalId */}
          {console.log("Ambulance Id:", ambulance._id, "Hospital Id:", selectedHospitalId)}
        </li>
      ))}
       {/* Alert */}
       {showAlert && (
            <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
              {alertMessage}
            </Alert>
          )}
    </ul>
  </div>
);
              }          
export default AmbulanceServiceA;