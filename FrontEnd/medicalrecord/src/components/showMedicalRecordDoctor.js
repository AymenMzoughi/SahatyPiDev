
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

const MedicalRecordsD = () => {
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPDF, setIsPDF] = useState(false);
  const [allergyAlertMessage, setAllergyMessage] = useState('');
  const [allergyAlertType, setAllergyAlertType] = useState('');
  const [treatmentAlertMessage,  setTreatmentAlertMessage] = useState('');
  const [treatmentAlertType, setTreatmentAlertType] = useState('');
  const [imageAlertMessage,  setImageAlertMessage] = useState('');
  const [imageAlertType, setImageAlertType] = useState('');
  const [medicationAlertMessage,  setMedicationAlertMessage] = useState('');
  const [medicationAlertType, setMedicationAlertType] = useState('');


  const handleDeleteAllergy = async (allergyId) => {
    try {
     const doctorId="641088068b3ddbc8790c0abf"
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
     const doctorId="641088068b3ddbc8790c0abF"
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
     const doctorId="641088068b3ddbc8790c0abf"
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
     const doctorId="641088068b3ddbc8790c0abc"
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

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        const patientId = "6410e2b6672845f92a8ecc2c"; // Specify the patientId
        const response = await axios.get(`http://localhost:5000/MedicalRecord/myMedicalRec/${patientId}`);
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
    <div>
      {medicalRecord ? (
        // Render medical record data
        <div>
          <h1>Medical Record</h1>
          {/* Render medical record details */}
          <h2>Medications:</h2>
          {medicalRecord.medications.map((medication) => (
            <div key={medication._id}>
              <li>Name: {medication.name} | Dosage: {medication.dosage} |  Frequency: {medication.frequency} 
              <button onClick={() => handleDeleteMedication(medication._id)}>Delete</button></li>
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

          {/* Render treatment details */}
          <h2>Treatments:</h2>
          {medicalRecord.treatments.map((treatment) => (
            <div key={treatment._id}>
              <li>Name: {treatment.name} |  Description: {treatment.description} | Start Date: {treatment.startDate} | End Date: {treatment.endDate}</li>
              <button onClick={() => handleDeleteTreatement(treatment._id)}>Delete</button>
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


          {/* Render allergy details */}
          <h2>Allergies:</h2>
      {medicalRecord.allergies.map((allergy) => (
        <div key={allergy._id}>
          <li> Name: {allergy.name} | Severity: {allergy.severity} | Reaction: {allergy.reaction}</li>
          <button onClick={() => handleDeleteAllergy(allergy._id)}>Delete</button>
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
          {/* Render medical image details */}
          <h2>Medical Images:</h2>
{/* Filter and render X-ray images */}
<div>
  <h6>X-ray:</h6>
  {medicalRecord.medicalImages.filter(image => image.imageType === 'x-ray').map((medicalImage) => (
    <div key={medicalImage._id}>
      <p>
        Image Type: {medicalImage.imageType} |
        <li href="#" onClick={() => handleImageClick(`http://localhost:5000/${medicalImage.imageName}`)}>
          Image Name: {medicalImage.imageName}
        </li>
        
        <button onClick={() => handleDeleteImage(medicalImage._id)}>Delete</button>
      </p>
    </div>
  ))}
</div>

{/* Filter and render Medical Letter images */}
<div>
  <h6>Medical Letter:</h6>
  {medicalRecord.medicalImages.filter(image => image.imageType === 'medical letter').map((medicalImage) => (
    <div key={medicalImage._id}>
      <p>
        Image Type: {medicalImage.imageType} |
        <li href="#" onClick={() => handleImageClick(`http://localhost:5000/${medicalImage.imageName}`)}>
          Image Name: {medicalImage.imageName}
        </li>
        <button onClick={() => handleDeleteImage(medicalImage._id)}>Delete</button>
      </p>
    </div>
  ))}
</div>

{/* Filter and render Prescription images */}
<div>
  <h6>Prescription:</h6>
  {medicalRecord.medicalImages.filter(image => image.imageType === 'prescription').map((medicalImage) => (
    <div key={medicalImage._id}>
        <li href="#" onClick={() => handleImageClick(`http://localhost:5000/${medicalImage.imageName}`)}>
          Image Name: {medicalImage.imageName}
        </li>
        <button onClick={() => handleDeleteImage(medicalImage._id)}>Delete</button>
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
</div>
          
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
    </div>
  );
          }
export default MedicalRecordsD;
