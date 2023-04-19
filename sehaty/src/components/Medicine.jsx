import { Button, Card, Col, Row } from "react-bootstrap";
import photo from "../assets/med.jpg";
//import { Rating } from "@mui/material";
const Medicine = (props) => {
  return (
    <Card style={{ margin: "12px" }}>
      <Card.Img height="150px" src={photo} />
      <Card.Body style={{ display: "flex" }}>
        <Row>
          <Col sm={12} md={8}>
            <Card.Title>{props.medicine.name}</Card.Title>
            <Card.Text>{props.medicine.description}</Card.Text>
          </Col>
          <Col sm={12} md={4}>
            {/* <Rating max={5} defaultValue={props.medicine.rating} /> */}
            <p>Rating here</p>
            <Button>Order</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Medicine;
