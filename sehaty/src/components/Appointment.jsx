import { Col, Form, Row } from "react-bootstrap";
import {
  AppointmentContainer,
  HeroTitle,
  MainButton,
  Section,
} from "./StyledComponents";
import { useRef, useState } from "react";
import image from "../assets/doc.jpg";
const Appointment = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [dateTime, setDateTime] = useState("");
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
    const formData = new FormData(formRef.current);
    console.log(formData);
  };
  return (
    <Section>
      <Row>
        <Col xs={12} md={6}>
          <HeroTitle>Book an online Appointement today.</HeroTitle>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
            quisquam, natus fugiat illum enim iste cupiditate culpa recusandae
            non esse! Similique et alias itaque voluptate vero provident
            suscipit labore officia!
          </p>
          <MainButton onClick={handleSubmit}>Book Appointment</MainButton>
        </Col>
        <Col style={{ height: "100%" }} xs={12} md={6}>
          <AppointmentContainer>
            <div className="image">
              <img src={image} alt="" />
            </div>

            <div className="form">
              <Form ref={formRef}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="phone">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="department">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    as="select"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option>Select department</option>
                    <option>Cardiology</option>
                    <option>Chirurgy generale</option>
                    <option>Urology</option>
                    <option>Pediatry</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="dateTime">
                  <Form.Label>Date and time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </div>
          </AppointmentContainer>
        </Col>
      </Row>
    </Section>
  );
};

export default Appointment;
