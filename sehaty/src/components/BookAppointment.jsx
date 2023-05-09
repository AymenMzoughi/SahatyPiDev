import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CardGroup, Form, FloatingLabel, Col, Card, Image, Tabs, Tab } from 'react-bootstrap';
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import img from '../assets/book-app-banner-1.jpg'
const Appointment = () => {
  const path = window.location.pathname;
    const parts = path.split("/");
    const doctorId=parts[parts.length - 1]
    console.log(doctorId)
    const [doctorList, setDoctorList] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();

  const [value, setValue] = useState();
  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

const [appointment, setAppointment] = useState({
    doctorId:doctorId,
    userId: userId,
    type: "",
    date: "",
    time: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(appointment)
      const response = await axios.post("http://localhost:5000/appointment/bookAppointment", appointment);
      console.log(response.data.message);
      alert(response.data.message);
      window.location.reload()
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleInputChangee = (event) => {
    const { name, value } = event.target;
    setAppointment({ ...appointment, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
    <Card >
      <Card.Img variant="top" src={img} />
      <Card.Body className="mx-auto d-block" >

        <Form.Select name="type" value={appointment.type} onChange={handleInputChangee}  style={{ marginLeft: '110px', marginTop: '50px', width: '30rem' }}  >
          <option>Appointement Method</option>
          <option value="online">Online</option>
          <option value="faceToFace">Face to Face</option>
        </Form.Select>
        <label htmlFor="time" className='text-info'><h2>Time</h2></label>
          <input   style={{ marginLeft: '45px', marginTop: '50px', width: '30rem' }}
            type="time"
            id="time"
            name="time"
            value={appointment.time}
            onChange={handleInputChange}
          />
         <br>
         </br>
          <label htmlFor="date" className='text-info'><h2>Date</h2></label>
          <input   style={{ marginLeft: '45px', marginTop: '50px', width: '30rem' }}
            type="date"
            id="date"
            name="date"
            value={appointment.date}
            onChange={handleInputChange}
          />  

      </Card.Body>
      <button  style={{marginTop: '50px'}} type="submit" c   >Book Appointement</button>
    </Card>
    </Form>

  );
};

export default Appointment;
