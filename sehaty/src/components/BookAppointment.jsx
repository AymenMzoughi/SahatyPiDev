import { Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import { HeroTitle, MainButton, Section } from "./StyledComponents";
import { useState } from "react";

const Appointment = () => {
  const jwtToken = localStorage.getItem("token");
  const options = [
    { value: "tbyb", label: "tbyb" },
    { value: "anouar", label: "Dr Anouar" },
    { value: "Amine", label: "Dr Amine" },
    { value: "tbyb1", label: "tbyb1" },
    { value: "tbyyyb2", label: "tbyyyb2" },
  ];
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/user/bookAppointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            userId: "6441341aea4a213e8905b4d2",
            doctorId: "dr foulen",
            time,
            date,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(`Appointment booked successfully ! on ${date} at ${time}`);
      } else {
        alert(data);
      }
    } catch (error) {
      alert("sorry we can't proceed your booking , try later");
    }
  };

  return (
    <Section>
      <Row>
        <Col xs={12} md={6}>
          <HeroTitle>Book an online Appointement today.</HeroTitle>
          <p>Choose the time that suits with your preferred doctor</p>
        </Col>
      </Row>
      <Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Choose your Doctor
            </Form.Label>
            <Col sm={10}>
              <Select
                value={doctor}
                onChange={setDoctor}
                options={options}
                isClearable={true}
                placeholder="Select a doctor"
                isSearchable={true}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Date
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Time
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <MainButton type="submit">Book appointment</MainButton>
            </Col>
          </Form.Group>
        </Form>
      </Row>
    </Section>
  );
};

export default Appointment;
