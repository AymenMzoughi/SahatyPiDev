import React from "react";
import { Container, Row, Col, Image, Carousel } from "react-bootstrap";
import img from "../assets/hero.png";
import { MainButton } from "./StyledComponents";
import { useSelector } from "react-redux";
import { useState } from "react";
import image1 from "../assets/event1.jpg";
import image2 from "../assets/event2.jpg";
import image3 from "../assets/event3.jpg";
import image4 from "../assets/event4.jpg";
import image5 from "../assets/event5.jpg";
import image6 from "../assets/event6.jpg";
const Event = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id || null;
  const images = [image1, image2, image3, image4, image5, image6];
  const [error, setError] = useState("");
  const eventId = props.event._id;
  const handleParticipation = async () => {
    user.events.indexOf(eventId)

    
    var response = null;

    if (user.events.indexOf(eventId)
    )
      response = await fetch(
        `http://localhost:5000/events/cancelParticipation/${eventId}/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    else
      response = await fetch(
        `http://localhost:5000/events/participate/${eventId}/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    const data = await response.json();

    if (response.ok) {
    } else {
      setError(data);
      console.log(error);
    }
  };
  return (
    <Container>
      <Row className="mt-4">
        <Col md={12}>
          <Carousel>
            {images.map((image) => (
              <Carousel.Item className="h-80" key={images.indexOf(image)}>
                <Image className="w-full object-cover" src={image} />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row className="m-4">
        <Col xs={6}>
          <h2>{props.event.title}</h2>
          <p>{props.event.description}</p>

          <MainButton onClick={handleParticipation}>
            {user && user.events.indexOf(eventId) ? "Cancel Participation" : "Participate"}
          </MainButton>
        </Col>
        <Col xs={6}>
          <div className="flex  justify-around items-center">
            <div>
              <h5>{props.event.place}</h5>
              {/* <h5>Participants: {props.event.participants.length}</h5> */}
            </div>
            <div className="rounded-lg border-2 border-black flex flex-col justify-center items-end">
              <div className="bg-red-600 text-white py-2 px-4 rounded-t-lg">
                <div className="text-md font-bold uppercase">
                  {new Date(props.event.date)
                    .toLocaleDateString("default", {
                      month: "long",
                    })
                    .slice(0, 3)}
                </div>
              </div>
              <div class="bg-white text-black py-2 px-4 rounded-b-lg">
                <div className="text-4xl font-bold">
                  {new Date(props.event.date).toLocaleDateString("default", {
                    day: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Event;
