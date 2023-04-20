import React, { useState, useEffect } from 'react';

function MyComponent() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    }, []);
  
    return (
      <div>
        Latitude : {latitude}<br />
        Longitude : {longitude}
      </div>
    );
  }
  export default MyComponent;
