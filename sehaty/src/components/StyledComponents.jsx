import styled from "styled-components";
import { Button, Card, Container } from "react-bootstrap";

export const MainButton = styled(Button)`
  background-color: #16c0d7;
  border-radius: 24px;
  width: 200px;
  margin-bottom: 10px
  max-height: 40px;
`;

export const ProfileButton = styled(Button)`
  background-color: #16c0d7;
  border-radius: 24px;
  font-weight: bold;
  padding: 12px 24px;
  width: max-content;
  max-height: 50px;
`;

export const Loginbutton = styled(Button)`
  background-color: #16c0d7;
  border-radius: 24px;
  font-weight: bold;
  padding: 12px 24px;
  width: max-content;
  max-height: 50px;
`;

export const HeroTitle = styled.h1`
  font-weight: bold;
  color: black;
  display: block;
  span {
    color: #16c0d7;
  }
`;
export const Section = styled(Container)`
  margin: 10vh auto;
  min-height: 80vh;
`;
export const DoctorCard = styled(Card)`
  img {
    height: 128px;
    width: 128px;
    object-fit: cover;
    border-radius: 100%;
  }
  * {
    margin-bottom: 8px;
  }
  height: 300px;
  cursor: pointer;
  border-width: 1px;
  margin: 12px;
  transition: all 0.5s ease-in-out;
  transform-style: preserve-3d;
  justify-content: center;
  box-shadow: ${(props) =>
    props.$isHovered
      ? "8px 8px 8px rgba(0, 0, 144, 0.2)"
      : "8px 8px 8px rgba(122, 122, 122, 0.1)"};
  border: ${(props) => (props.$isHovered ? "1px solid #16c0d7" : "")};
  transform: ${(props) =>
    props.$isHovered ? "rotateY(180deg) scale(1.1) " : ""};
  z-index: ${(props) => (props.$isHovered ? 1 : 0.5)};
`;
export const AppointmentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .form {
    position: absolute;
    top: 32px;
    left: 0;
    z-index: 10;
    border-radius: 24px;
    border: 1px solid gray;
    box-shadow: 8px 8px 8px rgba(100, 100, 100, 0.2);
    padding: 24px;
    width: 60%;
    //min-height: 80%;
    background: white;
  }
  .image {
    position: absolute;
    top: 0;
    right: 0;
    max-height: 370px;
    border-radius: 24px;
    width: 60%;
    z-index: 1;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
export const SearchDiv = styled(Card)`
  form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: max-content;
    align-items: center;
  }
  padding: 24px;
`;
