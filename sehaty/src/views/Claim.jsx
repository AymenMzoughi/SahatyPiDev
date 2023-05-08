import { Form, Container, Row, Col, FormGroup } from "react-bootstrap";
import { MainButton, HeroTitle } from "../components/StyledComponents";
import { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";


const Claim = () => {
  const [doctor, setDoctor] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const jwtToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("token");
    
    if (!jwtToken) {
      // redirect to login page if user is not logged in
      navigate("/login");
      
    }
    //exemple kif t7eb tjib id mtaa user li connecté
    const user = JSON.parse(localStorage.getItem("user"));
      const userId = user;
      console.log("test",userId)
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user/addClaim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          userId: "6441341aea4a213e8905b4d2",
          doctorName,
          description,
          subject,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(
          "Claim sent successfully ! , thank you for trust you will be answered soon"
        );
      } else {
        alert(data);
      }
    } catch (error) {
      alert("sorry we can't proceed your claim , try later");
    }
    setDoctorName("");
    setSubject("");
    setDescription("");
  };
  const handleCheckboxChange = () => {
    setDoctor(!doctor);
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
            <Form.Label>what your claim is about ?</Form.Label>
            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="General Purpose"
                  checked={!doctor}
                  onChange={handleCheckboxChange}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  label="Doctor"
                  checked={doctor}
                  onChange={handleCheckboxChange}
                />
              </Col>
            </Row>

            {doctor ? (
              <Form.Group controlId="formDoctorName">
                <Form.Label>Doctor name</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setDoctorName(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter Doctor name"
                />{" "}
              </Form.Group>
            ) : (
              <Form.Group>
                {" "}
                <Form.Label>Topic</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter topic"
                />
              </Form.Group>
            )}

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
    </Container>
  );
};

export default Claim;
