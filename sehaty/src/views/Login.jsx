import { Box, Button, TextField, Typography} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthActions } from '../slices/connectSlice';

 // test



const Login = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const [inputs, setInputs] = useState({
      
        
        mail: "",
        password: ""

    });
   
    const [responseMessage, setResponseMessage]  = useState('');
      const handleChange= (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

      };
      const login = async (mail, password) => {
        try {
          const response = await axios.post("http://localhost:5000/user/login", { mail: inputs.mail, password: inputs.password });
          const token = response.data.user.token;
          console.log(token);
          localStorage.setItem("token", token);
          console.log("ls", localStorage)
          history('/Claim')
          dispatch(AuthActions.login(token));
          
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
                name="mail"

                      onChange={handleChange}
                type={"mail"}
                 value={inputs.mail}
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
                <Button className="button button1" onClick={login}
                sx={{ marginTop:3 , borderRadius:3}}
                variant="contained" color='warning'

                 >
                    Login
                </Button>
             <a href='/signup' onClick={(e)=>e.defaultPrevented()}> change To Signup </a>
             
                
            </Box>


        </form>
       
        {responseMessage && <h1>{responseMessage}</h1>}
<p className='forgot-password text-right '>
  <Link to={'/forgetpassword'}>Forgot password?</Link>
</p>
    </div>
  

  );
};


export default Login;