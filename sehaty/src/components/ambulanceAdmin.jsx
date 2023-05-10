import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { Formik } from "formik";
import Header from "./Header";
import {  DialogActions } from '@mui/material';
import {  Send } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
const AmbulanceServiceA = () => {
    const [ambulances, setAmbulances] = useState([]);
    const [newAmbulanceName, setNewAmbulanceName] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("danger");
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospitalId, setSelectedHospitalId] = useState(null);

    useEffect(() => {
        getAmbulances();
        getHospitals(); // Call getHospitals to fetch hospitals data
    }, []);

    const getAmbulances = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Ambulance");
            setAmbulances(response.data.ambulances);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const getHospitals = async () => {
        try {
            const response = await axios.get("http://localhost:5000/Hospital");
            const fetchedHospitals = response.data;
            setHospitals(fetchedHospitals);
            console.log(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddAmbulance = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/Ambulance/add",
                {
                    name: newAmbulanceName,
                }
            );
            console.log(response);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:5000/Ambulance/deleteAmb/${id}`);
        console.log(id);
        // Remove the deleted user from the users array
        const newAmbulance = ambulances.filter(ambulance => ambulance._id !== id);
        setAmbulances(newAmbulance);
      } catch (error) {
        console.error(error);
      }
    };

   

  const affectAmbulance = async (selectedHospitalId, selectedAmbulanceId) => {
    // Ask for password confirmation
const password = window.prompt("Please confirm your password:");
if (!password) {
  return;
}
console.log(password)
// Verify password on the backside
try {
  const response = await axios.post("http://localhost:5000/Ambulance/verifyPassword", {
    adminId: "6445b6434c9e89464f0ebd23",
    password: password,
  });
console.log(response.data)
  if (response.data) {
    // Password is correct, proceed to affect ambulance to hospital
    const response = await axios.put(
      `http://localhost:5000/Ambulance/assignToHospital/${selectedAmbulanceId}/${selectedHospitalId}`
    );

    // Show success alert
    setAlertMessage("Ambulance affected to hospital");
    setAlertVariant("success");
    setShowAlert(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    // Password is incorrect, show error alert
    setAlertMessage("Incorrect password");
    setAlertVariant("danger");
    setShowAlert(true);
  }
} catch (error) {
  console.error(error);
}

};

const columns = [
  { field: 'name', headerName: 'Name', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    sortable: false,
    renderCell: ({ row }) => (
      <>
      <Box>
      <Autocomplete
  options={hospitals}
  getOptionLabel={(option) => option.name}
  renderInput={(params) => <TextField {...params} label="Select Hospital" variant="outlined" />}
  onChange={(event, newValue) => {
    setSelectedHospitalId(newValue._id);
  }}
/>
      </Box>
            <Box sx={{ mx: 1 }}>
          <IconButton edge="end" aria-label="affect" onClick={()=>affectAmbulance(getAmbulances._id,selectedHospitalId)}>
            <AddIcon />
            </IconButton>
          </Box>
        <Box sx={{ mx: 1 }}>
          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(row._id)}>
          <DeleteIcon />
          </IconButton>
        </Box>
        <Box>
        {showAlert && (
             <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
               {alertMessage}
             </Alert>
           )}
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
    <Header  subtitle="Add a New Ambulance" />
    <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />} onClick={handleAddAmbulance} >
            Add
          </Button>
          </DialogActions>
          </div>
          </Box>
          <Formik>
          <form onSubmit={handleAddAmbulance}>

          <Box
    display="grid"
    gridTemplateColumns="300px "
    gap="30px"
    alignItems="center"
      justifyContent="center"
      height="10vh"
  >
     <TextField
            id="title"
            label="Ambulance Name"
            variant="outlined"
            value={newAmbulanceName}
            onChange={(event) => setNewAmbulanceName(event.target.value)}
            required
          />
          </Box>      
</form>
</Formik>
<Header  title="Ambulance List" />
<Box sx={{ height:600 , width: '100%' }}>
    <DataGrid
  rows={ambulances}
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

         
      
  //         {/* Ambulance list */}
  //         <h2>Ambulance List</h2>
  //         <ul>
  //           {ambulances.map((ambulance) => (
  //             <li key={ambulance._id}>
  //               {ambulance._id} - Name: {ambulance.name} - Latitude: {ambulance.latitude} - Longitude:{ambulance.longitude}
  //               <select
  //           value={selectedHospitalId}
  //           onChange={(e) => setSelectedHospitalId(e.target.value)}
  //         >
  //           <option value="">Select Hospital</option>
  //           {hospitals.map((hospital) => (
  //             <option key={hospital._id} value={hospital._id}>
  //               {hospital.name}
  //             </option>
  //           ))}
  //         </select>
  //         <button onClick={() => affectAmbulance(ambulance._id,selectedHospitalId)}>
  //           Affect
  //         </button>

  //       </li>
  //     ))}
  //      {/* Alert */}
  //      
  //   </ul>
  // </div>
);
              }          
export default AmbulanceServiceA;