import { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { MainButton } from "../components/StyledComponents";
function AddEventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Images:", images);

    try {
      const response = await axios.post(
        "http://localhost:5000/events/addEvent",
        { place, date, description, images, title }
      );
      console.log(response.data);
      // handle successful form submission here
    } catch (error) {
      console.log(error);
      // handle form submission error here
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    let imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      imagesArray.push(files[i]);
    }
    setImages(imagesArray);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPlace">
        <Form.Label>Place</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter place"
          value={place}
          onChange={(event) => setPlace(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formImages">
        <Form.Label>Images</Form.Label>
        <Form.Control type="file" multiple onChange={handleImageChange} />
      </Form.Group>

      <MainButton variant="primary" type="submit">
        Create Event
      </MainButton>
    </Form>
  );
}

export default AddEventForm;
