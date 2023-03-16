
import { useLocation } from 'react-router-dom';
import { Avatar, Box, Button, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';

import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/1534214339.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

 const Banner = ()=>{
  const location = useLocation();
  const user = location.state.userToShow;
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Sehaty Medical Doctor "+ `${user.nom} ${user.prenom}` ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h1>{`Welcome To`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Sehaty ]'><span className="wrap">{text}</span></span></h1>
                <Card className="user-profile-card"> {/* ajout de la classe CSS */}
        <CardHeader
          
          title={`${user.nom} ${user.prenom}`}
          subheader={user.mail}
        />
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom>
            Documents :
          </Typography>
          {user.docVerif.map((file, index) => (
            <Box key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <Button variant="contained" color="secondary" size="small" style={{ marginRight: '1rem' }}>
                <a href={`http://localhost:3000/${file}`} download style={{ textDecoration: 'none', color: 'white' }}>
                  {file}
                </a>
              </Button>
            </Box>
          ))}
        </CardContent>
      </Card>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={`http://localhost:3000/${user.pdp}`} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
    

  )
}
export default Banner;

