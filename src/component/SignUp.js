import axios from "../axios";
import React, { useState } from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FaFilePdf } from 'react-icons/fa';
import DeleteIcon from '@mui/icons-material/Delete';
import {DialogActions,List,ListItem,ListItemIcon,ListItemText, IconButton, Box,Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FaExclamationTriangle } from 'react-icons/fa';
import LoginIcon from '@mui/icons-material/Login';


const Signup = () => {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 10 }
    const marginTop = { marginTop: 5 }
    

    const [users, setUsers] = useState([]);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [mail, setMail] = useState('');
    const [numero, setNumero] = useState('');
    const [password, setPassword] = useState('');
    const [pdp, setPdp] = useState(null); // changed initial state to null
    const [docVerif, setDocVerif] = useState([]); 
    const [confirmPassword,setConfirmPassword]=useState('');
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
        <Grid>
          <Paper elevation={20} style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', backgroundColor: '#fff' }}>
            <Box sx={{ backgroundColor: '#2196f3', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IconButton sx={{ bgcolor: '#1877f2', mr: 1 }}>
                <FacebookIcon  />
              </IconButton>
              <IconButton >
                <GoogleIcon  />
              </IconButton>
              <IconButton >
                <LinkedInIcon/>
              </IconButton>
            </Box>
            <Grid align='center'>
              <label htmlFor="profilePhoto">
                <input
                  accept="image/*"
                  id="profilePhoto"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {pdp ? (
                  <Avatar src={URL.createObjectURL(pdp)} style={{ width: '120px', height: '120px', cursor: 'pointer' }} />
                ) : (
                  <Avatar style={{ width: '75px', height: '75px', cursor: 'pointer' }} />
                )}
              </label>
              <h2 style={{ color: '#2196f3', margin: '10px 0' }}>Sign Up</h2>
              <Typography variant='caption' gutterBottom style={{ color: '#a5a5a5' }}>Please fill this form to create an account!</Typography>
            </Grid>
            <form style={{ marginTop: '20px' }}>
              <TextField fullWidth label='First Name' placeholder="Enter your First name" 
              id="nom"
              value={nom}
              onChange={(event) => setNom(event.target.value)}
              required
              />
              <TextField fullWidth label='Last Name' placeholder="Enter your Last name" 
              id="prenom"
              value={prenom}
              onChange={(event) => setPrenom(event.target.value)}
              required
              />
              <TextField fullWidth label='Email' placeholder="Enter your email" 
              id="mail"
              value={mail}
              onChange={(event) => setMail(event.target.value)}
              required
              />
              <FormControl component="fieldset" style={{ marginTop: '20px' }}>
                <FormLabel component="legend" style={{ color: '#a5a5a5' }}>Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                  <FormControlLabel value="female" control={<Radio color="primary" />} label="Female" />
                  <FormControlLabel value="male" control={<Radio color="primary" />} label="Male" />
                </RadioGroup>
              </FormControl>
              <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" 
                id="numero"
                value={numero}
                onChange={(event) => setNumero(event.target.value)}
                required
                    />
                    <TextField 
                      fullWidth 
                      label='Password' 
                      placeholder="Enter your password" 
                      id="password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    />

<TextField 
  fullWidth 
  label='Confirm Password' 
  placeholder="Confirm your password" 
  type="password"
  value={confirmPassword}
  onChange={(event) => setConfirmPassword(event.target.value)}
  error={confirmPassword !== '' && confirmPassword !== password}
  helperText={confirmPassword !== '' && confirmPassword !== password ? 'Passwords do not match' : ''}
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
<FormControlLabel
  control={<Checkbox name="checked" color="primary" />}
  label="Accept all terms and conditions."
/>
<Button
  type="submit"
  variant="contained"
  endIcon={<LoginIcon/>}
  onClick={handleSubmitUser}
  color='primary'
  style={{ backgroundColor: '#2196f3' }}
>
  Sign up
</Button>

            </form>
          </Paper>
        </Grid>
      );
}      

export default Signup;