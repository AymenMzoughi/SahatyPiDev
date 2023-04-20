import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Document, Page, pdfjs } from 'react-pdf';


const MedicalRecords = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pdfNumPages, setPdfNumPages] = useState(null);
  const [pdfPageNumber, setPdfPageNumber] = useState(1);

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
  
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);
  

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
    setPdfPageNumber(1);
  };


  const handleModalShow = (imageUrl) => {
    if (imageUrl.endsWith('.pdf')) {
      setSelectedImage(imageUrl);
      setShowModal(true);
    } else {
      setSelectedImage(imageUrl);
      setShowModal(true);
    }
  };


  

  const handlePdfLoadSuccess = ({ numPages }) => {
    setPdfNumPages(numPages);
  };

  const handlePdfPageChange = (pageNumber) => {
    setPdfPageNumber(pageNumber);
  };

  return (
    <div>
      {medicalRecords.map(record => (
        <div key={record._id}>
          <h3>{record.patientName}</h3>
          <ul className="list-unstyled">
            {record.medicalImages.map(image => (
              <li key={image._id} onClick={() => handleModalShow(`/uploads/${image.imageName}`)}>
                <h6>{image.imageName}</h6>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedImage && selectedImage.endsWith('.pdf') ? 'PDF Preview' : 'Image Preview'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedImage && selectedImage.endsWith('.pdf') ? (
            <div>
              <Document file={selectedImage} onLoadSuccess={handlePdfLoadSuccess}>
                <Page pageNumber={pdfPageNumber} />
              </Document>
              <p>Page {pdfPageNumber} of {pdfNumPages}</p>
            </div>
          ) : (
            <img src={selectedImage} alt="Preview" className="img-fluid" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MedicalRecords;
