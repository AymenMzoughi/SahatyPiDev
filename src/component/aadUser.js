import axios from "../axios";
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
    const [users, setUsers] = useState([]);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [mail, setMail] = useState('');
    const [numero, setNumero] = useState('');
    const [password, setPassword] = useState('');
    const [pdp, setPdp] = useState(null); // changed initial state to null
    const [docVerif, setDocVerif] = useState([]); 

    const handleSubmitUser = async (event) => {
      event.preventDefault();
  const formData = new FormData();
  formData.append('nom', nom);
  formData.append('prenom', prenom);
  formData.append('mail', mail);
  formData.append('numero', numero);
  formData.append('password', password);
  formData.append('pdp', pdp);

  for (let i = 0; i < docVerif.length; i++) {
    formData.append('docVerif', docVerif[i]);
  }
  
      try {
        const response = await axios.post('http://localhost:3000/user/addUser', formData);
        console.log(response);
        // faire quelque chose en cas de succès
        const usersData = await axios.get('/user/showUser');
        setUsers(usersData.data);
        setPdp(null);
        setNom('');
        setPrenom('');
        setMail('');
        setNumero('');
        setPassword('');
        setDocVerif([]);
      } catch (error) {
        console.log(error);
        // faire quelque chose en cas d'erreur
      }
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setPdp(file); // Ajouter le fichier directement à l'état
      }
    };
    
    
    const handlePdfChange = (event) => {
      event.preventDefault();
      const files = event.target.files;
      const newPdfs = [...docVerif];
      for (let i = 0; i < files.length; i++) {
        newPdfs.push(files[i]);
      }
      setDocVerif(newPdfs);
      console.log(docVerif);
    };
    
    const handleDelete = (index) => {
      const newDocVerif = [...docVerif];
      newDocVerif.splice(index, 1);
      setDocVerif(newDocVerif);
    };
    

     


  
      

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
    <Header title="CREATE USER" subtitle="Create a New User Profile" />
   
 <label htmlFor="profilePhoto">
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: 'none' }}
               onChange={handleFileChange}

            />
             {pdp ? (
    <Avatar src={URL.createObjectURL(pdp)}
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
            id="nom"
            label="Nom"
            variant="outlined"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            required
          />
          <TextField
            id="prenom"
            label="Prénom"
            variant="outlined"
            value={prenom}
            onChange={(event) => setPrenom(event.target.value)}
            required
          />
          <TextField
            id="mail"
            label="E-mail"
            variant="outlined"
            value={mail}
            onChange={(event) => setMail(event.target.value)}
            required
          />
          <TextField
            id="numero"
            label="Numéro"
            variant="outlined"
            value={numero}
            onChange={(event) => setNumero(event.target.value)}
            required
          />
          <TextField
            id="password"
            label="Mot de passe"
            variant="outlined"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
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
  {docVerif.length === 0 ? (
    <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
      <FaExclamationTriangle style={{ marginRight: '10px' }} />
      No file selected
    </Typography>
  ) : (
    <List dense={false}>
      {docVerif.map((file, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <FaFilePdf />
          </ListItemIcon>
          <ListItemText primary={file.name} />
          <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(index)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
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
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email("invalid email"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    ,
    password: yup.string(),
  
});
const initialValues = {

};


export default AddUser;