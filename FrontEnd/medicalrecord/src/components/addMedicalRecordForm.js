import { useState } from 'react';
import axios from 'axios';

const AddMedicalRecordForm = () => {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [images, setImages] = useState([]);
  const [imageType, setImageType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('patientId', patientId);
      formData.append('doctorId', doctorId);
      formData.append('imageType', imageType);
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i].imageFile);
      }
      const response = await axios.post('http://localhost:5000/MedicalRecord/addMedRec', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    console.log('Image type:', imageType);
  };

  const handleImageChange = (event) => {
    const selectedFiles = event.target.files;
    const newImages = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      newImages.push({
        imageUrl: URL.createObjectURL(selectedFiles[i]),
        imageFile: selectedFiles[i],
        imageType: imageType,
      });
    }
    setImages(newImages);
  };

  const handleImageTypeChange = (event) => {
    setImageType(event.target.value);
  }

  return (
    <div className="container mt-4">
      <h2>Add Medical Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patientId">Patient ID:</label>
          <input
            type="text"
            className="form-control"
            id="patientId"
            placeholder="Enter patient ID"
            value={patientId}
            onChange={(event) => setPatientId(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="doctorId">Doctor ID:</label>
          <input
            type="text"
            className="form-control"
            id="doctorId"
            placeholder="Enter doctor ID"
            value={doctorId}
            onChange={(event) => setDoctorId(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageType">Image Type:</label>
          <select
            className="form-control"
            id="imageType"
            value={imageType}
            onChange={handleImageTypeChange}
          >
            <option value="">--Select Image Type--</option>
            <option value="x-ray">X-Ray</option>
            <option value="prescription">Prescription</option>
            <option value="medical letter">Medical Letter</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="images">Upload Medical Images:</label>
          <input
            type="file"
            className="form-control-file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddMedicalRecordForm;
