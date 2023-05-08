import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MainButton } from "../components/StyledComponents";

const NotFound = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center mb-4">404 - Page Not Found</h1>
          <p className="text-center">
            The page you are looking for does not exist.
          </p>
          <div className="text-center mt-4">
            <MainButton href="/">Go back to Home</MainButton>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;


