import 'bootstrap/dist/css/bootstrap.min.css';

import SignUp from "./components/SignUp";
import Signin from "./components/SignIn";
import ForgetPwd from "./components/ForgetPwd";
import ResetPwd from "./components/ResetPwd";
import Home from "./routes/Home"
import ProfileDoct from "./routes/ProfilDoctor"
import ProfilPat from "./routes/ProfilPat"

import Dashboard from "./routes/dashboard"
import Admin from "./components/Username"
import Profile from "./components/Profile"

import {  Route, Routes,Router } from 'react-router-dom';
function App() {
  return (
<main>
  <Routes>
  <Route path="/signup" element={<SignUp />} />
  <Route path="/signin" element={<Signin />} />
  <Route path="/forget" element={<ForgetPwd />} />
  <Route path="/resetPwd" element={<ResetPwd />} />
  <Route path="/" element={<Home />} />
  <Route path="/Profile" element={<Profile />} />
  <Route path="dash/*" element={<Dashboard />} />
  <Route path="/cnxAdmin" element={<Admin/>}/>
  <Route path="/ProfileDoc" element={<ProfileDoct />} />
  <Route path="/ProfilePat" element={<ProfilPat />} />








  </Routes>
</main>
 


    
       
        
  
        

    
  );
}

export default App;
