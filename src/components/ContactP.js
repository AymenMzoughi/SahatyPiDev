import React, { useState, useEffect } from 'react';
import 'animate.css';
import axios from '../axios';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";

const ContactP= ()=>  {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
  const [users, setUsers] = useState([]);

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
      setFormDetails({
        ...formDetails,
        [category]: value
      })
  }
  useEffect(() => {
    axios.get('http://localhost:3000/user/showUser')
      .then(response => {
        const filteredUsers = response.data.filter(user => user.role === "Doctor" && "Pharmacist");
        setUsers(filteredUsers);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const columns = [
    {
      field: 'pdp',
      headerName: 'Photo',
      flex: 1,
      renderCell: ({ row }) => (
        <img src={`http://localhost:3000/${row.pdp}`} alt="pdp" style={{ width: 50, height: 50, borderRadius: '50%' }} />
      ),
    },
    { field: 'nom', headerName: 'Nom', flex: 1 },
    { field: 'prenom', headerName: 'Prénom', flex: 1 },
    { field: 'mail', headerName: 'E-mail', flex: 1},
    {
        field: 'docVerif',
        headerName: 'Documents',
        flex: 1,
        sortable: false,
        renderCell: ({ row }) => (
        <>
          {row.docVerif.map((file, index) => (
            <a key={index} href={`http://localhost:3000/${file}`} download>
              <AttachFileIcon />
            </a>
          ))}
        </>
      )},
          ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    let result = await response.json();
    setFormDetails(formInitialDetails);
    if (result.code == 200) {
      setStatus({ succes: true, message: 'Message sent successfully'});
    } else {
      setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    }
  };

  return (
    <Box sx={{ height: 600, width: '100%', backgroundColor: 'white' }}>
    <DataGrid
      rows={users}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5, 5, 5]}
      disableSelectionOnClick
      getRowId={(row) => row._id}
      sx={{ columnGap: '0px' }}
      columnBuffer={10}
    />
  </Box>
  
  )
}
export default ContactP;

