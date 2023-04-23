import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { HeroTitle, MainButton, Section } from "../components/StyledComponents";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../assets/doc.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slices/connectSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        dispatch(login());
        navigate("/userprofile");
      } else {
        setError(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Section>
      <Container>
        <Row style={{ alignItems: "center" }}>
          <Col xs={12} md={6}>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "24px",
              }}
              src={image}
              alt=""
            />
          </Col>
          <Col xs={12} md={6}>
            <center>
              <HeroTitle>Welcome back !</HeroTitle>
              <p>Please enter your mail and password to log in.</p>
            </center>
            <Form>
              <Form.Group className="mb-3" controlId="mail">
                <Form.Label>mail address</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    e.preventDefault();
                    setMail(e.target.value);
                  }}
                  type="email"
                  placeholder="Enter Email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    onChange={(e) => {
                      e.preventDefault();
                      setPassword(e.target.value);
                    }}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <FontAwesomeIcon
                    onClick={handleTogglePassword}
                    icon={showPassword ? faEyeSlash : faEye}
                  />
                </InputGroup>
                <a href="/forgot-password">Forgot password?</a>
              </Form.Group>
            </Form>
            <center>
              {error ? <p>{error}</p> : ""}
              <MainButton onClick={handleLogin}>Login</MainButton>
            </center>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default Login;
