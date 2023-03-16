import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/appointment.png";
import projImg2 from "../assets/img/f37d526d5dd4d797f8ab31ebd1cfda85.jpg";
import projImg3 from "../assets/img/4f7110135c2c508619d7a81214144657.jpg";
import projImg4 from "../assets/img/0b675c419be056f60e923c7fa751ec82.jpg";
import projImg5 from "../assets/img/5e92f995c031aae80dda1afdbc09cada.jpg";
import projImg6 from "../assets/img/8a87d7b8ff5cd08d336dcc26932d3fe0.jpg";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

const Projects = ()=> {

  const projects = [
    {
      title: "Appointment management",
      imgUrl: projImg1,
    },
    {
      title: "Health guide management",
      imgUrl: projImg2,
    },
    {
      title: "Pharmacy management",
      imgUrl: projImg3,
    },
    {
      title: "Medical Record management ",
      imgUrl: projImg4,
    },
    {
      title: "Claim management",
      imgUrl: projImg5,
    },
    {
      title: "Event Management ",
      imgUrl: projImg6,
    },
  ];

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col size={1}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <Tab.Container id="projects" defaultActiveKey="first">
                  <Nav  className="nav-pills mb-3 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="last">Tab 2</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projects.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                      </Row>
                    </Tab.Pane>
                   
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
export default Projects;

