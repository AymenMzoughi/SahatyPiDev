import { Col, Row } from "react-bootstrap";
import { HeroTitle, MainButton, Section } from "./StyledComponents";
import Doctor from "./Doctor";

const Doctors = (props) => {
  const doctors = [
    "Aymen Mzoughi",
    "Rayen bakali",
    "Anouar mhamdi",
    "Zeineb Bouaalegui",
    "Hassan Kaabechi",
    "Flen ben Foulen",
    "Flena Foulenia",
  ];
  return (
    <Section>
      {props.landing ? (
        <Row>
          <Col xs={12} lg={6}>
            <HeroTitle style={{ height: "auto" }}>Our Doctors</HeroTitle>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
              dolore eos repellat delectus ducimus eligendi voluptates provident
              vero.
            </p>
          </Col>
        </Row>
      ) : (
        ""
      )}

      <Row style={{ justifyContent: "center" }}>
        {doctors.map((doctor) => (
          <Col key={doctors.indexOf(doctor)} xs={12} sm={6} md={4} lg={3}>
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <center>
          <MainButton>View all</MainButton>
        </center>
      </Row>
    </Section>
  );
};

export default Doctors;
