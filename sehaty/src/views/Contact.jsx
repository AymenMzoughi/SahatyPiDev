import { Form, Container, Row, Col } from "react-bootstrap";
import { MainButton, HeroTitle } from "../components/StyledComponents";
import image from "../assets/hero.png";
const Contact = () => {
  return (
    <Container>
      <Row>
        <center>
          <HeroTitle style={{ height: "auto" }}>Get in touch today</HeroTitle>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dolore
            eos repellat delectus ducimus eligendi voluptates provident vero.
          </p>
        </center>
      </Row>
      <Row>
        <Col xs={12} md={7}>
          <Form>
            <Row>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter your address" />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
              />
            </Form.Group>

            <MainButton variant="primary" type="submit">
              Send Message
            </MainButton>
          </Form>
        </Col>
        <Col xs={12} md={5}>
          <img
            style={{ width: "100%", objectFit: "cover" }}
            src={image}
            alt=""
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
