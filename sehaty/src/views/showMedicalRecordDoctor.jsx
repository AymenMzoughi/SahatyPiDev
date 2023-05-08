
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Container, Row, Col, Card, OverlayTrigger, Popover, Image, Tabs, Tab } from 'react-bootstrap';
import { FaTrashAlt } from "react-icons/fa";
import image from "../assets/bannerRec.jpg";
import imgMedi from "../assets/medicaments.png"
import imgTrea from "../assets/treatements.png"
import imgAllergy from "../assets/allergy.png"
import imgPrescrip from "../assets/prescription.png"

const MedicalRecordsD = () => {
    const [medicalRecord, setMedicalRecord] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isPDF, setIsPDF] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState(null);
    const [selectedTreatement, setSelectedTreatement] = useState(null);
    const [selectedAllergies, setSelectedAllergies] = useState(null);
    const [selectedPrescriptions, setSelectedPrescriptions] = useState(null);
    const [allergyAlertMessage, setAllergyMessage] = useState('');
    const [allergyAlertType, setAllergyAlertType] = useState('');
    const [prescriptionAlertMessage, setPrescriptionAlertMessage] = useState('');
    const [prescriptionAlertType, setPrescriptionAlertType] = useState('');
    const [treatmentAlertMessage, setTreatmentAlertMessage] = useState('');
    const [treatmentAlertType, setTreatmentAlertType] = useState('');
    const [imageAlertMessage, setImageAlertMessage] = useState('');
    const [imageAlertType, setImageAlertType] = useState('');
    const [medicationAlertMessage, setMedicationAlertMessage] = useState('');
    const [medicationAlertType, setMedicationAlertType] = useState('');


    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;
    console.log("test", userId)
    // const handlePatientIdChange = (event) => {
    //     setPatientId(event.target.value);
    // };
    const path = window.location.pathname;
    const parts = path.split("/");
    const patientId = parts[parts.length - 1]
    console.log(patientId)

    const handleDeleteAllergy = async (allergyId) => {
        try {
            const doctorId = userId
            const response = await axios.delete(`http://localhost:5000/MedicalRecord/deleteAlergyRec/${allergyId}/${doctorId}`);

            setAllergyMessage(response.data.message);
            setAllergyAlertType('success'); // Set alert type to success

        } catch (error) {
            setAllergyMessage(error.response.data.message);
            setAllergyAlertType('error'); // Set alert type to error
        }

        setTimeout(() => {
            setAllergyMessage('');
            setAllergyAlertType('');
        }, 3000); // 3000 milliseconds = 3 seconds
    };


    const handleDeleteTreatement = async (treatementId) => {
        try {
            const doctorId = userId
            const response = await axios.delete(`http://localhost:5000/MedicalRecord/deleteTreatmentRec/${treatementId}/${doctorId}`);

            setTreatmentAlertMessage(response.data.message);
            setTreatmentAlertType('success'); // Set alert type to success

        } catch (error) {
            setTreatmentAlertMessage(error.response.data.message);
            setTreatmentAlertType('error'); // Set alert type to error
        }

        setTimeout(() => {
            setTreatmentAlertMessage('');
            setTreatmentAlertType('');
        }, 3000); // 3000 milliseconds = 3 seconds
    };

    const handleDeleteImage = async (medicalImageId) => {
        try {
            const doctorId = userId
            const response = await axios.delete(`http://localhost:5000/MedicalRecord/deleteImgRec/${medicalImageId}/${doctorId}`);

            setImageAlertMessage(response.data.message);
            setImageAlertType('success'); // Set alert type to success

        } catch (error) {
            setImageAlertMessage(error.response.data.message);
            setImageAlertType('error'); // Set alert type to error
        }

        setTimeout(() => {
            setImageAlertMessage('');
            setImageAlertType('');
        }, 3000); // 3000 milliseconds = 3 seconds
    };

    const handleDeleteMedication = async (medicationId) => {
        try {
            const doctorId = userId
            const response = await axios.delete(`http://localhost:5000/MedicalRecord/deleteMedicationRec/${medicationId}/${doctorId}`);

            setMedicationAlertMessage(response.data.message);
            setMedicationAlertType('success'); // Set alert type to success

        } catch (error) {
            setMedicationAlertMessage(error.response.data.message);
            setMedicationAlertType('error'); // Set alert type to error
        }

        setTimeout(() => {
            setMedicationAlertMessage('');
            setMedicationAlertType('');
        }, 3000); // 3000 milliseconds = 3 seconds
    };

    const handleDeletePrescription = async (prescriptionId) => {
        try {
            const doctorId = userId
            const response = await axios.delete(`http://localhost:5000/MedicalRecord/deletePrescriptionRec/${prescriptionId}/${doctorId}`);

            setPrescriptionAlertMessage(response.data.message);
            setPrescriptionAlertType('success'); // Set alert type to success

        } catch (error) {
            setPrescriptionAlertMessage(error.response.data.message);
            setPrescriptionAlertType('error'); // Set alert type to error
        }

        setTimeout(() => {
            setPrescriptionAlertMessage('');
            setPrescriptionAlertType('');
        }, 3000); // 3000 milliseconds = 3 seconds
    };





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
        const fetchMedicalRecord = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/MedicalRecord/myMedicalRec/${patientId}`);
                const fetchedMedicalRecord = response.data;
                setMedicalRecord(fetchedMedicalRecord);
            } catch (error) {
                console.error('Error fetching medical record:', error);
            }
        };

        fetchMedicalRecord();
    }, [patientId]);

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

    return (
        <>
            {/* <label htmlFor="patientId">Medical Record ID:</label>
            <input type="text" id="patientId" name="patientId" value={patientId} onChange={handlePatientIdChange} />
            <Button variant="primary" onClick={handleClick}>Search</Button> */}
            {medicalRecord ? (
                <div>
    
                    <Container style={{ margin: '50px' }} className="mx-auto ">
                        
                    <figure className="text-center">
                        <blockquote className="blockquote">
                       <p>This is the medical record of your patient</p>
                        </blockquote>
                       
                    </figure>
                        <Row md={10}>
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
                                                            <FaTrashAlt onClick={() => handleDeleteImage(medicalImage._id)}></FaTrashAlt>
                                                        </p>
                                                    </div>
                                                ))}
                                                {/* Show alert based on alert type */}
                                                {imageAlertType === 'success' && (
                                                    <div className="alert alert-success" role="alert">
                                                        {imageAlertMessage}
                                                    </div>
                                                )}
                                                {imageAlertType === 'error' && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {imageAlertMessage}
                                                    </div>
                                                )}
                                            </Tab>
                                            <Tab eventKey="medical-letter" title="Medical Letter">
                                                {medicalRecord.medicalImages.filter(image => image.imageType === 'medical letter').map((medicalImage) => (
                                                    <div key={medicalImage._id}>
                                                        <p>
                                                            Image Type: {medicalImage.imageType} |
                                                            <li href="#" onClick={() => handleImageClick(`http://localhost:5000/${medicalImage.imageName}`)}>
                                                                Image Name: {medicalImage.imageName}
                                                            </li>
                                                            <FaTrashAlt onClick={() => handleDeleteImage(medicalImage._id)}></FaTrashAlt>
                                                        </p>
                                                    </div>
                                                ))}
                                                {/* Show alert based on alert type */}
                                                {imageAlertType === 'success' && (
                                                    <div className="alert alert-success" role="alert">
                                                        {imageAlertMessage}
                                                    </div>
                                                )}
                                                {imageAlertType === 'error' && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {imageAlertMessage}
                                                    </div>
                                                )}
                                            </Tab>
                                            <Tab eventKey="MRI" title="MRI">
                                                {medicalRecord.medicalImages.filter(image => image.imageType === 'MRI').map((medicalImage) => (
                                                    <div key={medicalImage._id}>
                                                        <li href="#" onClick={() => handleImageClick(`http://localhost:5000/${medicalImage.imageName}`)}>
                                                            Image Name: {medicalImage.imageName}
                                                        </li>
                                                        <FaTrashAlt onClick={() => handleDeleteImage(medicalImage._id)}></FaTrashAlt>
                                                    </div>
                                                ))}
                                                {/* Show alert based on alert type */}
                                                {imageAlertType === 'success' && (
                                                    <div className="alert alert-success" role="alert">
                                                        {imageAlertMessage}
                                                    </div>
                                                )}
                                                {imageAlertType === 'error' && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {imageAlertMessage}
                                                    </div>
                                                )}
                                            </Tab>
                                            <Tab eventKey="CT scan" title="CT scan">
                                                {medicalRecord.medicalImages.filter(image => image.imageType === 'CT scan').map((medicalImage) => (
                                                    <div key={medicalImage._id}>
                                                        <p>
                                                            Image Type: {medicalImage.imageType} |
                                                            <li href="#" onClick={() => handleImageClick(`http://localhost:5000/${medicalImage.imageName}`)}>
                                                                Image Name: {medicalImage.imageName}
                                                            </li>
                                                            <FaTrashAlt onClick={() => handleDeleteImage(medicalImage._id)}></FaTrashAlt>
                                                        </p>
                                                    </div>
                                                ))}
                                                {/* Show alert based on alert type */}
                                                {imageAlertType === 'success' && (
                                                    <div className="alert alert-success" role="alert">
                                                        {imageAlertMessage}
                                                    </div>
                                                )}
                                                {imageAlertType === 'error' && (
                                                    <div className="alert alert-danger" role="alert">
                                                        {imageAlertMessage}
                                                    </div>
                                                )}
                                            </Tab>

                                        </Tabs>
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
                                                        <FaTrashAlt onClick={() => handleDeletePrescription(prescription._id)}></FaTrashAlt>
                                                    </Card.Text>
                                                </OverlayTrigger>

                                            </div>
                                        ))}

                                        {/* Show alert based on alert type */}
                                        {prescriptionAlertType === 'success' && (
                                            <div className="alert alert-success" role="alert">
                                                {prescriptionAlertMessage}
                                            </div>
                                        )}
                                        {prescriptionAlertType === 'error' && (
                                            <div className="alert alert-danger" role="alert">
                                                {prescriptionAlertMessage}
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                            {/* Treatement */}
                            <Col>
                                <Card bg="info" key="info" text='dark' style={{ width: '10rem' }} className="mb-2">
                                    <Card.Header><strong>Treatement</strong></Card.Header>
                                    <Card.Body>
                                        {medicalRecord.treatments.map((treatment) => (
                                            <div key={treatment._id}>
                                                <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverTreatement} rootClose >
                                                    <Card.Text>
                                                        <Image src={imgTrea} height={20} width={20} onMouseOver={() => handleTitleClickT(treatment)} /> {treatment.name}
                                                        <FaTrashAlt onClick={() => handleDeleteTreatement(treatment._id)}></FaTrashAlt>
                                                    </Card.Text>
                                                </OverlayTrigger>

                                            </div>
                                        ))}
                                        {/* Show alert based on alert type */}
                                        {treatmentAlertType === 'success' && (
                                            <div className="alert alert-success" role="alert">
                                                {treatmentAlertMessage}
                                            </div>
                                        )}
                                        {treatmentAlertType === 'error' && (
                                            <div className="alert alert-danger" role="alert">
                                                {treatmentAlertMessage}
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Medication */}

                            <Col xs>
                                <Card bg="light" key="info" text='dark' style={{ width: '10rem' }} className="mb-2" >
                                    <Card.Header><strong>Medications</strong></Card.Header>
                                    <Card.Body>
                                        {medicalRecord?.medications?.map((medication) => (
                                            <div key={medication._id}>
                                                <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverMedication}>
                                                    <Card.Text >
                                                        <Image src={imgMedi} height={20} width={20} onMouseOver={() => handleTitleClickM(medication)} /> {medication.name}
                                                        <FaTrashAlt onClick={() => handleDeleteMedication(medication._id)}></FaTrashAlt>
                                                    </Card.Text>
                                                </OverlayTrigger>


                                            </div>

                                        ))}
                                        {/* Show alert based on alert type */}
                                        {medicationAlertType === 'success' && (
                                            <div className="alert alert-success" role="alert">
                                                {medicationAlertMessage}
                                            </div>
                                        )}
                                        {medicationAlertType === 'error' && (
                                            <div className="alert alert-danger" role="alert">
                                                {medicationAlertMessage}
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>

                            {/* Allergies */}
                            <Col>
                                <Card bg="info" key="info" text='dark' style={{ width: '10rem' }} className="mb-2">
                                    <Card.Header><strong>Allergies</strong></Card.Header>
                                    <Card.Body>
                                        {medicalRecord.allergies.map((allergy) => (
                                            <div key={allergy._id}>
                                                <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverAllergies} rootClose >
                                                    <Card.Text>
                                                        <Image src={imgAllergy} height={20} width={20} onMouseOver={() => handleTitleClickA(allergy)} /> {allergy.name}
                                                        <FaTrashAlt onClick={() => handleDeleteAllergy(allergy._id)}></FaTrashAlt>
                                                    </Card.Text>
                                                </OverlayTrigger>

                                            </div>
                                        ))}
                                        {/* Show alert based on alert type */}
                                        {allergyAlertType === 'success' && (
                                            <div className="alert alert-success" role="alert">
                                                {allergyAlertMessage}
                                            </div>
                                        )}
                                        {allergyAlertType === 'error' && (
                                            <div className="alert alert-danger" role="alert">
                                                {allergyAlertMessage}
                                            </div>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>


                        </Row>
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
export default MedicalRecordsD;
