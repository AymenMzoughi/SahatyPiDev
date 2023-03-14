import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Signup = () => {
  

    const history = useNavigate();
    const [inputs, setInputs  ] = useState({
        firstname: "",
        lastname:"",
        Number:"",
        pdp:"",
        email: "",
        password: "",

    });
    const [rolex,setRole]= useState();
      const handleChange= (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

       };
      // const sendRequest = async (name,email,password) => {
      //   try{
      //   const res = await axios.post("http://localhost:5000/api/signup", {
      //       name: inputs.name,
      //       email: inputs.email,
      //       password: inputs.password
      //   )}
      //   catch((err )=> console.log(err));
     
      //   const data = await res.data;
      //   return data;
      // }
      // };
      const sendRequest = async (firstname,lastname,Number,pdp,email,role, password) => {
        try {
          const response = await axios.post("http://localhost:5000/api/signup", { firstname,lastname,Number,pdp , email, role, password });
          console.log(response.data);
         
        } catch (error) {
          console.log(error.response.data.message);
        }
      };
      const handleSubmit = (event) => {
        event.preventDefault();
        const firstname = inputs.firstname;
        const lastname = inputs.lastname;
        const Number = inputs.Number;
        const pdp = inputs.pdp;
        const email = inputs.email;
        const role = rolex;
        const password = inputs.password;
        sendRequest(firstname,lastname,Number, pdp,email,role, password);
      }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // console.log(inputs);
    //     // send http request
    //     sendRequest().then(() => history("/login"));
    // };
    // const[Doctor,setDoctor]=useState(true);
    // const[Patient,setPatient]=useState(true);
    // const handleChange1 = (data)=>{
    //   if(data == 'Doctor')
    //   {
    //     if(Doctor == true){
    //       console.log(data,"our value")
    //     }
    //     setDoctor(!Doctor)
    //   }
    //   if(data == 'Patient')
    //   {
    //     if(Patient == true){
    //       console.log(data,"our value")
    //     }
    //     setPatient(!Patient)
    //   }
    // }
    
  return (
    <div>
        <form onSubmit={handleSubmit} >
            <Box
            marginLeft="auto"
            marginRight="auto"
            width={300}
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center">
                <Typography variant='h2'>Signup</Typography>
                <TextField
                 name="firstname"
                onChange={handleChange}
                 value={inputs.firstname}
                  variant='outlined' 
                  placeholder='FirstName'
                   margin='normal' 
                   required/>
                    <TextField
                 name="lastname"
                onChange={handleChange}
                 value={inputs.lastname}
                  variant='outlined' 
                  placeholder='lastName'
                   margin='normal' 
                  required />
                    <TextField
                 name="Number"
                onChange={handleChange}
                 value={inputs.Number}
                  variant='outlined' 
                  placeholder='your phone number'
                   margin='normal' 
                  required />
                    <TextField
                 name="pdp"
                onChange={handleChange}
                 value={inputs.pdp}
                  variant='outlined' 
                  placeholder='pdp'
                   margin='normal' 
                  />
                <TextField 
                name="email"

                      onChange={handleChange}
                type={"email"}
                 value={inputs.email}
                  variant='outlined'
                   placeholder='Your Email' 
                   margin='normal' 
                 required  />
                <TextField 
                name="password"
                onChange={handleChange}
                type="password" 
                value={inputs.password}
                 variant='outlined'
                  placeholder='Your Password'
                   margin='normal'
                   required />
{/*                   
                    <input type='Checkbox' value={Doctor} onChange={() =>handleChange1("Doctor")}/> Doctor
                    <input type='Checkbox' value={Patient} onChange={() =>handleChange1("Patient")}/> Patient */}

<select
onChange={(e)=>{
  const selectedRole = e.target.value;
  setRole(selectedRole)
  console.log(rolex);
}}>
  <option value="Docteur">Doctor</option>
  <option value="Patient">Patient</option>
  <option value="Pharmacien">Pharmacien</option>
</select>
                    
                   
                <Button variant="contained"
                 type='submit' onClick={Signup} >
                    Signup
                </Button>

            </Box>
        </form>
    </div>
  );
};

export default Signup;

