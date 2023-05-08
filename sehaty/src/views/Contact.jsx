import { Form, Container, Row, Col } from "react-bootstrap";
import { MainButton, HeroTitle } from "../components/StyledComponents";
import image from "../assets/hero.png";
import { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      name,
      email,
      address,
      phone,
      message,
    };

    emailjs
      .send(
        "service_02fxuqf",
        "template_vvpz1c3",
        templateParams,
        "xYsTEIfl6Cv-pePga"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Your message has been sent successfully!");
        },
        (error) => {
          console.log("FAILED...", error);
          alert(
            "Sorry, there was a problem sending your message. Please try again later."
          );
        }
      );
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

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
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter your name"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter your phone number"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter your address"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                as="textarea"
                rows={3}
                placeholder="Enter your message"
              />
            </Form.Group>

            <MainButton type="submit">Send Message</MainButton>
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
