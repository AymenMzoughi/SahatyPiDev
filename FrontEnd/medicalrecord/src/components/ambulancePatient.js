import React, { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Alert from 'react-bootstrap/Alert';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ambulanceIcon from "./ambulance-icon.png";
import ambulanceIcon2 from "./unavailable.png";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client'; // Import socket.io-client library

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

const AmbulanceServiceP = () => {
    const [ambulances, setAmbulances] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("danger");
    const [showMapModal, setShowMapModal] = useState(false);
    const [userId, setUserId] = useState("6410e2b6672845f92a8ecc2c");
    const [socket, setSocket] = useState(null); // State for socket
    useEffect(() => {
        getAmbulances();
        
    }, []);

  

    const getAmbulances = async () => {
        try {
            let response = null;
            // Fetch reserved ambulances for the given ID
            const reservedResponse = await axios.get(`http://localhost:5000/Ambulance/reserved/${userId}`);
            if (reservedResponse.data.ambulances && reservedResponse.data.ambulances.length > 0) {
                // If reserved ambulances are available, set them to state and return
                setAmbulances(reservedResponse.data.ambulances);
                return;
            }
            // Fetch all ambulances (available and not available)
            response = await axios.get("http://localhost:5000/Ambulance/");
            setAmbulances(response.data.ambulances);
        } catch (error) {
            console.error(error);
        }
    };
    


    const reserve = async (ambulanceId) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/Ambulance/reserve/${userId}/${ambulanceId}`
            );
            setAmbulances(
                ambulances.map((ambulance) => {
                    if (ambulance._id === response.data.ambulance._id) {
                        return response.data.ambulance;
                    }
                    return ambulance;
                })
            );
            window.location.reload();
    
        
    
        } catch (error) {
            console.error(error);
        }

    };
    
    const unreserve = async (ambulanceId) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/Ambulance/unreserve/${userId}/${ambulanceId}`
            );
            setAmbulances(
                ambulances.map((ambulance) => {
                    if (ambulance._id === response.data.ambulance._id) {
                        return response.data.ambulance;
                    }
                    return ambulance;
                })
            );
            window.location.reload();
            
        
        } catch (error) {
            console.error(error);
        }
    };
    
    const availableAmbulances = ambulances.filter(
        (ambulance) => ambulance.available && !ambulance.reservedBy
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
            <Button onClick={() => setShowMapModal(true)}>Open Map</Button>
            <Modal show={showMapModal} onHide={() => setShowMapModal(false)} className="custom-modal">
            <Modal.Header closeButton>
                <Modal.Title>Map</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="map-container-wrapper">
                {/* <MapContainer center={[33.7931605, 9.5607653]} zoom={8} style={{ height: "800px", width: "800px" }}>

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
                        {ambulance.available ? (
                        <button onClick={() => reserve(ambulance._id)}>Reserve</button>
                        ) : (
                        <button onClick={() => unreserve(ambulance._id)}>Unreserve</button>
                        )}
                        </div>
                    </Popup>
                    </Marker>
                ))}
                 </MapContainer> */}
                 <MapContainer center={[33.7931605, 9.5607653]} zoom={8} style={{ height: "800px", width: "800px" }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {ambulances.map((ambulance) => (
                        <Marker
                        key={ambulance._id}
                        position={[ambulance.latitude, ambulance.longitude]}
                        icon={ambulance.available ? available : unavailable}
                        >
                    <Popup>
                                            <div>
                                            <h4>{ambulance.name}</h4>
                                            <p>Latitude: {ambulance.latitude}</p>
                                            <p>Longitude: {ambulance.longitude}</p>
                                            {ambulance.available ? (
                                            <button onClick={() => reserve(ambulance._id)}>Reserve</button>
                                            ) : (
                                            <button onClick={() => unreserve(ambulance._id)}>Unreserve</button>
                                            )}
                                            </div>
                                        </Popup>
                        </Marker>
                    ))}
                    </MapContainer>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowMapModal(false)}>
                    Close
                    </Button>
                </Modal.Footer>
                </Modal>

                <style>
                {`
                    .custom-modal .modal-dialog {
                    max-width: 45%;
                    height: auto;
                    margin: 50;
                    }

                    .map-container-wrapper {
                    height: 100%;
                    width: 100%;
                    }
                `}
                </style>
        </div>
    )
                };
export default AmbulanceServiceP;
