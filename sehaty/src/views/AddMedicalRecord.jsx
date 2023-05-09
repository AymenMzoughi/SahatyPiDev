import { useState } from 'react';
import axios from 'axios';
import { Button, CardGroup, Form, FloatingLabel, Col, Card, Image, Tabs, Tab } from 'react-bootstrap';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import imgMedi from "../assets/medicaments.png"
import img from "../assets/files.png"
import imgTrea from "../assets/treatements.png"
import imgAllergy from "../assets/allergy.png"
import imgPrescrip from "../assets/prescription.png"

const AddMedicalRecordForm = () => {
  const [images, setImages] = useState([]);
  const [imageType, setImageType] = useState('');
  const [medications, setMedications] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id;
      console.log("doctorId", userId)

      const path = window.location.pathname;
      const parts = path.split("/");
      const pId = parts[parts.length - 1]
      console.log("patient id", pId)
      const formData = new FormData();
      formData.append('patientId', pId);
      formData.append('doctorId', userId);
      formData.append('imageType', imageType);
      formData.append('medications', JSON.stringify(medications)); // Convert medications array to string before appending
      formData.append('treatments', JSON.stringify(treatments));
      formData.append('allergies', JSON.stringify(allergies));
      formData.append('prescriptions', JSON.stringify(prescriptions));
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i].imageFile);
      }
      const response = await axios.post('http://localhost:5000/MedicalRecord/addMedRec', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("medicat",medications);
      console.log("treat",treatments);
      console.log("aller",allergies);
      console.log("pres",prescriptions);
      console.log("imag",images);


    } catch (error) {
      console.error(error);
    }
    console.log('Image type:', imageType);
  };

  const handleAddTreatments = () => {
    setTreatments([...treatments, { name: '', description: '', startDate: '', endDate: '' }]);
  };

  const handleAddMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: '' }]);
  };

  const handleAddAllergies = () => {
    setAllergies([...allergies, { name: '', severity: '', reaction: '' }]);
  };

  const handleAddPrescriptions = () => {
    setPrescriptions([...prescriptions, { description: '', periode: '' }]);
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

  const handlePrescriptionsChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions[index][name] = value;
    setPrescriptions(updatedPrescriptions);
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

  const handleRemovePrescriptions = (index) => {
    const updatedPrescriptions = [...prescriptions];
    updatedPrescriptions.splice(index, 1);
    setAllergies(updatedPrescriptions);
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
    <>
   

      <Form onSubmit={handleSubmit}>
      <figure className="text-center">
        <blockquote className="blockquote"  style={{marginTop: '50px'}}>
          <p>Update Medical record for your patient</p>
        </blockquote>
      </figure>
        <CardGroup style={{ marginLeft: '80px', marginTop: '50px', width: '100rem' }}>


          <Card>
            <Col>
              <Image src={imgMedi} height={100} width={100} className="mx-auto d-block rounded" />
            </Col>
            <Card.Body>
              <Card.Title>Medications</Card.Title>
              {medications.map((medication, index) => (
                <div key={index}>
                  <FloatingLabel controlId="floatingInput" label="Medication Name" size="sm" style={{ marginBottom: "10px" }} >
                    <Form.Control type="text" name="name" value={medication.name}onChange={(e) => handleMedicationChange(e, index)}/>
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingInput" label="Dosage" size="sm" style={{ marginBottom: "10px" }} >
                    <Form.Control type="text" name="dosage" value={medication.dosage} onChange={(e) => handleMedicationChange(e, index)} />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Frequency" size="sm" style={{ marginBottom: "10px" }} >
                    <Form.Control type="text" name="frequency"  value={medication.frequency} onChange={(e) => handleMedicationChange(e, index)} />
                  </FloatingLabel>
                  <Button type="button" onClick={() => handleRemoveMedication(index)}>
                    Remove
                  </Button>
                </div>
              ))}

              <Button type="button" onClick={handleAddMedication}>
                Add Medication
              </Button>

            </Card.Body>

          </Card>

          <Card>
            <Col>
              <Image src={imgTrea} height={100} width={100} className="mx-auto d-block rounded" />
            </Col>
            <Card.Body>
              <Card.Title>Treatments</Card.Title>
              {treatments.map((treatment, index) => (
                <div key={index}>
                  <FloatingLabel controlId="floatingInput" label="Treatment Name" size="sm" style={{ marginBottom: "10px" }}>
                    <Form.Control  type="text" name="name" value={treatment.name} onChange={(e) => handleTreatmentChange(e, index)} />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Description" size="sm" style={{ marginBottom: "10px" }}>
                    <Form.Control type="text" name="description" value={treatment.description} onChange={(e) => handleTreatmentChange(e, index)} />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Start Date" size="sm" style={{ marginBottom: "10px" }}>
                    <Form.Control type="text" name="startDate" value={treatment.startDate} onChange={(e) => handleTreatmentChange(e, index)} />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="End Date" size="sm" style={{ marginBottom: "10px" }}>
                    <Form.Control type="text" name="endDate" value={treatment.endDate} onChange={(e) => handleTreatmentChange(e, index)} />
                  </FloatingLabel>
                  <Button type="button" onClick={() => handleRemoveTreatment(index)}>
                    Remove
                  </Button>
                </div>
              ))}

              <Button type="button" onClick={handleAddTreatments}>
                Add Treatment
              </Button>

            </Card.Body>

          </Card>

          <Card>
            <Col>
              <Image src={imgAllergy} height={100} width={100} className="mx-auto d-block rounded" />
            </Col>
            <Card.Body>
              <Card.Title>Allergies</Card.Title>
              {allergies.map((allergy, index) => (
                <div key={index}>
                  <FloatingLabel controlId="floatingInput" label="Allergy Name" size="sm" style={{ marginBottom: "10px" }}>
                    <Form.Control type="text" name="name" placeholder="Allergy Name" value={allergy.name} onChange={(e) => handleAllergiesChange(e, index)}/>
                  </FloatingLabel>
                  <Form.Select style={{ marginBottom: "10px" }}  className="form-control" name="severity" value={allergy.severity} onChange={(e) => handleAllergiesChange(e, index)}>
                    <option>Severity</option>
                    <option value="Mild">Mild</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Severe">Severe</option>
                  </Form.Select>
                  <FloatingLabel controlId="floatingInput" label="Reaction" size="sm" style={{ marginBottom: "10px" }}>
                    <Form.Control  type="text" name="reaction" value={allergy.reaction} onChange={(e) => handleAllergiesChange(e, index)} />
                  </FloatingLabel>
                  <Button type="button" onClick={() => handleRemoveAllergies(index)}>
                    Remove
                  </Button>
                </div>
              ))}

              <Button type="button" onClick={handleAddAllergies}>
                Add Allergy
              </Button>

            </Card.Body>
          </Card>

          <Card>
            <Col>
              <Image src={imgPrescrip} height={100} width={100} className="mx-auto d-block rounded" />
            </Col>
            <Card.Body>
              <Card.Title>Prescription</Card.Title>
              {prescriptions.map((prescription, index) => (
                <div key={index}>
                  <FloatingLabel controlId="floatingInput" label="Description" size="sm" style={{ marginBottom: "10px" }}>
                    <Form.Control type="text" name="description" value={prescription.description} onChange={(e) => handlePrescriptionsChange(e, index)} />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingInput" label="Periode" size="sm" style={{ marginBottom: "10px" }}>
                    <Form.Control type="text" name="periode" value={prescription.periode} onChange={(e) => handlePrescriptionsChange(e, index)} />
                  </FloatingLabel>

                  <Button type="button" onClick={() => handleRemovePrescriptions(index)}>
                    Remove
                  </Button>
                </div>
              ))}

              <Button type="button" onClick={handleAddPrescriptions}>
                Add Prescription
              </Button>

            </Card.Body>

          </Card>

          <Card>
            <Col>
              <Image src={img} height={100} width={100} className="mx-auto d-block rounded" />
            </Col>
            <Card.Body>
              <Card.Title>Document</Card.Title>
              <Form.Select style={{ marginBottom: "10px" }} value={imageType} onChange={handleImageTypeChange}>
                <option>Type</option>
                <option value="x-ray">X-Ray</option>
                <option value="MRI">MRI</option>
                <option value="medical letter">Medical Letter</option>
                <option value="CT scan">CT Scan</option>
              </Form.Select>
              <Form.Control type="file" className="form-control-file" id="images" multipleaccept="image/*, application/pdf" onChange={handleImageChange} />
            </Card.Body>

          </Card>

        </CardGroup>
        <button  style={{marginTop: '50px'}}type="submit" className="btn btn-primary mx-auto d-block" >Update</button>
      </Form>
    </>

  );
};

export default AddMedicalRecordForm;
