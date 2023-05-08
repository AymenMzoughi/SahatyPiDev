import { Form, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Doctors from "../components/Doctors";
import { MainButton, SearchDiv } from "../components/StyledComponents";
import Medicines from "../components/Medicines";
const DoctorView = () => {
  const specialties = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
  ];
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");
  const [specialty, setSpecialty] = useState(specialties[0]);
  const handleSearch = () => {
    console.log("");
  };
  return (
    <Container>
      <Row>
        <center>
          <Col xs={12} lg={9}>
            <h1>Doctor</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam,
              amet consequuntur perspiciatis neque ipsum cumque accusantium
              veniam assumenda alias quis,
            </p>

            <SearchDiv>
              <Form
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <Form.Group>
                  <Form.Control
                    selected={date}
                    onChange={setDate}
                    type="date"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="time"
                    value={time}
                    onChange={setTime}
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    as="select"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  >
                    {specialties.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <MainButton onClick={handleSearch}>Search</MainButton>
              </Form>
            </SearchDiv>
          </Col>
        </center>
      </Row>
      <Row>
        <Doctors />
      </Row>
      <Row>
        <Medicines />
      </Row>
    </Container>
  );
};

export default DoctorView;
