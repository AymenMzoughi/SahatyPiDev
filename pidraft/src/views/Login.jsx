import React, { useState } from "react";
import { MDBContainer, MDBInput, MDBCheckbox, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
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
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/userprofile");
      } else {
        setError(data);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBInput
        onChange={(e) => {
          e.preventDefault();
          setEmail(e.target.value);
        }}
        wrapperClass="mb-4"
        label="Email address"
        id="form1"
        type="email"
      />
      <MDBInput
        onChange={(e) => {
          e.preventDefault();
          setPassword(e.target.value);
        }}
        wrapperClass="mb-4"
        label="Password"
        id="form2"
        type="password"
      />

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox
          name="flexCheck"
          value=""
          id="flexCheckDefault"
          label="Remember me"
        />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn onClick={handleLogin} className="mb-4">
        Sign in
      </MDBBtn>
      {error && (
        <div className="text-center text-danger">
          <p>{error}</p>
        </div>
      )}
      <div className="text-center">
        <p>
          Not a member? <a href="/register">Register</a>
        </p>
      </div>
    </MDBContainer>
  );
}

export default Login;
