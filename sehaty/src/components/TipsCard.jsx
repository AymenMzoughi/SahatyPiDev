import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import {  useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import { FaPlayCircle } from "react-icons/fa";

function getCurrentMonth() {
    const date = new Date();
    return date.toLocaleString('default', { month: 'long' });
  }
function TipCard() {
    const [tips, setTips] = useState([]);
    const navigate = useNavigate();
  console.log(getCurrentMonth);
    useEffect(() => {
      axios.get('http://localhost:5000/tip/getTips').then(response => {
        setTips(response.data);
      }).catch(error => {
        console.error(error);
      });
    }, []);
  
    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:5000/tip/deleteTip/${id}`);
        console.log(response.data);
        // Remove the deleted user from the users array
        const newTips = tips.filter(tip => tip._id !== id);
        setTips(newTips);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleUpdate = (id) => {
      const tipToUpdate = tips.find(tip => tip._id === id);
      navigate(`../form`, { state: { tipToUpdate } });
    };
  
    const handleProfile = (id) => {
      const tipToShow = tips.find(tip => tip._id === id);
      
      navigate(`../`, { state: { tipToShow } });
      
    };
    
  const handleVideo = (id) => {
    const tipToShow = tips.find(tip => tip._id === id);
    console.log(tipToShow);
    navigate(`../video`, { state: { tipToShow } });
  };
  
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {tips.map(tip => (
        <Box key={tip._id} sx={{ width: '300px', height: 'auto', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}>
          {tip.month == 4 ? (
            <Box sx={{ backgroundColor: 'green', color: 'white', position: 'absolute', top: '0', left: '0', padding: '8px', zIndex: '1' }}>Recommandé ce mois-ci</Box>
          ) : null}
          <div style={{ position: 'relative' }}>
            <img
              src={`http://localhost:5000/${tip.picture}`}
              alt="tip"
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <FaPlayCircle
              onClick={() => handleVideo(tip._id)}
              size={50}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer'
              }}
            />
          </div>            
          <Box sx={{ padding: '16px' }}>
            <h3>{tip.title}</h3>
            <h4>{tip.description}</h4>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
            
          
            <IconButton  href={`http://localhost:5000/${tip.tippdf}`} download>
              <AttachFileIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
  
  }
  

export default TipCard;
