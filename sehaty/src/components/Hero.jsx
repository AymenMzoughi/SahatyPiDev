import heroImage from "../assets/hero.png";
import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { HeroTitle, MainButton } from "./StyledComponents";
//import { TypeAnimation } from "react-type-animation";

function Hero() {
  const titles = [
    "We are providing a great range of <span>health services</span>",
    "Online consultations ,<span>Digital </span>medical records and more",
    "<span>The leading</span> online Healthcare service in Tunisia ",
  ];
  const [displayedText, setDisplayedText] = useState("");
  const [currentTitle, setCurrentTitle] = useState(titles[0]);
  const [textIndex, setTextIndex] = useState(1);
  const handleTitle = (index) => {
    let next = index + 1;
    if (next === 3) next = 0;
    // setTextIndex(0);
    // while (textIndex < currentTitle.length - 1) {

    // }
    setTimeout(() => {
      setCurrentTitle(titles[next]);
    }, 2000);
  };
  const handleDisplayedText = () => {
    if (displayedText.length === currentTitle.length) {
      setTextIndex(1);
      handleTitle(titles.indexOf(currentTitle));
    } else
      setTimeout(() => {
        setTextIndex((prev) => prev + 1);
        setDisplayedText(currentTitle.slice(0, textIndex));
      }, 50);
  };
  useEffect(() => {
    handleDisplayedText();
  }, [displayedText, currentTitle]);

  // useEffect(() => {

  // }, [displayedText]);

  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <Container
            style={{
              height: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* <TypeAnimation
            sequence={[
              titles[0], // Types 'One'
              1000, // Waits 1s
              titles[1], // Deletes 'One' and types 'Two'
              1000,
              titles[2],
              1000, // Waits 2s
              // 'Two Three', // Types 'Three' without deleting 'Two'
              () => {
                // Place optional callbacks anywhere in the array
                //console.log(titles[titles.indexOf(nextTitle) + 1]); // Place optional callbacks anywhere in the array
              },
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            className="title"
            style={{ height: "max-content" }}
          /> */}
            <HeroTitle
              className="title text-sm text-lg"
              dangerouslySetInnerHTML={{ __html: displayedText }}
            ></HeroTitle>
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
                nesciunt ratione dicta ad ipsum possimus repellat architecto
                facilis sequi, officiis illo ipsa ab labore laborum porro nisi
                vel iste. Molestiae!
              </p>

              <MainButton>Explore more</MainButton>
            </div>
          </Container>
        </Col>
        <Col xs={12} md={6}>
          <Container>
            <Image src={heroImage} alt="" width="100%" />
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Hero;
