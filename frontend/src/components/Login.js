import { Box, Button, TextField, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthActions } from '../store';
import { GoogleLogin } from 'react-google-login';

 // test



const Login = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [inputs, setInputs] = useState({
    
        
        email: "",
        password: ""

    });
   
    const [responseMessage, setResponseMessage]  = useState('');
      const handleChange= (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

      };
        const login = async (email, password) => {
          try {
            const response = await axios.post("http://localhost:5000/api/login", { email:inputs.email, password:inputs.password });
            console.log(response.data);
           
          } catch (error) {
            console.log(error.response.data.message);
            setResponseMessage(error.response.data.message);

          }
          
        };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        // send http request
       login().then(()=>dispatch(AuthActions.login())).then(() => history("/user"));
    };
    // function onSignIn(googleUser) {
    //   const token = googleUser.getAuthResponse().id_token;
    //   fetch('http://localhost:5000/api/google', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({token})
    //   })
    //   .then(res => res.json())
    //   .then(user => {
    //     console.log(user);
    //     // Handle user data
    //   })
    //   .catch(err => console.error(err));
    // }
    const responseGoogle = async (response) => {
      try {
        // Send a request to your backend server to authenticate the user using the response.id_token
        const res = await axios.get('http://localhost:5000/api/auth/google/callback', {
          idToken: response.tokenId
        });
        // If the authentication is successful, redirect the user to the desired page
        window.location.href = '/dashboard';
      } catch (err) {
        console.error(err);
      }
    }
    
    
  return (
    
    
    <div>
        <form onSubmit={handleSubmit}  >
         
       
            <Box
            marginLeft="auto"
            marginRight="auto"
            width={300}
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center">
                <Typography variant='h2'>Login</Typography>
                
                <TextField 
                name="email"

                      onChange={handleChange}
                type={"email"}
                 value={inputs.email}
                  variant='outlined'
                   placeholder='Email' 
                   margin='normal' />
                <TextField 
                name="password"
                onChange={handleChange}
                type="password" 
                value={inputs.password}
                 variant='outlined'
                  placeholder='Password'
                   margin='normal' />
                <Button class="button button1" onClick={login}
                sx={{ marginTop:3 , borderRadius:3}}
                variant="contained" color='warning'

                 >
                    Login
                </Button>
             <a href='/signup' onClick={(e)=>e.defaultPrevented()}> change To Signup </a>
             
                
            </Box>

            <GoogleLogin
      clientId="195893953884-gqquss79jovigo2kt48qnc8k0d78a58t.apps.googleusercontent.com"
      buttonText="Sign in with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
        </form>
       
        {responseMessage && <h1>{responseMessage}</h1>}
<p className='forgot-password text-right '>
  <Link to={'/forgetpassword'}>Forgot password?</Link>
</p>
    </div>
  

  );
};


export default Login;