import { Form, Container, Row, Col, FormGroup } from "react-bootstrap";
import { MainButton, HeroTitle } from "../components/StyledComponents";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Claim = () => {
  const [doctor, setDoctor] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [description, setDescription] = useState("");
  const [doctorList, setDoctorList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id

  const getDoctorData = async () => {
    try {
      //   dispatch(showLoading());
      const role = "Doctor"
      const response = await axios.get(
        `http://localhost:5000/user/getAllDoctors/${role}`


      );
      setDoctorList(response.data)
      console.log(response.data)

      //   dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      //   dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getDoctorData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/claim/addClaim",{
       
          userId: userId,
          doctorName,
          description,
        });
        console.log(response.data)
      
      if (response.status === 200) {
        alert(
          "Claim sent successfully! Thank you for your trust. You will be answered soon."
        );
      } else {
        alert(response.data);
      }
    } catch (error) {
      alert("Sorry, we can't proceed your claim. Please try again later.");
    }
    setDoctorName("");
    setDescription("");
    window.location.reload()
  };
  

  return (
    <Container>
      <Row>
        <center>
          <HeroTitle style={{ height: "auto" }}>Claim Space</HeroTitle>
          <p>
            You can claim about any service or behaviour , our admins will
            respond to your request as soon as possible <br />
            <b>thank you for your trust !</b>
          </p>
        </center>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <Col xs={12} md={7}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicRole">
              <Form.Label>what your claim is about ?</Form.Label>
              <Form.Control
                as="select"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
              >
                <option value="">Select a doctor</option>
                {doctorList.map((doctor) => (
                  <option key={doctor._id} value={`${doctor.firstname} ${doctor.lastname}`}>
                    {`${doctor.firstname} ${doctor.lastname}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                as="textarea"
                rows={4}
                placeholder="Enter your message"
              />
            </Form.Group>

            <MainButton type="submit">Submit Claim</MainButton>
          </Form>
        </Col>
      </Row>
    </Container >
  );
};

export default Claim;
