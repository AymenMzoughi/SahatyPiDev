import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

const MedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get('http://localhost:5000/MedicalRecord/showMedRec');
        setMedicalRecords(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedicalRecords();
  }, []);

  const handleImageClick = (imageUrl) => {
    console.log("imageUrl", imageUrl)
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div>
      {medicalRecords.map(record => (
        <div key={record._id}>
          <h3>{record.patientName}</h3>
          <ul className="list-unstyled">
            {record.medicalImages.map(image => (
              <li key={image._id} onClick={() => handleImageClick(`http://localhost:5000/${image.imageName}`)}>
                <h6>{image.imageName}</h6>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Image Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImage} alt="Preview" className="img-fluid" />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MedicalRecords;
