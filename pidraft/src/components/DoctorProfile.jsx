import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
  MDBProgressBar,
  MDBProgress,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
//import { PDFViewer } from "@react-pdf/renderer";

export default function DoctorProfile({ user }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setNumero] = useState("");
  const [edit, setEdit] = useState(false);
  const jwtToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleEditSubmit = async () => {
    await fetch("http://localhost:5000/user/login", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: user,
    });
    console.log(email, nom, prenom, numero);
    setEdit(false);
    navigate("/login");
  };

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <section style={{ backgroundColor: "#b4d3fb" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <h4 className="text-muted mb-4">
                  {user && "Dr. " + user.nom + " " + user.prenom}
                </h4>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    Edit
                  </MDBBtn>
                </div>
                <MDBBtn className="btn-danger" onClick={handleLogout}>
                  Logout
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Nom</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {edit ? (
                      <MDBInput
                        onChange={(e) => {
                          e.preventDefault();
                          setNom(e.target.value);
                        }}
                        wrapperClass="mb-4"
                        label="Nom"
                        id="form1"
                        type="text"
                        placeholder={user.nom}
                      />
                    ) : (
                      <MDBCardText className="text-muted">
                        {user && user.nom}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Prenom</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {edit ? (
                      <MDBInput
                        onChange={(e) => {
                          e.preventDefault();
                          setPrenom(e.target.value);
                        }}
                        wrapperClass="mb-4"
                        label="Prenom"
                        id="form1"
                        type="text"
                        placeholder={user.prenom}
                      />
                    ) : (
                      <MDBCardText className="text-muted">
                        {user && user.prenom}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {edit ? (
                      <MDBInput
                        onChange={(e) => {
                          e.preventDefault();
                          setEmail(e.target.value);
                        }}
                        wrapperClass="mb-4"
                        label="Email address"
                        id="form1"
                        type="email"
                        placeholder={user.email}
                      />
                    ) : (
                      <MDBCardText className="text-muted">
                        {user && user.email}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {edit ? (
                      <MDBInput
                        onChange={(e) => {
                          e.preventDefault();
                          setNumero(e.target.value);
                        }}
                        wrapperClass="mb-4"
                        label="Phone number"
                        id="form1"
                        type="number"
                        placeholder={user.numero}
                      />
                    ) : (
                      <MDBCardText className="text-muted">
                        {user && user.numero}
                      </MDBCardText>
                    )}
                  </MDBCol>
                </MDBRow>
                {edit ? (
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn onClick={handleEditSubmit}>Save</MDBBtn>
                    <MDBBtn
                      outline
                      onClick={() => {
                        setEdit(false);
                      }}
                      className="ms-1"
                    >
                      Cancel
                    </MDBBtn>
                  </div>
                ) : (
                  ""
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="6">
            <MDBCard className="mb-4 mb-md-0">
              <MDBCardBody>
                <MDBCardText className="mb-4">Mes Patients</MDBCardText>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td colspan="2">Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6">
            <MDBCard className="mb-4 mb-md-0">
              <MDBCardBody>
                <MDBCardText className="mb-4">Traitement en cours</MDBCardText>
                <MDBCardText className="mb-1" style={{ fontSize: ".77rem" }}>
                  Hopital Siliana
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText
                  className="mt-4 mb-1"
                  style={{ fontSize: ".77rem" }}
                >
                  Hopital Gaafour
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText
                  className="mt-4 mb-1"
                  style={{ fontSize: ".77rem" }}
                >
                  Clinique Megrine
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText
                  className="mt-4 mb-1"
                  style={{ fontSize: ".77rem" }}
                >
                  Clinique Carthagene
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                </MDBProgress>

                <MDBCardText
                  className="mt-4 mb-1"
                  style={{ fontSize: ".77rem" }}
                >
                  Hopital Rabta
                </MDBCardText>
                <MDBProgress className="rounded">
                  <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                </MDBProgress>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {/* <PDFViewer>
        <PdfDocument user={user} />
      </PDFViewer> */}
    </section>
  );
}
