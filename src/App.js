import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from "./Routes/dashboard";
import Register from "./component/Register";
import Auth from "./component/Username";
import SignUp from "./component/SignUp";
import SignIn from "./component/SignIn";
import Profile from "./component/Profile";




function App() {
  return (
    <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/password" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rest" element={<Register />} />
        <Route path="dash/*" element={<Dashboard />} />
      </Routes>
    
      
     
    
     

  );
}

export default App;
