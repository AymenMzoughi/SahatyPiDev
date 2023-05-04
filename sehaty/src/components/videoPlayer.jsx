import { useState, useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';

import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

function VideoPlayer() {
    const location = useLocation();
  const tip = location.state.tipToShow;
  const [isPaused, setIsPaused] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(true);
  const videoRef = useRef(null); // Déclarer la référence ici

  const handleVideoPause = () => {
    console.log("Video paused");
    setIsPaused(true);
    setIsDialogOpen(true);
  };

  const handleAnswer = (answer) => {
    if (answer === `${tip.title}`) {
    //   setIsPaused(false);
    console.log(videoRef);
    videoRef.current.videoEl.play();
      setIsDialogOpen(false);
    } else {
      console.log("Answer");
      setIsAnswerCorrect(false);
      setTimeout(() => {
        setIsAnswerCorrect(true);
      }, 2000);
    }
  };

  useEffect(() => {
    // Pause the video after 2 seconds
    const timeout = setTimeout(() => {
        videoRef.current.videoEl.pause();
        setIsDialogOpen(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Video
        autoPlay
        loop
        poster={`http://localhost:5000/${tip.picture}`}
        onCanPlayThrough={() => {
          console.log("video Play");
        }}
        onPause={handleVideoPause}
        ref={videoRef}
      >
        <source src={`http://localhost:5000/${tip.video}`} type="video/mp4" />
      </Video>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Question</DialogTitle>
        <DialogContent>
          <DialogContentText>What is the tip title following you now?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleAnswer(`${tip.title}`)} color="primary">
            {tip.title}
          </Button>
          <Button onClick={() => handleAnswer("Grippe")} color="primary">
            Grippe
          </Button>
        </DialogActions>
      </Dialog>
      {!isAnswerCorrect && (
        <Dialog open={!isAnswerCorrect}>
          <DialogTitle>Incorrect Answer</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please choose the correct answer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsAnswerCorrect(true)} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default VideoPlayer;