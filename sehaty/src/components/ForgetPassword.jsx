import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { json, useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:5000/user/forget-password";
      const response = await fetch(
        "http://localhost:5000/user/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setResetToken(data.resetToken); // Store the reset token value in state
        navigate(`/reset-password/${data.resetToken}`);
        console.log(data); // Navigate to the reset password page with the reset token as a URL parameter
      } else {
        //alert(response.data.message);
        console.log(data);
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">Submit</Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
