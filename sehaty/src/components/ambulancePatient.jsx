import React, { useState, useEffect } from "react";
import { Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Alert from 'react-bootstrap/Alert';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ambulanceIcon from "../assets/ambulance-icon.png";
import ambulanceIcon2 from "../assets/unavailable.png";
import ped from "../assets/ped.png";
import pip from "../assets/pip.png"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './ambulance.css'
import { Card } from "react-bootstrap";


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

const pedicon = L.icon({
    iconUrl: ped,
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
    const [showMarker, setShowMarker] = useState(false);
    const [userPos, setUserPos] = useState([]);
    const [userId, setUserId] = useState("6410e2b6672845f92a8ecc2c");

    const [ambulanceId, setAmbulanceId] = useState("");
    const [position, setPosition] = useState("");

    useEffect(() => {
        getAmbulances();

    }, []);


    const getUserPosition = async (ambulanceId) => {
        try {
            const res = await axios.get(`http://localhost:5000/Ambulance/userpos/${ambulanceId}`);
            //   setPosition(res.data.position);
            console.log(res)
        } catch (error) {
            console.error(error);
            alert("Position not found");
        }
    };

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
            if ("geolocation" in navigator) {
                // Check if geolocation is supported in the browser
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserPos([latitude, longitude]);
                        setShowMarker(true);
                        setAmbulanceId(ambulanceId);
                        localStorage.setItem("latitudeUser", latitude)
                        localStorage.setItem("longtitudeUser", longitude)
                        console.log(position.coords)
                        const response = await axios.post(
                            ` http://localhost:5000/Ambulance/reserve/${userId}/${ambulanceId}`,
                            { latitude, longitude }  // Send user's position in the request
                        );

                        setAmbulances(
                            ambulances.map((ambulance) => {
                                if (ambulance._id === response.data.ambulance._id) {
                                    return response.data.ambulance;
                                }
                                return ambulance;
                            })
                        );

                        console.log(position)

                        console.log(ambulanceId)
                        window.location.reload();
                    },
                    (error) => {
                        // Handle geolocation error here
                        console.error(error);
                        setAlertVariant("danger");
                        setAlertMessage("Error: Position sharing is not allowed. Please allow position sharing to reserve an ambulance.");
                        setShowAlert(true);
                    }
                );
            } else {
                // Handle geolocation not supported case here
                setAlertVariant("danger");
                setAlertMessage("Error: Position sharing is not supported in your browser. Please use a different browser to reserve an ambulance.");
                setShowAlert(true);
            }
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
            setShowMarker(false);
            window.location.reload();


        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <div className="img-fluid">
                <img src={pip} alt="description de l'image"

                />
                <div className="overlay">
                    <h2>Ambulance Service</h2>
                </div>
            </div>

            <Container>
                <Row>
                    <Col>
                        <Card style={{ marginLeft: '110px', marginTop: '50px'}}>
                            <Card.Body>
                                <div className="av" >
                                    <h3>Available Ambulances:</h3>
                                </div>

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Reserve ?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ambulances.map((ambulance) => {
                                            if (ambulance.available) {
                                                return (
                                                    <tr key={ambulance._id}>
                                                        <td>  {ambulance.name}</td>

                                                        <td>
                                                            <Button className="btn primary" onClick={() => reserve(ambulance._id)}>
                                                                Yes
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                            return null;
                                        })}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
<Col>
                    <Card  style={{ marginLeft: '110px', marginTop: '50px'}}>
                        <Card.Body>
                            <div className="nav" >
                                <h3>Non-Available Ambulances:</h3>
                            </div>

                            <Table striped bordered hover >
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Unreserve ?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ambulances.map((ambulance) => {
                                        if (!ambulance.available) {
                                            return (
                                                <>

                                                    <tr key={ambulance._id}>
                                                        <td>   {ambulance.name}</td>
                                                        <td>   <Button className="btn primary" onClick={() => unreserve(ambulance._id)}>
                                                            Yes
                                                        </Button>
                                                        </td>
                                                    </tr>

                                                </>
                                            );

                                        }
                                        return null;

                                    })}


                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>

            <Button className="btn primary mx-auto d-block" style={{marginTop: '50px', marginBottom:'50px'}} variant="primary" onClick={() => { setShowMapModal(true); }} >Open Map</Button>


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




            <Modal show={showMapModal} onHide={() => setShowMapModal(false)} className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Map</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="map-container-wrapper">
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
                                                <button className="btn btn-primary" onClick={() => reserve(ambulance._id)}>Reserve</button>
                                            ) : (
                                                <button className="btn btn-secondary" onClick={() => unreserve(ambulance._id)}>Unreserve</button>
                                            )}
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                            {showMarker && (
                                <Marker key={userPos} position={userPos} icon={pedicon}>
                                    <Popup>
                                        Your location
                                    </Popup>
                                </Marker>
                            )}
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