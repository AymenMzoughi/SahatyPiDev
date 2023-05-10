import { Col, Container, Form, Row } from "react-bootstrap";
import { HeroTitle, MainButton, Section } from "../components/StyledComponents";
import image from "../assets/Daco_4272495.png";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    numero: "",
    role: "",
    mail: "",
    password: "",
    passwordConfirm: "",
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const navigate = useNavigate();
  const form = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      navigate("/login");
    } else {
      setError(data);
    }
  };
  return (
    <Section>
      <Container>
        <Row style={{ alignItems: "center" }}>
          <Col xs={12} md={6}>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "24px",
              }}
              src={image}
              alt=""
            />
          </Col>
          <Col xs={12} md={6}>
            <center>
              <HeroTitle>Welcome To Sehaty !</HeroTitle>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto ducimus quidem aperiam! Ullam quibusdam perferendis
              </p>
            </center>
            <Form ref={form}>
              <Form.Group controlId="formBasicName">
                <Form.Label>firstname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </Form.Group>
              
              <Form.Group controlId="formBasicLastName">
                <Form.Label>lastname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPhoneNumber">
                <Form.Label>Numero</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter Numero"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Select role</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Patient">Patient</option>
                  <option value="Pharmacist">Pharmacist</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPasswordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
            <center>
              {error ? <p>{error}</p> : ""}
              <MainButton onClick={handleSubmit}>Login</MainButton>
            </center>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default Register;