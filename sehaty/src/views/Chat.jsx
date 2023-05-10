import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NGYwNDhkZWE5YmVlZjI3OGY5Y2I2OSIsImlhdCI6MTY4Mjk1NTY0MCwiZXhwIjoxNjgzMDQyMDQwfQ.726bUOxRZHm5H55gnGMvBXnnCRAmGQfGo9cbS-s2N1o";
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/messages").then((res) => {
      setMessages(res.data);
    });
    axios.get("http://localhost:5000/user/getall", {
      headers: {
        Authorization: `{token}`
      }
    }).then((res) => {
      setUsers(res.data);
    });
    
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleMessageSend = () => {
    const { _id: from } = JSON.parse(localStorage.getItem("user"));
    const { _id: to } = selectedUser;
    axios.post("/api/messages", { from, to, message: newMessage }).then(() => {
      setNewMessage("");
    });
  };

  return (
    <div>
      <div>
        <h2>Select a user to chat with:</h2>
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <Link to="#" onClick={() => handleUserSelect(user)}>
                {user.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {selectedUser && (
        <div>
          <h2>Chatting with {selectedUser.name}</h2>
          <div>
            {messages.map((msg, i) => (
              <div key={i}>
                {msg.fromSelf ? "You: " : `${selectedUser.name}: `}
                {msg.message}
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleMessageSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
