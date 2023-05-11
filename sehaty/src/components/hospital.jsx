import React, { useState, useEffect } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from "formik";
import Header from "./Header";
import {  DialogActions } from '@mui/material';
import {  Send } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { DataGrid } from "@mui/x-data-grid";

const HospitalComponent = () => {
  const [hospitals, setHospitals] = useState([]);
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    // Fetch all hospitals on component mount
    fetch('http://localhost:5000/hospital')
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
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    // { field: 'latitude', headerName: 'Latitude', flex: 1 },
    // { field: 'longitude', headerName: 'Longitude', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => (
        <>
          <Box sx={{ mx: 1 }}>
          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteHospital(row._id)}>
          <DeleteIcon />
          </IconButton>
        </Box>
        </>
      ),
    },


  ];
  return (

    <Box m="60px">
    <Box
display="flex"
alignItems="center"
justifyContent="center"
flexDirection="column"
marginBottom="30px"
letterSpacing='6px'
>
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '60%' }}>
  <Header  subtitle="Add a New Hospital" />
  <DialogActions sx={{ px: '19px' }}>
        <Button type="submit" variant="contained" endIcon={<Send />} onClick={handleCreateHospital} >
          Add
        </Button>
        </DialogActions>
        </div>
        </Box>
        <Formik>
        <form onSubmit={handleCreateHospital}>
        <Box
  display="grid"
  gridTemplateColumns="repeat(3, 1fr)"
  gap="30px"
  alignItems="center"
  justifyContent="center"
  height="10vh"
>
  <TextField
    id="name"
    label="Name"
    variant="outlined"
    value={name}
    onChange={(event) => setName(event.target.value)}
    required
  />
  <TextField
    id="title"
    label="Latitude"
    variant="outlined"
    value={latitude}
    onChange={(event) => setLatitude(event.target.value)}
    required
  />
  <TextField
    id="longitude"
    label="Longitude"
    variant="outlined"
    value={longitude}
    onChange={(event) => setLongitude(event.target.value)}
    required
  />
</Box>
    
</form>
</Formik>
<Header  title="Hospital List" />
<Box sx={{ height:600 , width: '90%' }}>
    <DataGrid
  rows={hospitals}
  columns={columns}
  pageSize={5}
  rowsPerPageOptions={[5, 5, 5]}
  disableSelectionOnClick
  getRowId={(row) => row._id}
  sx={{ columnGap: '0px' }}
  columnBuffer={10} // <-- augmenter la valeur de columnBuffer
/>
    </Box>

</Box>
    // <div>
    //   <h1>Hospitals</h1>
    //   <form>
    //     <label>
    //       Name:
    //       <input type="text" value={name} onChange={e => setName(e.target.value)} />
    //     </label>
    //     <label>
    //       Latitude:
    //       <input type="text" value={latitude} onChange={e => setLatitude(e.target.value)} />
    //     </label>
    //     <label>
    //       Longitude:
    //       <input type="text" value={longitude} onChange={e => setLongitude(e.target.value)} />
    //     </label>
    //     <button type="button" onClick={handleCreateHospital}>Create Hospital</button>
    //   </form>
    //   <ul>
    //     {hospitals.map(hospital => (
    //       <li key={hospital._id}>
    //         {hospital.name} ({hospital.location.latitude}, {hospital.location.longitude})
    //         <button type="button" onClick={() => handleDeleteHospital(hospital._id)}>Delete</button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default HospitalComponent;
