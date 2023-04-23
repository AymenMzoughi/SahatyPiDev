
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';


const MedicalRecords = () => {
  const [medicalRecord, setMedicalRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPDF, setIsPDF] = useState(false);

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
              <li>Name: {medication.name} | Dosage: {medication.dosage} |  Frequency: {medication.frequency}</li>
            </div>
          ))}
          {/* Render treatment details */}
          <h2>Treatments:</h2>
          {medicalRecord.treatments.map((treatment) => (
            <div key={treatment._id}>
              <li>Name: {treatment.name} |  Description: {treatment.description} | Start Date: {treatment.startDate} | End Date: {treatment.endDate}</li>
            </div>
          ))}
          {/* Render allergy details */}
          <h2>Allergies:</h2>
          {medicalRecord.allergies.map((allergy) => (
            <div key={allergy._id}>
              <li> Name: {allergy.name} | Severity: {allergy.severity} | Reaction: {allergy.reaction}</li>
            </div>
          ))}
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
    </div>
  ))}
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
export default MedicalRecords;
