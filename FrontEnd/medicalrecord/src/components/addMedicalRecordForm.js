import { useState } from 'react';
import axios from 'axios';

const AddMedicalRecordForm = () => {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [images, setImages] = useState([]);
  const [imageType, setImageType] = useState('');
  const [medications, setMedications] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('patientId', patientId);
      formData.append('doctorId', doctorId);
      formData.append('imageType', imageType);
      formData.append('medications', JSON.stringify(medications)); // Convert medications array to string before appending
      formData.append('treatments', JSON.stringify(treatments));
      formData.append('allergies', JSON.stringify(allergies));
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i].imageFile);
      }
      const response = await axios.post('http://localhost:5000/MedicalRecord/addMedRec', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      
      console.log('hhh',medications)
      
    } catch (error) {
      console.error(error);
    }
    console.log('Image type:', imageType);
  };
  
  const handleAddTreatments = () => {
    setTreatments([...treatments, { name: '', description: '', startDate: '', endDate:'' }]);
  };

  const handleAddMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '' }]);
  };
  
  const handleAddAllergies = () => {
    setAllergies([...allergies, { name: '', severity: '', reaction: '' }]);
  };

  const handleMedicationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMedications = [...medications];
    updatedMedications[index][name] = value;
    setMedications(updatedMedications);
  };

  const handleTreatmentChange = (e, index) => {
    const { name, value } = e.target;
    const updatedTreatments = [...treatments];
    updatedTreatments[index][name] = value;
    setTreatments(updatedTreatments);
  };

  const handleAllergiesChange = (e, index) => {
    const { name, value } = e.target;
    const updatedAllergies = [...allergies];
    updatedAllergies[index][name] = value;
    setAllergies(updatedAllergies);
  };

  const handleRemoveMedication = (index) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
  };

  const handleRemoveTreatment = (index) => {
    const updatedTreatments = [...treatments];
    updatedTreatments.splice(index, 1);
    setTreatments(updatedTreatments);
  };

  const handleRemoveAllergies = (index) => {
    const updatedAllergies = [...allergies];
    updatedAllergies.splice(index, 1);
    setAllergies(updatedAllergies);
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
            accept="image/*, application/pdf"
            onChange={handleImageChange}
          />
        </div>

        <h1>Medications</h1>
        {medications.map((medication, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Medication Name"
              value={medication.name}
              onChange={(e) => handleMedicationChange(e, index)}
            />
            <input
              type="text"
              name="dosage"
              placeholder="Dosage"
              value={medication.dosage}
              onChange={(e) => handleMedicationChange(e, index)}
            />
            <input
              type="text"
              name="frequency"
              placeholder="Frequency"
              value={medication.frequency}
              onChange={(e) => handleMedicationChange(e, index)}
            />
            <button type="button" onClick={() => handleRemoveMedication(index)}>
              Remove
            </button>
          </div>
          ))}
          <button type="button" onClick={handleAddMedication}>
            Add Medication
          </button>
          
          <h1>Treatments</h1>
        {treatments.map((treatment, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Treatment Name"
              value={treatment.name}
              onChange={(e) => handleTreatmentChange(e, index)}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={treatment.description}
              onChange={(e) => handleTreatmentChange(e, index)}
            />
            <input
              type="text"
              name="startDate"
              placeholder="Start Date"
              value={treatment.startDate}
              onChange={(e) => handleTreatmentChange(e, index)}
            />
            <input
              type="text"
              name="endDate"
              placeholder="End Date"
              value={treatment.endDate}
              onChange={(e) => handleTreatmentChange(e, index)}
            />
            <button type="button" onClick={() => handleRemoveTreatment(index)}>
              Remove
            </button>
          </div>
            ))}
            <button type="button" onClick={handleAddTreatments}>
              Add Treatment
            </button>

            <h1>Allergies</h1>
            {allergies.map((allergy, index) => (
          <div key={index}>
          <input
            type="text"
            name="name"
            placeholder="Allergy Name"
            value={allergy.name}
            onChange={(e) => handleAllergiesChange(e, index)}
          />
          <input
            type="text"
            name="severity"
            placeholder="Severity"
            value={allergy.severity}
            onChange={(e) => handleAllergiesChange(e, index)}
          />
          <input
            type="text"
            name="reaction"
            placeholder="Reaction"
            value={allergy.reaction}
            onChange={(e) => handleAllergiesChange(e, index)}
          />
          <button type="button" onClick={() => handleRemoveAllergies(index)}>
            Remove
          </button>
        </div>
          ))}
          <button type="button" onClick={handleAddAllergies}>
            Add Allergy
          </button>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddMedicalRecordForm;

