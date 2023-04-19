import { Card } from "react-bootstrap";
import logo from "../assets/logo.png";
const Service = (props) => {
  return (
    <Card>
      <Card.Img
        height="128px"
        style={{ objectFit: "contain" }}
        src={logo}
      ></Card.Img>
      <Card.Body>
        <center>
          <Card.Title>{props.service}</Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit,
            perferendis? Excepturi quas
          </Card.Text>
        </center>
      </Card.Body>
    </Card>
  );
};

export default Service;
