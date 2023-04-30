import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ButtonGroup, Image } from "react-bootstrap";
// import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import AccountCollapse from "./AccountCollapse";
import { MainButton } from "./StyledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const isConnected = useSelector((state) => state.auth.isLoggedIn);
  console.log(isConnected);
  const navigate = useNavigate();
  const pages = ["Home", "Doctors", "Services", "Contact", "Appointment"];
   isConnected ? (pages[3] = "Claim") : (pages[3] = "Contact");
  
  const activeRoute = useLocation();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <Image height="64" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {pages.map((page) => (
              <Nav.Link
                active={activeRoute.pathname.slice(1) === page}
                key={pages.indexOf(page)}
                href={`/${page}`}
              >
                {page}
              </Nav.Link>
            ))}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <MainButton className="">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </MainButton>
            {!isConnected ? (
              <ButtonGroup>
                <MainButton
                  onClick={() => {
                    navigate("/register");
                  }}
                  style={{ backgroundColor: "darkblue" }}
                >
                  Register
                </MainButton>
                <MainButton
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </MainButton>
              </ButtonGroup>
            ) : (
              <AccountCollapse />
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
