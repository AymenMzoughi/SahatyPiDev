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

function TipList() {

  const [tips, setTips] = useState([]);
  const navigate =useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/tip/getTips').then(response => {
      setTips(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/tip/deleteTip/${id}`);
      console.log(response.data);
      // Remove the deleted user from the users array
      const newTips = tips.filter(tip => tip._id !== id);
      setTips(newTips);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (id) => {
    const userToUpdate = tips.find(user => user._id === id);
    navigate(`../form`, { state: { userToUpdate } });

  };

  const handleProfile = (id) => {
    const userToShow = tips.find(user => user._id === id);
    console.log(id);
    navigate(`../video`, { state: { userToShow } });
  };
  

  const columns = [
    {
      field: 'picture',
      headerName: 'Photo',
      flex: 1,
      renderCell: ({ row }) => (
        <img src={`http://localhost:5000/${row.picture}`} alt="pdp" style={{ width: 50, height: 50, borderRadius: '50%' }} />
      ),
    },
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
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
         
        </>
      ),
    },
  ];

  return (
    
    <Box sx={{ height:600 , width: '100%' }}>
    <DataGrid
  rows={tips}
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

export default TipList;
