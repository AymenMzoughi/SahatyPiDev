import { Col, Row } from "react-bootstrap";
import Service from "./Service";
import { HeroTitle, Section } from "./StyledComponents";

const Services = () => {
  const services = [
    "Medical Tips and Events",
    "Book Appointment with doctors",
    "Pharmacies and medicaments",
    "Online Ambulance Request"
  ];
  return (
    <Section>
      <Row>
        <Col xs={15} lg={8}>
          <HeroTitle style={{ height: "auto" }}>
            What we can help you with ?
          </HeroTitle>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dolore
            eos repellat delectus ducimus eligendi voluptates provident vero.
            Aut rerum id odit corrupti sint exercitationem illo porro
            accusantium dignissimos? Voluptas.
          </p>
        </Col>
      </Row>
      <Row>
        {services.map((service) => (
          <Col key={services.indexOf(service)} xs={12} sm={6} lg={3}>
            <Service service={service} />
          </Col>
        ))}
      </Row>
    </Section>
  );
};

export default Services;
