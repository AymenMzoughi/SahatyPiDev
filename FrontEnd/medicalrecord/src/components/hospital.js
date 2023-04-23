import React, { useState, useEffect } from 'react';

const HospitalComponent = () => {
  const [hospitals, setHospitals] = useState([]);
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    // Fetch all hospitals on component mount
    fetch('http://localhost:5000/Hospital')
      .then(response => response.json())
      .then(data => setHospitals(data))
      .catch(error => console.error('Error fetching hospitals:', error));
  }, []);

  const handleCreateHospital = () => {
    // Create a new hospital
    fetch('http://localhost:5000/Hospital/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, latitude, longitude })
    })
      .then(response => response.json())
      .then(data => {
        setHospitals([...hospitals, data]);
        setName('');
        setLatitude('');
        setLongitude('');
      })
      .catch(error => console.error('Error creating hospital:', error));
  };

  const handleDeleteHospital = (id) => {
    // Delete a hospital by ID
    fetch(`http://localhost:5000/Hospital/delete/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setHospitals(hospitals.filter(hospital => hospital._id !== id));
        } else {
          console.error('Error deleting hospital:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting hospital:', error));
  };

  return (
    <div>
      <h1>Hospitals</h1>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Latitude:
          <input type="text" value={latitude} onChange={e => setLatitude(e.target.value)} />
        </label>
        <label>
          Longitude:
          <input type="text" value={longitude} onChange={e => setLongitude(e.target.value)} />
        </label>
        <button type="button" onClick={handleCreateHospital}>Create Hospital</button>
      </form>
      <ul>
        {hospitals.map(hospital => (
          <li key={hospital._id}>
            {hospital.name} ({hospital.location.latitude}, {hospital.location.longitude})
            <button type="button" onClick={() => handleDeleteHospital(hospital._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalComponent;
