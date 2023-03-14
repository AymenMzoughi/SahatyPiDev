import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

// const ResetPassword = () => {
//   const location = useLocation();
//   const resetTokenFromUrl = location.pathname.split('/').pop(); // Get the reset token value from the URL parameter
//   const [resetToken, setResetToken] = useState(resetTokenFromUrl);
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/reset-password', { resetToken, password });
//       setSuccess(true);
//       setError(null);
//       console.log(res.data)
//     } catch (err) {
//       setSuccess(false);
//       setError(err.res);
//     }
//   };

//   return (
//     <div>
//       {success ? (
//         <p>Password updated successfully</p>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <input
           
//             value={resetToken}
//             onChange={(e) => setResetToken(e.target.value)}
//             placeholder="Reset password"
//           />
//           <br />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="New password"
//           />
//           <br />
//           <button type="submit" 
//           onClick={handleSubmit}
//           >Reset password</button>
//         </form>
//       )}
//                 {error && <p>{error}</p>}

//     </div>
//   );
// };
function ResetPassword() {
  const [resetToken, setResetToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/reset-password', { resetToken, password });

      console.log(response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.log(error.response.data);
      setMessage(error.response.data.message);
    }
  };

  

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleReset}>
        <label htmlFor='resetToken'>Reset Token:</label>
        <input type='text' id='resetToken' value={resetToken} onChange={(e) => setResetToken(e.target.value)} />
        <label htmlFor='password'>New Password:</label>
        <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
export default ResetPassword;