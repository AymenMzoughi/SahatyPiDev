import React, { useState } from 'react';
import axios from 'axios';
import { Box} from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { FaPlayCircle } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Img from "../assets/sehaty.png";

const SearchTips = () => {
  const [title, setTitle] = useState('');
  const [tips, setTips] = useState([]);
  const navigate = useNavigate();

  // Fonction pour envoyer la requête de recherche de tips par titre au backend
  const searchTips = async (title) => {
    try {
      const res = await axios.get(`http://localhost:5000/tip/searchTip/${title}`);
      setTips(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  // Fonction pour gérer l'événement de reconnaissance vocale
  const handleSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = function(event) {
      const speechResult = event.results[0][0].transcript;
      console.log(speechResult);
      setTitle(speechResult);
      searchTips(speechResult);
    };
    recognition.start();
  };
      
  const handleVideo = (id) => {
    const tipToShow = tips.find(tip => tip._id === id);
    console.log(tipToShow);
    navigate(`../video`, { state: { tipToShow } });
  };

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

  return (
    <div>

      <Form  
      onSubmit={handleSpeechRecognition}
      className="text-white md:pt-12 flex flex-col items-center justify-center" >
      <h1>Search Tips by Title with Speech Recognition</h1>
      <InputGroup className="mb-3">
      <Form.Control
                  type="text"
                  required
                  placeholder="Search Tip"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="py-1.5 md:py-2 px-4 rounded-full max-w-[14rem] mt-2 text-black md:mt-6 outline-0"
                />
                   <Button
                  onClick={handleSpeechRecognition}
                  type="submit"
                  variant="outline-success"
                  className="rounded-full py-[5px] md:py-[7px] mt-2 md:mt-4"
                >
                  Search with Speech Recognition
                </Button>
              </InputGroup>
      </Form>

      {tips.length > 0 ? (
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
            <p>{tip.description}</p>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px' }}>
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(tip._id)}>
              <DeleteIcon />
            </IconButton>
            
            <IconButton  href={`http://localhost:5000/${tip.tippdf}`} download>
              <AttachFileIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
    
      
      ) : (
        <p>No matching tips found.</p>
      )}
    </div>
  );
};

export default SearchTips;
