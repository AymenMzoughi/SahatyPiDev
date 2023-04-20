import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Alert from 'react-bootstrap/Alert';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ambulanceIcon from "./ambulance-icon.png";
import ambulanceIcon2 from "./unavailable.png";
const available = L.icon({
    iconUrl: ambulanceIcon,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});

const unavailable = L.icon({
    iconUrl: ambulanceIcon2,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});

const AmbulanceService = () => {
    const [ambulances, setAmbulances] = useState([]);
    const [newAmbulanceName, setNewAmbulanceName] = useState("");
    const [newAmbulanceLatitude, setNewAmbulanceLatitude] = useState(0);
    const [newAmbulanceLongitude, setNewAmbulanceLongitude] = useState(0);
    const [clientId, setClientId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("danger");
    
    useEffect(() => {
        getAmbulances();
    }, []);

    const getAmbulances = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Ambulance");
            setAmbulances(response.data.ambulances);
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

    const reserve = async (ambulanceId) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/Ambulance/reserve/${clientId}/${ambulanceId}`
            );
            setAmbulances(
                ambulances.map((ambulance) => {
                    if (ambulance._id === response.data.ambulance._id) {
                        return response.data.ambulance;
                    }
                    return ambulance;
                })
            );
        } catch (error) {
            console.error(error);
        }
    };

    const unreserve = async (ambulanceId) => {
 
        
        try {
            const ambulance = ambulances.find(
                (ambulance) => ambulance._id === ambulanceId
            );
            
            if (ambulance) {
                if (ambulance.reservedBy && ambulance.createdAt) {
                    const elapsed = Math.floor(
                        (new Date() - new Date(ambulance.createdAt)) / 1000
                    );
                    console.log(elapsed)
                    if (elapsed < 10) {
                        const response = await axios.post(
                            `http://localhost:5000/Ambulance/unreserve/${ambulanceId}`
                        );
                        setAmbulances(
                            ambulances.map((amb) => {
                                if (amb._id === response.data.ambulance._id) {
                                    return {
                                        ...response.data.ambulance,
                                        reservedBy: null,
                                        createdAt: null,
                                        available: true,
                                    };
                                } else {
                                    return amb;
                                }
                            })
                        );
                        setAlertMessage("Ambulance unreserved");
                        setAlertVariant("success");
                        setShowAlert(true);
                    } else {
                        setAlertMessage("This ambulance is reserved more than 10 seconds from now, unreserving is not possible. Ambulance is on its way to you.");
                        setShowAlert(true);
                    }
                } else {
                    setAlertMessage("This ambulance is not reserved");
                    setShowAlert(true);
                }
            } else {
                setAlertMessage("Ambulance not found");
                setShowAlert(true);
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    const availableAmbulances = ambulances.filter(
        (ambulance) => ambulance.available
    );

    return (
        <div>
            <h2>Ambulance Service</h2>
            <h3>Available Ambulances:</h3>
            <ul>
                {ambulances.map((ambulance) => {
                    if (ambulance.available) {
                        return (
                            <li key={ambulance._id}>
                                {ambulance.name} - Available:{" "}
                                {ambulance.available.toString()}
                                <button onClick={() => reserve(ambulance._id)}>
                                    Reserve
                                </button>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
            <h3>Non-Available Ambulances:</h3>
      <ul>
        {ambulances.map((ambulance) => {
          if (!ambulance.available) {
            return (
              <li key={ambulance._id}>
                {ambulance.name} - Available:{" "}
                {ambulance.available.toString()}
                <button onClick={() => unreserve(ambulance._id)}>
                  Unreserve
                </button>
              </li>
            );
          }
          return null;
        })}
      </ul>
      {showAlert && (
        <Alert
          variant={alertVariant}
          onClose={() => {
            setAlertVariant("danger");
            setShowAlert(false);
          }}
          dismissible
        >
          {alertMessage}
        </Alert>
      )}
            <div>
                <h3>Add Ambulance</h3>
                <form onSubmit={handleAddAmbulance}>
                    <label htmlFor="new-ambulance-name">Name:</label>
                    <input
                        id="new-ambulance-name"
                        type="text"
                        value={newAmbulanceName}
                        onChange={(event) =>
                            setNewAmbulanceName(event.target.value)
                        }
                    />
                    <label htmlFor="new-ambulance-latitude">Latitude:</label>
                    <input
                        id="new-ambulance-latitude"
                        type="number"
                        step="0.000001"
                        value={newAmbulanceLatitude}
                        onChange={(event) =>
                            setNewAmbulanceLatitude(
                                parseFloat(event.target.value)
                            )
                        }
                    />
                    <label htmlFor="new-ambulance-longitude">Longitude:</label>
                    <input
                        id="new-ambulance-longitude"
                        type="number"
                        step="0.000001"
                        value={newAmbulanceLongitude}
                        onChange={(event) =>
                            setNewAmbulanceLongitude(
                                parseFloat(event.target.value)
                            )
                        }
                    />
                    <button type="submit">Add Ambulance</button>
                </form>
            </div>

            <h3>Reserve Ambulance</h3>
            <label htmlFor="clientId">Client Id:</label>
            <input
                type="text"
                id="clientId"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
            />

            <h3>Map of Available Ambulances:</h3>
            <div style={{ height: "500px", width: "100%" }}>
            <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px" }}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {ambulances.map((ambulance) => (
    <Marker
      key={ambulance._id}
      position={[ambulance.latitude, ambulance.longitude]}
      icon={
        ambulance.available ? (
            available
        ) : (
          unavailable
        )
      }
    >
      <Popup>
        <div>
          <h4>{ambulance.name}</h4>
          <p>Latitude: {ambulance.latitude}</p>
          <p>Longitude: {ambulance.longitude}</p>
          <button onClick={() => reserve(ambulance._id)}>Reserve</button>
          <button onClick={() => unreserve(ambulance._id)}>Unreserve</button>
        </div>
      </Popup>
    </Marker>
  ))}
</MapContainer>
            </div>
        </div>
    );
};

export default AmbulanceService;
