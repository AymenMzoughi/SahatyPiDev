import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';
import styles from '../styles/Username.module.css';
import axios from 'axios';
import Webcam from "react-webcam";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from 'react-bootstrap';

export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);
  const webcamRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);
  const handleClick = async () => {
    setIsProcessing(true);
    const imageSrc = webcamRef.current.getScreenshot();

    // Envoyer la capture vidéo à Node.js
    const formData = new FormData();
    formData.append("image", imageSrc);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    try {
      const response = await axios.post('/api/compare', formData, config);
      console.log(response.data);
      if (response.data.match) {
        navigate('/dashboard');
      } else {
        setIsProcessing(false);
        alert('Face not found in images');
      }
    } catch (error) {
      setIsProcessing(false);
      console.error(error);
      alert('An error occurred');
    }
  };


  const formik = useFormik({
    initialValues: {
      username: 'enter username',
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      setUsername(values.username);
      navigate('/password');
    },
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/user/login', { mail, password });
      console.log(res.data);
      const id=res.data.user._id;
      console.log(res.data.user._id);
      console.log(id);
      const userToShow = res.data.user;
      
      if(res.data.user.role==='admin'){
        setIsProcessing(true);
       navigate(`/dash/team`, { state: { userToShow } });}
       setIsProcessing(false);
    } catch (err) {
      setError(err.response.data.message);
    }
  };


  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="container mx-auto">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
  
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Hello Again!</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
               Admin Connecting 
              </span>
            </div>
  
           
  
              <div className="textbox flex flex-col items-center gap-6">
              <div className="profile flex justify-center py-4">
                <Webcam
                  className={styles.profile_img}
                  audio={false}
                  height={200}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={200}
                />
              </div>
            <TextField fullWidth label='Email' placeholder="Enter your email" 
              id="mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
              />
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
                    onClick={handleLogin}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Let's Go
              </Button>
              </div>
  
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Not a Member{' '}
                  <Link className="text-red-500" to="/register">
                    Register Now
                  </Link>
                </span>
              </div>
          </div>
        </div>
      </div>
    );
  
}
