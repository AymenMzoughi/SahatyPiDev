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
              <Card.Title>{props.doctor}</Card.Title>
              <Card.Subtitle>Generaliste</Card.Subtitle>
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
            <center>
              <Card.Title>{props.doctor}</Card.Title>
              <Card.Subtitle>Generaliste</Card.Subtitle>
              <Card.Text>
                <b>Adresse</b> : Rue taieb mhiri 22 7111
              </Card.Text>
              <Card.Text>
                <b>Telephone</b> : 99999999
              </Card.Text>
              <Card.Text>
                <b>Email</b> : test.test@gmail.com
              </Card.Text>
              <MainButton>Set Appointment</MainButton>
            </center>
          </Card.Body>
        </React.Fragment>
      )}
    </DoctorCard>
  );
};

export default Doctor;
