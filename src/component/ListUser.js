import React, { useState, useEffect } from 'react';
import axios from '../axios';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import {  useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CoPresentIcon from '@mui/icons-material/CoPresent';

function UserList() {

  const [users, setUsers] = useState([]);
  const navigate =useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/user/showUser').then(response => {
      setUsers(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/user/delUser/${id}`);
      console.log(response.data);
      // Remove the deleted user from the users array
      const newUsers = users.filter(user => user._id !== id);
      setUsers(newUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (id) => {
    const userToUpdate = users.find(user => user._id === id);
    navigator.push({
      pathname: '/updateUser',
      state: { userToUpdate: userToUpdate }
    });
  };

  const handleProfile = (id) => {
    const userToShow = users.find(user => user._id === id);
    console.log(id);
    navigate(`../profile`, { state: { userToShow } });
  };
  

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
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => (
        <>
          <Box sx={{ mx: 1 }}>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(row._id)}>
            <DeleteIcon />
            </IconButton>
          </Box>
          <Box sx={{ mx: 1 }}>
          <IconButton edge="end" aria-label="update" onClick={() => handleUpdate(row._id)}>
            <EditIcon />
            </IconButton>
          </Box>
          <Box sx={{ mx: 1 }}>
          <IconButton edge="end" aria-label="update" onClick={() => handleProfile(row._id)}>
            <CoPresentIcon />
            </IconButton>
          </Box>
        </>
      ),
    },
  ];

  return (
    
    <Box sx={{ height:600 , width: '100%' }}>
    <DataGrid
  rows={users}
  columns={columns}
  pageSize={5}
  rowsPerPageOptions={[5, 5, 5]}
  disableSelectionOnClick
  getRowId={(row) => row._id}
  sx={{ columnGap: '0px' }}
  columnBuffer={10} // <-- augmenter la valeur de columnBuffer
/>
    </Box>
  );
}

export default UserList;
