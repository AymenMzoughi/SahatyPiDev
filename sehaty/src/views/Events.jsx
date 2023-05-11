import React, { useEffect, useState } from "react";
import Event from "../components/Event";
import axios from "axios";
import AddEventForm from "../components/AddEventForm";
const Events = () => {
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    const response = await axios.get(
      "http://localhost:5000/events/getAllEvents"
    );
    console.log(response);
    // const data = await response.json();
    setEvents(response.data);
    console.log(events);
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div>
      {events &&
        events.map((event) => (
          <Event key={events.indexOf(event)} event={event} />
          
        ))}
    </div>
  );
};

export default Events;
