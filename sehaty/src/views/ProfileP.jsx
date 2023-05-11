
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBTableBody,
  MDBTable,
  MDBTableHead,
  MDBPopover,
  MDBPopoverHeader,
  MDBPopoverBody,
  MDBTooltip,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput,
} from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';

const ProfileUser = () => {
  const [popoverModal, setPopoverModal] = useState(false);
  const toggleShow = () => setPopoverModal((prevState) => !prevState);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const [myUser, setMyUser] = useState({
    numero: "",
    mail: "",
    website: "",
    twitter: "",
    facebook: "",
    instagram: "",
    address: "",
  
  });

  const handleCancelAppointment = async (appointmentId) => {

    try {
      const response = await axios.put("http://localhost:5000/appointment/cancel", { appointmentId });
     console.log(response.data.message);
     window.location.reload()
    } catch (error) {
      console.log(error.response.data.message);
    
  };
}

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMyUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const [appointments, setAppointments] = useState([]);

  const getAppointmentsData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/appointment/getAppointmentsForPatient/${userId}`);
      setAppointments(response.data);
      console.log(appointments)
    } catch (error) {
      console.log(error);
    }
  };

  const [patientList, setPatientList] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const filteredUser = Object.fromEntries(Object.entries(myUser).filter(([key, value]) => value));
    try {
      const response = await axios.put(`http://localhost:5000/user/edit/${userId}`, filteredUser);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const [profile, setProfile] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/profile/${userId}`);
      console.log(response.data)
      return response.data
      
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getAppointmentsData();
    fetchProfile().then((e) => { setProfile(e); });
  }, []);

  return (
    // Modal Part
    <>
      <>
        <MDBModal tabIndex='-1' className='custom-modal' show={popoverModal} setShow={setPopoverModal}>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>You Appointment List</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                {Array.isArray(appointments) && (
                  <MDBTable align='middle'>
                    <MDBTableHead light>
                      <tr>
                        <th scope='col'>Doctor Name</th>
                        <th scope='col'>Date and Time</th>
                        <th scope='col'>Method</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Cancel ?</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {appointments.map((app) => (
                        <tr key={app.id}>
                          <td>{app.test}</td>
                          <td>{app.date}</td>
                          <td>{app.type}</td>
                          <td>{app.status}</td>
                          <td>
                          <MDBBtn onClick={() => handleCancelAppointment(app.id)} color='link' size='sm'>
                              <i className='fa fa-check mx-2'></i>
                            </MDBBtn>
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                )}
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </><section style={{ backgroundColor: '#eee' }}>

        <>

          <MDBContainer className="py-5">


            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">

                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: '150px' }}
                      fluid />
                    <p className="text-muted mb-1">I'm a {profile.role}</p>
                    <p className="text-muted mb-4"></p>
                    <div className="d-flex justify-content-center mb-2">
                      <MDBBtn outline className="ms-1" onClick={toggleShow}>Appointement List</MDBBtn>
                      <MDBBtn outline className="ms-1" href={`/medicalRecordPatient/${userId}`}>Medical Record</MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>

                <MDBCard className="mb-4 mb-lg-0">
                  <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3">
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fas icon="globe fa-lg text-warning" />
                        <MDBCardText>{profile.website}</MDBCardText>
                      </MDBListGroupItem>

                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                        <MDBCardText>{profile.twitter}</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                        <MDBCardText>{profile.instagram}</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                        <MDBCardText>{profile.facebook}</MDBCardText>
                      </MDBListGroupItem>
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.firstname} {profile.lastname}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.mail}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Mobile</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">+(216) {profile.numero}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{profile.address}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>

                <MDBRow>
                 

                  <MDBCol md="6">
                    <Form onSubmit={handleSubmit}>
                      <MDBCard className="mb-5 mb-md-0 ">
                        <MDBCardBody>
                          <MDBCardText className="mb-4  "><span className="text-primary font-italic me-1">Edit Profile</span></MDBCardText>
                          <MDBRow className='g-3 '>
                            <MDBCol sm='5'>
                              <MDBInput label='Email' type="email"
                                id="mail"
                                name="mail"
                                value={myUser.mail}
                                onChange={handleInputChange} />

                            </MDBCol>
                            <MDBCol size='5'>
                              <MDBInput id='form12Example2' label='Phone Number' type="text"
                                name="numero"
                                value={myUser.numero}
                                onChange={handleInputChange} />
                            </MDBCol>
                            <MDBCol size='5'>
                              <MDBInput id='form12Example3' label='Adress' type="text"
                                name="address"
                                value={myUser.address}
                                onChange={handleInputChange} />
                            </MDBCol>
                        
                            <MDBCol size='5'>
                              <MDBInput id='form12Example5' label='Instagram Link' type="text"
                                name="instagram"
                                value={myUser.instagram}
                                onChange={handleInputChange} />
                            </MDBCol>
                            <MDBCol size='5'>
                              <MDBInput id='form12Example6' label='Website' type="text"
                                name="website"
                                value={myUser.website}
                                onChange={handleInputChange} />
                            </MDBCol>
                            <MDBCol size='5'>
                              <MDBInput id='form12Example7' label='Facebook Link' type="text"
                                name="facebook"
                                value={myUser.facebook}
                                onChange={handleInputChange} />
                            </MDBCol>
                            <MDBCol size='5'>
                              <MDBInput id='form12Example8' label='Twitter Link' type="text"
                                name="twitter"
                                value={myUser.twitter}
                                onChange={handleInputChange} />
                            </MDBCol>
                          
                         
                          </MDBRow>
                          <MDBBtn type="submit" className="btn btn-primary mx-auto d-block " style={{ marginTop: '10px' }}>Validate Your Edits</MDBBtn>
                        </MDBCardBody>
                      </MDBCard>
                    </Form>
                  </MDBCol>

                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </>

        <style>
          {`
                    .custom-modal .modal-dialog {
                    max-width: 45%;
                    height: auto;
                    margin: 50;
                    }

                    .map-container-wrapper {
                    height: 100%;
                    width: 100%;
                    }
                `}
        </style>

      </section></>

  );
}
export default ProfileUser;