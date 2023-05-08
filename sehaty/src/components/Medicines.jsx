import Medicine from "./Medicine";
import { Section, HeroTitle } from "./StyledComponents";
import { Row, Col } from "react-bootstrap";
import { MainButton } from "./StyledComponents";
const Medicines = () => {
  const medicines = [
    {
      name: "Metformin",
      description: "lorem ipsum dolor sit amet dwe off the table",
      rating: 4,
    },
    {
      name: "Antibiotics",
      description: "lorem ipsum dolor sit amet dwe off the table",
      rating: 4,
    },
    {
      name: "Iosartan",
      description: "lorem ipsum dolor sit amet dwe off the table",
      rating: 3,
    },
    {
      name: "Albuterol",
      description: "lorem ipsum dolor sit amet dwe off the table",
      rating: 4,
    },
    {
      name: "Antihistamines",
      description: "lorem ipsum dolor sit amet dwe off the table",
      rating: 5,
    },
    {
      name: "Gabapentin",
      description: "lorem ipsum dolor sit amet dwe off the table",
      rating: 3,
    },
  ];
  return (
    <Section>
      <Row>
        <Col xs={12} lg={6}>
          <HeroTitle style={{ height: "auto" }}>
            Medicine for your solution
          </HeroTitle>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dolore
            eos repellat delectus ducimus eligendi voluptates provident vero.
          </p>
        </Col>
      </Row>
      <Row style={{ justifyContent: "center" }}>
        {medicines.map((medicine) => (
          <Col key={medicines.indexOf(medicine)} xs={12} sm={6} md={4}>
            <Medicine medicine={medicine} />
          </Col>
        ))}
      </Row>
      <Row style={{ justifyContent: "center" }}>
        <center>
          <MainButton>View all</MainButton>
        </center>
      </Row>
    </Section>
  );
};

export default Medicines;
