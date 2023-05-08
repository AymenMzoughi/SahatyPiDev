import { Card } from "react-bootstrap";
import image from "../assets/test.png";
import { DoctorCard, MainButton } from "./StyledComponents";
import React, { useState } from "react";
const Doctor = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <DoctorCard
      $isHovered={isHovered}
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered ? (
        <React.Fragment>
          <center>
            <img src={image} alt=""></img>
          </center>
          <Card.Body>
            <center>
              <Card.Title>
                {props.doctor.firstName + " " + props.doctor.lastName}{" "}
              </Card.Title>
              <Card.Subtitle>{props.doctor.specialization}</Card.Subtitle>
              {/* <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit,
            perferendis? Excepturi quas
          </Card.Text> */}
            </center>
          </Card.Body>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Card.Body style={{ transform: "rotateY(180deg) " }}>
            <Card.Title>
              {props.doctor.firstName + " " + props.doctor.lastName}
            </Card.Title>
            <Card.Subtitle>{props.doctor.specialization}</Card.Subtitle>
            <Card.Text>
              <b>Adresse</b> : {props.doctor.address}
            </Card.Text>
            <Card.Text>
              <b>Telephone</b> : {props.doctor.phoneNumber}
            </Card.Text>
            <Card.Text>
              <b>Website</b> : {props.doctor.website}
            </Card.Text>
            <Card.Text>
              <b>feePerConsultation</b> : {props.doctor.feePerConsultation}
            </Card.Text>
            <MainButton>Set Appointment</MainButton>
          </Card.Body>
        </React.Fragment>
      )}
    </DoctorCard>
  );
};

export default Doctor;
