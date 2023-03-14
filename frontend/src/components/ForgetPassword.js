import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url =('http://localhost:5000/api/reset-password') 
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email });

      if (response.status === 200) {
        alert(response.data.message);
        setResetToken(response.data.resetToken); // Store the reset token value in state
        navigate(`/resetpassword/${response.data.resetToken}`); 
        console.log(response.data);// Navigate to the reset password page with the reset token as a URL parameter
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='container'>
    <form onSubmit={handleSubmit}>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default ForgotPassword;