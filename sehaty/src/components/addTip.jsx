import axios from "axios";
import { makeStyles } from '@mui/styles';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from "formik";
import * as yup from "yup";
import Header from "./Header";
import React, { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import { Avatar, DialogActions, IconButton } from '@mui/material';
import {  Send } from '@mui/icons-material';
import { ListItemText, ListItemIcon, List, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";

import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';



const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: theme.spacing(2),
    },
    input: {
      display: 'none',
    },
  }));

function AddUser(){
    const [tips, setTips] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState(null);
    const [pdf, setPDF] = useState(null);
    const [vid, setVid] = useState(null);

    const location = useLocation();
    const navigate =useNavigate();


    const handleSubmitUser = async (event) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user;
      console.log(userId);
      event.preventDefault();
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('picture', picture);
  formData.append('tippdf', pdf);
  formData.append('video', vid);


      try {
        const response = await axios.post('http://localhost:5000/tip/addtip', formData);
        console.log(response);
        navigate('../ListTip');
        // if(user1){
        //   setNom('user1.nom');
        // }
        // faire quelque chose en cas de succès
      } catch (error) {
        console.log(error);
        // faire quelque chose en cas d'erreur
      }
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setPicture(file); // Ajouter le fichier directement à l'état
      }
    };
    const handlePdfChange = (event) => {
      event.preventDefault();
      const file = event.target.files[0];
      
      setPDF(file);
      console.log(file);
    };
    const handleMp4Change = (event) => {
      event.preventDefault();
      const file = event.target.files[0];
      
      setVid(file);
      console.log(file);
    };
     
    const handleDelete = (index) => {
      const newDocVerif = vid;
      newDocVerif.splice(index, 1);
      setVid(newDocVerif);
    };
    
   
    
    // const handleDelete = (index) => {
    //   const newDocVerif = [...docVerif];
    //   newDocVerif.splice(index, 1);
    //   setDocVerif(newDocVerif);
    // };
    
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
    <Header title="CREATE TIP" subtitle="Create a New Tip" />
   
 <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: 'none' }}
               onChange={handleFileChange}

            />
             {picture ? (
    <Avatar src={URL.createObjectURL(picture)}
      sx={{ width: 75, height: 75, cursor: 'pointer' }}
    />
  ) : (
    <Avatar 
      sx={{ width: 75, height: 75, cursor: 'pointer' }}
    />
  )}
          </label>
          <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />} onClick={handleSubmitUser} >
            Save
          </Button>
          </DialogActions>


          

  </div>
</Box>
      <Formik>
        
          <form onSubmit={handleSubmitUser}>
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
            label="Title"
            variant="outlined"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <TextField
            id="description"
            label="description"
            variant="outlined"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
    />
    <DialogActions>
  <label htmlFor="mp4">
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#626262', padding: '12px 10px', borderRadius: '4px' }}>
      <SmartDisplayIcon style={{ fontSize: '2em', marginRight: '5px' }} />
      <span style={{ fontSize: '1.5em', color: '#333' }}>Video of Tip</span>
    </div>
  </label>
  <input
    id="mp4"
    type="file"
    accept=".mp4"
    multiple
    style={{ display: 'none' }}
    onChange={handleMp4Change}
  />
</DialogActions>

<Box 
  display="flex"
  alignItems="center"
  justifyContent="center"
  flexDirection="column"
  marginBottom="3px"
  letterSpacing="6px"
  sx={{ flexGrow: 1, maxWidth: 1000, height: 0, width: '400%', marginTop: '-150px' }}
>
  {vid===null ? (
    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
      <FaExclamationTriangle style={{ marginRight: '10px' }} />
      No file selected
    </Typography>
  ) : (
    <List dense={false}>
        <ListItem >
          <ListItemIcon>
            <FaFilePdf />
          </ListItemIcon>
          <ListItemText primary={vid.name} />
          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(vid)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      
    </List>
  )}
</Box>

<DialogActions>
  <label htmlFor="pdf">
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#626262', padding: '12px 10px', borderRadius: '4px' }}>
      <FaFilePdf style={{ fontSize: '2em', marginRight: '5px' }} />
      <span style={{ fontSize: '1.5em', color: '#333' }}>verification document</span>
    </div>
  </label>
  <input
    id="pdf"
    type="file"
    accept=".pdf"
    multiple
    style={{ display: 'none' }}
    onChange={handlePdfChange}
  />
</DialogActions>

<Box 
  display="flex"
  alignItems="center"
  justifyContent="center"
  flexDirection="column"
  marginBottom="3px"
  letterSpacing="6px"
  sx={{ flexGrow: 1, maxWidth: 1000, height: 0, width: '400%', marginTop: '-150px' }}
>
  {pdf===null ? (
    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
      <FaExclamationTriangle style={{ marginRight: '10px' }} />
      No file selected
    </Typography>
  ) : (
    <List dense={false}>
        <ListItem >
          <ListItemIcon>
            <FaFilePdf />
          </ListItemIcon>
          <ListItemText primary={pdf.name} />
          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(pdf)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      
    </List>
  )}
</Box>      
        </Box>
        </form>
        </Formik>
      </Box>
  );

}
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string().required("required")
    .matches(phoneRegExp, "Phone number is not valid").required("required")
    ,
    password: yup.string().required("required"),
  
});
const Role = [
  { label: 'Doctor', value: 'doctor' },
  { label: 'Patient', value: 'patient' },
  { label: 'Admin', value: 'admin' },
  { label: 'Pharmacist', value: 'pharmacist' },
];

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};


export default AddUser;