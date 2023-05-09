
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Container, Row, Col, Card, OverlayTrigger, Popover, Image, Tabs, Tab } from 'react-bootstrap';

import image from "../assets/bannerRec.jpg";
import imgMedi from "../assets/medicaments.png"
import imgTrea from "../assets/treatements.png"
import imgAllergy from "../assets/allergy.png"
import imgPrescrip from "../assets/prescription.png"

const MedicalRecords = () => {
    const [medicalRecord, setMedicalRecord] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isPDF, setIsPDF] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [selectedTreatement, setSelectedTreatement] = useState(null);
    const [selectedAllergies, setSelectedAllergies] = useState(null);
    const [selectedPrescriptions, setSelectedPrescriptions] = useState(null);

    const handleTitleClickM = (medication, treatment) => {
        setSelectedMedication(medication);

    };

    const handleTitleClickT = (treatment) => {
        setSelectedTreatement(treatment);

    };
    const handleTitleClickA = (allergy) => {
        setSelectedAllergies(allergy);

    };

    const handleTitleClickP = (prescription) => {
        setSelectedPrescriptions(prescription);

    };

    const popoverMedication = (
        <Popover id="popover-right" title="Medication Details">
            {selectedMedication && (
                <div>
                    <p>
                        <strong>Name:</strong> {selectedMedication.name}
                    </p>
                    <p>
                        <strong>Dosage:</strong> {selectedMedication.dosage}
                    </p>
                    <p>
                        <strong>Frequency:</strong> {selectedMedication.frequency}
                    </p>
                    <p>
                        added by Dr.{medicalRecord.doctorNameMedic}
                    </p>
                </div>
            )}
        </Popover>
    );

    const popoverTreatement = (
        <Popover id="popover-right" title="Medication Details">
            {selectedTreatement && (
                <div>
                    <p>
                        <strong>Name:</strong> {selectedTreatement.name}
                    </p>
                    <p>
                        <strong>Description:</strong> {selectedTreatement.description}
                    </p>
                    <p>
                        <strong>Start Date:</strong> {selectedTreatement.startDate}
                    </p>
                    <p>
                        <strong>End Date:</strong> {selectedTreatement.endDate}
                    </p>
                    <p>
                        added by Dr.{medicalRecord.doctorNameTreat}
                    </p>
                </div>
            )}
        </Popover>
    );

    const popoverAllergies = (
        <Popover id="popover-right" title="Medication Details">
            {selectedAllergies && (
                <div>
                    <p>
                        <strong>Name:</strong> {selectedAllergies.name}
                    </p>
                    <p>
                        <strong>Severity:</strong> {selectedAllergies.severity}
                    </p>
                    <p>
                        <strong>Reaction:</strong> {selectedAllergies.reaction}
                    </p>
                    <p>
                        added by Dr.{medicalRecord.doctorNameAller}
                    </p>
                </div>
            )}
        </Popover>
    );

    const popoverPrescriptions = (
        <Popover id="popover-right" title="Medication Details">
            {selectedPrescriptions && (
                <div>
                    <p>
                        <strong>Description:</strong> {selectedPrescriptions.description}
                    </p>
                    <p>
                        <strong>Periode:</strong> {selectedPrescriptions.periode}
                    </p>

                </div>
            )}
        </Popover>
    );

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id;
        console.log("test", userId)
        const fetchMedicalRecord = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/medicalRecord/myMedicalRec/${userId}`);
                const fetchedMedicalRecord = response.data;
                setMedicalRecord(fetchedMedicalRecord);
            } catch (error) {
                console.error('Error fetching medical record:', error);
            }
        };

        fetchMedicalRecord();
    }, []);

    const handleImageClick = (imageUrl) => {
        // Check if the file is a PDF based on file extension
        const isPDF = imageUrl.endsWith('.pdf');
        setSelectedImage(imageUrl);
        setIsPDF(isPDF);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
        setIsPDF(false);
        setShowModal(false);
    };

    const handleDownload = () => {
        // Create a temporary anchor tag to trigger file download
        const link = document.createElement('a');
        link.href = selectedImage;
        link.download = selectedImage.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!medicalRecord) {
        return <div>Loading...</div>;
    }

    return (
        <>

            {medicalRecord ? (

                <div>
                    <Container>
                        <Row>
                            <Col xs={12} lg={7}>
                                <div className="card text-white">
                                    <center>
                                        <img
                                            style={{
                                                width: "170%",
                                                height: "300px",

                                            }}
                                            src={image}
                                            alt=""
                                        />
                                    </center>
                                    {/* Medical Record Infos */}
                                    <left>
                                        <div className="card-img-overlay">
                                            <p className="card-title text-center">Bonjour Mr/Mme {medicalRecord.patientName}</p>
                                            <p className="card-text">This is your Medical Record</p>
                                            <p className="card-text">N° {medicalRecord.medicalRecordId}</p>
                                            <p className="card-text">Last update was {medicalRecord.updatedAt}</p>
                                        </div>
                                    </left>

                                </div>
                            </Col>
                        </Row>
                        <hr
                            style={{
                                background: 'light',
                                color: 'light',
                                borderColor: 'light',
                                height: '2px',
                            }}
                        />
                        {/* Medication */}
                        <Container>
                            <Row md={10}>
                            <Col xs>
                                    <Card bg="info" key="info" text='white' style={{ width: '10rem' }} className="mb-2" >
                                        <Card.Header><strong>Medications</strong></Card.Header>
                                        <Card.Body>
                                            {medicalRecord?.medications?.map((medication) => (
                                                <div key={medication._id}>
                                                    <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverMedication}>
                                                        <Card.Text >
                                                            <Image src={imgMedi} height={20} width={20} onMouseOver={() => handleTitleClickM(medication)} /> {medication.name}
                                                        </Card.Text>
                                                    </OverlayTrigger>

                                                </div>
                                            ))}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                {/* Prescription */}
                                <Col>
                                    <Card bg="light" key="Light" text='dark' style={{ width: '16rem' }} className="mb-2">
                                        <Card.Header><strong>Prescription</strong></Card.Header>
                                        <Card.Body>
                                            {medicalRecord.prescriptions.map((prescription) => (
                                                <div key={prescription._id}>
                                                    <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverPrescriptions} rootClose >
                                                        <Card.Text>
                                                            <Image src={imgPrescrip} height={20} width={20} onMouseOver={() => handleTitleClickP(prescription)} /> Add by Dr.{medicalRecord.doctorNamePres}
                                                        </Card.Text>
                                                    </OverlayTrigger>

                                                </div>
                                            ))}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                {/* Treatement */}
                                <Col>
                                    <Card bg="light" key="Light" text='dark' style={{ width: '10rem' }} className="mb-2">
                                        <Card.Header><strong>Treatement</strong></Card.Header>
                                        <Card.Body>
                                            {medicalRecord.treatments.map((treatment) => (
                                                <div key={treatment._id}>
                                                    <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverTreatement} rootClose >
                                                        <Card.Text>
                                                            <Image src={imgTrea} height={20} width={20} onMouseOver={() => handleTitleClickT(treatment)} /> {treatment.name}
                                                        </Card.Text>
                                                    </OverlayTrigger>

                                                </div>
                                            ))}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                {/* Allergies */}
                                <Col>
                                    <Card bg="info" key="info" text='white' style={{ width: '10rem' }} className="mb-2">
                                        <Card.Header><strong>Allergies</strong></Card.Header>
                                        <Card.Body>
                                            {medicalRecord.allergies.map((allergy) => (
                                                <div key={allergy._id}>
                                                    <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverAllergies} rootClose >
                                                        <Card.Text>
                                                            <Image src={imgAllergy} height={20} width={20} onMouseOver={() => handleTitleClickA(allergy)} /> {allergy.name}
                                                        </Card.Text>
                                                    </OverlayTrigger>

                                                </div>
                                            ))}
                                        </Card.Body>
                                    </Card>
                                </Col>
                                
                                {/* Images */}
                                <Col>
                                    <Card bg="info" key="info" text='dark' style={{ width: '25rem' }} className="mb-2">
                                        <Card.Header><strong>Medical Images</strong></Card.Header>
                                        <Card.Body>
                                            <Tabs defaultActiveKey="x-ray">
                                                <Tab eventKey="x-ray" title="X-ray">
                                                    {medicalRecord.medicalImages.filter(image => image.imageType === 'x-ray').map((medicalImage) => (
                                                        <div key={medicalImage._id}>
                                                            <p>
                                                                Image Type: {medicalImage.imageType}
                                                                <li href="#" onClick={() => handleImageClick(`http://localhost:5000/${medicalImage.imageName}`)}>
                                                                    Image Name: {medicalImage.imageName}
                                                                </li>
                                                            </p>
                                                        </div>
                                                    ))}
                                                </Tab>
                                                <Tab eventKey="medical-letter" title="Medical Letter">
                                                    {medicalRecord.medicalImages.filter(image => image.imageType === 'medical letter').map((medicalImage) => (
                                                        <div key={medicalImage._id}>
                                                            <p>
                                                                Image Type: {medicalImage.imageType} |
                                                                <li href="#" onClick={() => handleImageClick(`http://localhost:5000/${medicalImage.imageName}`)}>
                                                                    Image Name: {medicalImage.imageName}
                                                                </li>
                                                            </p>
                                                        </div>
                                                    ))}
                                                </Tab>
                                                <Tab eventKey="prescription" title="Prescription">
                                                    {medicalRecord.medicalImages.filter(image => image.imageType === 'prescription').map((medicalImage) => (
                                                        <div key={medicalImage._id}>
                                                            <li href="#" onClick={() => handleImageClick(`http://localhost:5000/${medicalImage.imageName}`)}>
                                                                Image Name: {medicalImage.imageName}
                                                            </li>
                                                        </div>
                                                    ))}
                                                </Tab>
                                            </Tabs>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Container>


                </div>
            ) : (
                // Render loading or error message
                <p>You don't have a medical record</p>)
            }
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isPDF ? 'PDF Preview' : 'Image Preview'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isPDF ? (
                        <embed src={selectedImage} type="application/pdf" width="100%" height="600px" />
                    ) : (
                        <img src={selectedImage} alt="Preview" className="img-fluid" />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseModal}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleDownload}>
                        Download
                    </button>
                </Modal.Footer>
            </Modal>
        </>

    );
}
export default MedicalRecords;
