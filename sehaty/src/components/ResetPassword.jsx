import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

import { useParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  let { token } = useParams("token");
  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/user/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resetToken: token, password }),
        }
      );

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          <h1>Reset Password</h1>
          <Form onSubmit={handleReset}>
            <Form.Label htmlFor="password">New Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Label htmlFor="confirmPassword">Confirm password</Form.Label>
            <Form.Control
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit">Reset Password</Button>
          </Form>
          {message && <p>{message}</p>}
        </Col>
      </Row>
    </Container>
  );
}
export default ResetPassword;
