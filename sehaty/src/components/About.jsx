import { Col, Row } from "react-bootstrap";
import { HeroTitle, MainButton, Section } from "./StyledComponents";

const About = () => {
  return (
    <Section>
      <Row>
        <Col xs={12} md={6}>
          <HeroTitle>About Us </HeroTitle>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum
            quisquam, natus fugiat illum enim iste cupiditate culpa recusandae
            non esse! Similique
          </p>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col xs={12} md={6}>
          <img
            height="100%"
            width="100%"
            style={{ objectFit: "cover", borderRadius: "24px" }}
            src="https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
            alt=""
          />
        </Col>
        <Col xs={12} md={6}>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia
            architecto quisquam ea, nulla odio veritatis? Aliquam temporibus
            asperiores totam possimus! Odio laudantium similique a rem nulla
            magni maiores tempore blanditiis! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Consequatur, dolorum. Quis iusto, odit
            soluta nemo consequatur molestiae in sunt, eveniet repudiandae ex
            unde magnam nostrum nobis suscipit tempore blanditiis sapiente.
          </p>
          <MainButton>Read more</MainButton>
        </Col>
      </Row>
    </Section>
  );
};

export default About;
