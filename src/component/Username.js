import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';
import styles from '../styles/Username.module.css';
import axios from 'axios';
import Webcam from "react-webcam";
import {  Button} from '@mui/material';



export default function Username() {
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);
  const webcamRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
  const handleCapture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const formData = new FormData();
    formData.append("image", imageSrc);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    try {
      const response = await axios.post('http://localhost:3000/user/upload', formData, config);
      console.log(response.data);
    } catch (error) {
      console.error(error);
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


  
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="container mx-auto">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
  
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className="text-5xl font-bold">Hello Again!</h4>
              <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                Explore More by connecting with us.
              </span>
            </div>
  
            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className="profile flex justify-center py-4">
                <Webcam
                  className={styles.profile_img}
                  audio={false}
                  height={200}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={200}
                />
                <button className={styles.btn} onClick={handleCapture}>
                Take photo
              </button>
              </div>
  
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps('username')}
                  className={styles.textbox}
                  type="text"
                  placeholder="Username"
                />
                <button className={styles.btn} type="submit">
                  Let's Go
                </button>
              </div>
  
              <div className="text-center py-4">
                <span className="text-gray-500">
                  Not a Member{' '}
                  <Link className="text-red-500" to="/register">
                    Register Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  
}
