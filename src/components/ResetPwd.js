import React, { useState } from 'react';
import axios from "../axios";
import { Link } from "react-router-dom";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const ResetPassword= ()=> {
  return (
    <Typography variant="body2" color="text.secondary" align="center" >
      {'E-SANTE © '}
      <Link color="inherit" href="http://localhost:3001/">
        Sehaty ❤️❤️
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {

    const [mail, setMail] = useState('');
   

    const [users, setUsers] = useState([]);
    const navigate =useNavigate();
        const [resetToken, setResetToken] = useState('');
        const [password, setPassword] = useState('');
        const [message, setMessage] = useState('');
      
        const handleReset = async (e) => {
          e.preventDefault();
      
          try {
            const response = await axios.post('http://localhost:3000/user/reset-password', { resetToken, password });
      
            console.log(response.data);
            setMessage(response.data.message);
            navigate(`/signin`);

          } catch (error) {
            console.log(error.response.data);
            setMessage(error.response.data.message);
          }
        };
        



  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://static.vecteezy.com/ti/vecteur-libre/p1/1987589-abstrait-bleu-hexagone-motif-fond-medical-et-science-concept-et-soins-de-sante-modele-que-vous-pouvez-utiliser-pour-affiche-modele-entreprise-presentation-gratuit-vectoriel.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box component="form"  onSubmit={handleReset} sx={{ mt: 1 }}>
            <TextField 
                    margin="normal"
                    required
                    fullWidth
                    id="resetToken"
                    label="resetToken"
                    name="resetToken"
                    autoComplete="resetToken"
                    autoFocus                
                    placeholder="Enter your Code" 
                    type="resetToken"
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}                    />
            <TextField 
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="password"
                    name="password"
                    autoComplete="password"
                    autoFocus                
                    placeholder="Enter your password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Verified with email 
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link  variant="body2" to={"/forget"}>
                    Forget Password
                  </Link>
                </Grid>
                <Grid item>
                 
                </Grid>
              </Grid>
              <ResetPassword sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
