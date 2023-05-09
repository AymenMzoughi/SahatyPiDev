import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { HeroTitle, MainButton, Section } from "../components/StyledComponents";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../assets/doc.jpg";
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthActions } from '../slices/connectSlice';

// test



const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [inputs, setInputs] = useState({


    mail: "",
    password: ""

  });

  const [responseMessage, setResponseMessage] = useState('');
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };
  const login = async (mail, password) => {
    try {
      const response = await axios.post("http://localhost:5000/user/login", { mail: inputs.mail, password: inputs.password });
      const token = response.data.user.token;
      const user = response.data.user

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      history('/profile')
      window.location.reload()
      dispatch(AuthActions.login(token));

    } catch (error) {
      console.log(error.response.data.message);
      setResponseMessage(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    // send http request
    login().then(() => dispatch(AuthActions.login())).then(() => history("/user"));
  };


  return (


    // <div>
    //   <form onSubmit={handleSubmit}  >


    //     <Box
    //       marginLeft="auto"
    //       marginRight="auto"
    //       width={300}
    //       display="flex"
    //       flexDirection={"column"}
    //       justifyContent="center"
    //       alignItems="center">
    //       <Typography variant='h2'>Login</Typography>

    //       <TextField
            // name="mail"

            // onChange={handleChange}
            // type={"mail"}
            // value={inputs.mail}
            // variant='outlined'
            // placeholder='Email'
            // margin='normal' />
    //       <TextField
            // name="password"
            // onChange={handleChange}
            // type="password"
            // value={inputs.password}
            // variant='outlined'
            // placeholder='Password'
            // margin='normal' />
    //       <Button className="button button1" onClick={login}
    //         sx={{ marginTop: 3, borderRadius: 3 }}
    //         variant="contained" color='warning'

    //       >
    //         Login
    //       </Button>
    //       <a href='/signup' onClick={(e) => e.defaultPrevented()}> change To Signup </a>


    //     </Box>


    //   </form>

    //   {responseMessage && <h1>{responseMessage}</h1>}
    //   <p className='forgot-password text-right '>
    //     <Link to={'/forgetpassword'}>Forgot password?</Link>
    //   </p>
    // </div>
<form onSubmit={handleSubmit}  >
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="mail"

                onChange={handleChange}
                type={"mail"}
                value={inputs.mail}
                variant='outlined'
                placeholder='Email'
                margin='normal' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                   name="password"
                   onChange={handleChange}
                   type={showPassword ? "text" : "password"}
                   value={inputs.password}
                   variant='outlined'
                   placeholder='Password'
                   margin='normal' />
                <FontAwesomeIcon
                  onClick={handleTogglePassword}
                  icon={showPassword ? faEyeSlash : faEye}
                />
              </InputGroup>
              <a href="/forgetpassword">Forgot password?</a>
            </Form.Group>
          </Form>
          <center>
            {error ? <p>{error}</p> : ""}
            <MainButton onClick={login}>Login</MainButton>
          </center>
        </Col>
      </Row>
    </Container>
  </Section>
  </form>
);
};


export default Login;