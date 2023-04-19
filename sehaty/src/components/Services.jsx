import { Col, Row } from "react-bootstrap";
import Service from "./Service";
import { HeroTitle, Section } from "./StyledComponents";

const Services = () => {
  const services = [
    "Doctor search",
    "Request Consultation",
    "Make Appointment",
    "Buy Medicals",
  ];
  return (
    <Section>
      <Row>
        <Col xs={12} lg={6}>
          <HeroTitle style={{ height: "auto" }}>
            Easy steps for your solution{" "}
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
