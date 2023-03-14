// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Route,Routes} from 'react-router-dom';
// import './App.css';
// import Header from './components/Header';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Welcome from './components/Welcome';
// import ForgotPassword from './components/ForgetPassword';
// import RestPassword from './components/RestPassword';


// function App() {
//   const isLoggedIn = useSelector(state => state.isLoggedIn);

//   return (
   
  

//     <React.Fragment>
//     <header>
//      <Header />
//     </header>
//     <main>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//     {isLoggedIn && <Route path="/user" element={<Welcome />} />}
//     <Route path="/forgetpassword" element={<ForgotPassword/>}/>7
//     <Route path='/resetpassword}' element={<RestPassword/>}/> {" "}



//       </Routes>
//     </main>
//     </React.Fragment>
//   );
// }

// export default App;
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import ForgotPassword from "./components/ForgetPassword";
import ResetPassword from "./components/RestPassword";

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <React.Fragment>
      <header>

        <Header />

      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetpassword" element={<ForgotPassword/>}/>
          <Route path="/reset-password/:resetToken" element={< ResetPassword/>}/>
          {isLoggedIn && <Route path="/user" element={<Welcome />} />}{" "}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
