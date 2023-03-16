import React, { useEffect, useState } from "react";
import FileSaver from "file-saver";
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
} from "mdb-react-ui-kit";
import PdfDocument from "../components/PdfDocument";
import { useNavigate } from "react-router-dom";
//import { PDFViewer } from "@react-pdf/renderer";

export default function UserProfile({ user }) {
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
  const downloadPDF = async () => {
    var blob = new Blob([<PdfDocument user={user} />], {
      type: "application/pdf",
    });
    FileSaver.saveAs(blob, `${user.nom}Record.pdf`);
  };
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <section style={{ backgroundColor: "#eee" }}>
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
                  {user && user.nom + " " + user.prenom}
                </h4>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    Edit
                  </MDBBtn>
                  <MDBBtn outline onClick={downloadPDF} className="ms-1">
                    My record
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
      </MDBContainer>
      {/* <PDFViewer>
        <PdfDocument user={user} />
      </PDFViewer> */}
    </section>
  );
}
