import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import conf from "../assets/conf.jpg";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Image from 'react-bootstrap/Image';
import Img from "../assets/sehaty.png";

const Home = () => {
  const [roomCode, setRoomCode] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const submitCode = (e) => {
    e.preventDefault();
    navigate(`/room/${roomCode}`);
  };

  const sendInvitationEmail = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/tip/invitetochat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        roomCode: roomCode
      })
    })
    .then(response => {
      console.log('Invitation email sent successfully!');
    })
    .catch(error => {
      console.error('Error sending invitation email:', error);
    });
  }

  return (
    <div className=" ">
      {/* Navbar */}
      {/* Hero */}
      <Image  src={Img} fluid />
      <div className="relative h-screen ">
        {/* Image */}
        
        {/* Overlay */}
        <div className="absolute h-full w-full flex overflow-hidden bg-black/60"></div>
        {/* Hero Info */}
        <div className="lg:flex lg:pt-20 flex-col items-center justify-center relative z-10 px-6 md:max-w-[90vw] mx-auto">
          {/* Main */}
          <div className=" flex flex-col items-center justify-center pb-8">
            <h1 className="text-5xl md:text-3xl font-weight-bold pt-6 text-primary">
              Video Chat App
            </h1>
            <h1 className="text-5xl md:text-3xl font-weight-bold pt-6 text-primary">With Sehaty</h1>
          </div>

          {/* Enter Code */}
          <form
            onSubmit={submitCode}
            className="text-white md:pt-12 flex flex-col items-center justify-center"
          >
            <div className=" flex flex-col justify-center items-center">
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  required
                  placeholder="Enter Room Code"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  className="py-1.5 md:py-2 px-4 rounded-full max-w-[14rem] mt-2 text-black md:mt-6 outline-0"
                />
                <Button
                  type="submit"
                  variant="outline-success"
                  className="rounded-full py-[5px] md:py-[7px] mt-2 md:mt-4"
                >
                  Go
                </Button>
              </InputGroup>
            </div>
          </form>
          {/* Invite to Chat */}
          <form onSubmit={sendInvitationEmail} className="text-white md:pt-12 flex flex-col items-center justify-center">
  <div className="flex flex-col justify-center items-center">



    <div className="input-group mb-3">
      <input
        type="email"
        required
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="py-1.5 md:py-2 px-4 rounded-full max-w-[14rem] mt-2 text-black md:mt-6 outline-0 form-control"
      />
      <button
        type="submit"
        className="btn btn-outline-success ms-2 py-1.5 md:py-2 rounded-full mt-2 md:mt-6"
      >
        Send Invitation
      </button>
    </div>
  </div>
</form>


        </div>
      </div>
    </div>
  );
};

export default Home;
