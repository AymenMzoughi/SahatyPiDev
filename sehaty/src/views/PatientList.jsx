import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Container, Row, Col, Card, OverlayTrigger, Popover, Image, Tabs, Tab } from 'react-bootstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCol,
    MDBRow,
    MDBCardSubTitle,
    MDBCardTitle,
    MDBCardText,
    MDBCardGroup,
    MDBCardLink,
    MDBBtn
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

const PatientListDocteur = () => {
    const [patientList, setPatientList] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id;
        console.log("test", userId);

        const fetchPatientList = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/MedicalRecord/patientList/${userId}`
                );
                const fetchedPatientList = response.data;
                setPatientList(fetchedPatientList);
            } catch (error) {
                console.error("Error fetching medical record:", error);
            }
        };

        fetchPatientList();
    }, []); // remove patientList from the dependency array

    return (
        <>
            {patientList ? (
                <div>
                    {patientList?.map((list) => (

                        <MDBCard style={{ marginLeft: '80px', marginTop: '50px', width: '25rem' }} >
                            <MDBCardBody key={list.patientId}>
                                <MDBCardTitle>Patient Name: {list.firstname} {list.lastname}</MDBCardTitle>
                                <MDBCardText>Medical Record N°: {list.medicalRecordId}</MDBCardText>
                                <MDBCardText>Created At: {list.createdAt}</MDBCardText>
                                <MDBCardText>Updated At: {list.updatedAt}</MDBCardText>
                                <MDBCol>
                                <MDBBtn href={`/medicalRecordDocteur/${list.patientId}`}>Medical Record Details</MDBBtn>
                                <MDBBtn href={`/addMedicalRecord/${list.patientId}`}>Update Medical Record</MDBBtn>
                                </MDBCol>   
                            </MDBCardBody>
                        </MDBCard>
                    ))}
                </div>
            ) : (
                <div>
                    <h1>Sorry, but you don't have any patients at the moment</h1>
                </div>
            )}
        </>
    );
};

export default PatientListDocteur;
