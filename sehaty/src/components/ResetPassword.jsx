import React, { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    const path = window.location.pathname;
    const parts = path.split("/");
    const token=parts[parts.length - 1]
    console.log(token)

    console.log("tok: ",token)
    try {
      const response = await axios.post('http://localhost:5000/user/resetpassword', { token, password });

      console.log(response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.log(error.response.data);
      setMessage(error.response.data.message);
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
