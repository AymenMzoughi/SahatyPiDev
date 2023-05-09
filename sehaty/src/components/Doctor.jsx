import { Card } from "react-bootstrap";
import image from "../assets/test.png";
import { DoctorCard, MainButton } from "./StyledComponents";
import React, { useEffect, useState } from "react";
import axios from "axios";
import img from '../assets/doctors.jpg'
const Doctor = () => {
  const [doctorList, setDoctorList] = useState([]);
  
  const [doctor, setDoctor] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id
 
  const getDoctorData = async () => {
    try {
      //   dispatch(showLoading());
      const role = "Docteur"
      const response = await axios.get(
        `http://localhost:5000/user/getAllDoctors/${role}`


      );
      setDoctorList(response.data)
      console.log(response.data)

      //   dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      //   dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getDoctorData();
  }, []);

  const sortedDoctors = doctorList.reduce((acc, doctor) => {
    const index = acc.findIndex((group) => group.specialization === doctor.specialization);
    if (index === -1) {
      acc.push({ specialization: doctor.specialization, doctors: [doctor]});
    } else {
      acc[index].doctors.push(doctor);
    }
    return acc;
  }, []);
  const [hoverStates, setHoverStates] = useState(
    sortedDoctors.map(group => group.doctors.map(doctor => false))
  );
  return (
    <div>
   <h1 style={{color:'#008080', display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center" ,marginTop:"20px" }} >Our doctors</h1>
      {sortedDoctors.map((group) => (
        <div key={group.specialization}>
          <h2><p style={{color:'#008080',display: "flex", flexWrap: "wrap", alignItems: "center",  marginTop:"50px"}}>{group.specialization}</p></h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "left", alignItems: "left" }}>
            {group.doctors.map((doctor, index) => (
              <div style={{ flex: 1, maxWidth: "20rem" }} key={doctor._id}>
                <DoctorCard
                  $isHovered={hoverStates[index]}
                  onMouseOver={() => {
                    const newHoverStates = [...hoverStates];
                    newHoverStates[index] = true;
                    setHoverStates(newHoverStates);
                    setDoctor(doctor);
                  }}
                  onMouseLeave={() => {
                    const newHoverStates = [...hoverStates];
                    newHoverStates[index] = false;
                    setHoverStates(newHoverStates);
                    setDoctor(null);
                  }}
                >
                  {!hoverStates[index]? (
                    <React.Fragment>
                      <center>
                        <img src={image} alt="" />
                      </center>

                      <Card.Body>
                        <center>
                          <div key={doctor._id}>
                            <Card.Title>nom et prenom:</Card.Title>
                            {doctor.firstname} {doctor.lastname}
                            <Card.Subtitle>specialite:</Card.Subtitle>
                            {doctor.specialization}
                          </div>
                        </center>
                      </Card.Body>
                    </React.Fragment>
                  ) : (
                    <div>
                      <React.Fragment>
                        <Card.Body style={{ transform: "rotateY(180deg)" }}>
                          <div key={doctor._id}>
                            <Card.Title>
                              Nom et Prenom:{doctor.firstname} {doctor.lastname}
                            </Card.Title>
                            <Card.Subtitle>
                              Spécialité : {doctor.specialization}
                            </Card.Subtitle>
                            <Card.Text>
                              <b>Adresse:{doctor.adress}</b>
                            </Card.Text>
                            <Card.Text>
                              <b>Téléphone</b>
                            </Card.Text>
                            <Card.Text>
                              <b>Site Web</b>
                            </Card.Text>
                            <Card.Text>
                              <b>Honoraires par consultation</b>
                            </Card.Text>
                          </div>

                          <MainButton href={`/Appointment/${doctor._id}`}>
                            Get An Appointement
                          </MainButton>
                        </Card.Body>
                      </React.Fragment>
                    </div>
                  )}
                </DoctorCard>
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
    
  );
};
export default Doctor;