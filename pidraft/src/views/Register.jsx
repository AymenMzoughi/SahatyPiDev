import React, { useRef, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBCheckbox,
  MDBSwitch,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState(0);
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const form = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom,
        prenom,
        numero,
        email,
        password,
        role,
        passwordConfirm,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      navigate("/");
    } else {
      //form.reset();
      setError(data);
    }
  };
  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <form ref={form} onSubmit={handleSubmit}>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <h4 className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </h4>

                <MDBRow>
                  <MDBCol>
                    <div className="d-flex flex-row align-items-center mb-4 ">
                      <MDBInput
                        label="Nom"
                        id="nom"
                        type="text"
                        className="w-100"
                        onChange={(e) => {
                          e.preventDefault();
                          setNom(e.target.value);
                        }}
                      />
                    </div>
                  </MDBCol>
                  <MDBCol>
                    <div className="d-flex flex-row align-items-center mb-4 ">
                      <MDBInput
                        label="Prenom"
                        id="prenom"
                        type="text"
                        className="w-100"
                        onChange={(e) => {
                          e.preventDefault();
                          setPrenom(e.target.value);
                        }}
                      />
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <MDBInput
                        label="Your Email"
                        id="email"
                        type="email"
                        onChange={(e) => {
                          e.preventDefault();
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                  </MDBCol>
                  <MDBCol>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <MDBInput
                        label="Phone number"
                        id="phone"
                        type="text"
                        onChange={(e) => {
                          e.preventDefault();
                          setNumero(e.target.value);
                        }}
                      />
                      <select
                        label="Role"
                        id="phone"
                        type="text"
                        onChange={(e) => {
                          e.preventDefault();
                          setRole(e.target.value);
                        }}
                      >
                        <option value="Docteur">Docteur</option>
                        <option value="Patient">Patient</option>
                        <option value="Pharmacien">Pharmacien</option>
                      </select>
                    </div>
                  </MDBCol>
                </MDBRow>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="Password"
                    id="password"
                    type="password"
                    onChange={(e) => {
                      e.preventDefault();
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBInput
                    label="Confirm your password"
                    id="confirmPassword"
                    type="password"
                    onChange={(e) => {
                      e.preventDefault();
                      setPasswordConfirm(e.target.value);
                    }}
                  />
                </div>
                {password !== passwordConfirm && passwordConfirm ? (
                  <p style={{ color: "red" }}>Please verify your password</p>
                ) : (
                  <React.Fragment />
                )}

                <div className="mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Agree on terms and conditions"
                  />
                </div>

                <MDBBtn type="submit" className="mb-4" size="lg">
                  Register
                </MDBBtn>
                {error && (
                  <div className="text-center text-danger">
                    <p>{error}</p>
                  </div>
                )}
                <div className="text-center">
                  <p>
                    Already have an account? <a href="/">Login</a>
                  </p>
                </div>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;
