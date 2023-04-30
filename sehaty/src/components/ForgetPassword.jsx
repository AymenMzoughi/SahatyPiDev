import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { json, useNavigate } from "react-router-dom";
import axios from 'axios';
const ForgotPassword = () => {
  const [mail, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =('http://localhost:5000/user/resetpassword') 
      const response = await axios.post('http://localhost:5000/user/forgetpassword', { mail });

      if (response.status === 200) {
        alert(response.data.message);
        setResetToken(response.data.resetToken); // Store the reset token value in state
        navigate(`/resetpassword/${response.data.resetToken}`); 
        console.log(response.data);// Navigate to the reset password page with the reset token as a URL parameter
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="mail">Email</Form.Label>
          <Form.Control
            type="mail"
            id="mail"
            name="mail"
            value={mail}
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
