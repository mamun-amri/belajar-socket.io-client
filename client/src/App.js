import "./App.css";
import io from "socket.io-client";

import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");
function App() {
  // room state
  const [room, setRoom] = useState("");

  // message state
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", { room });
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        placeholder="Join Room"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      ></input>
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      ></input>
      <button onClick={sendMessage}>Send Message</button>
      <h3>Message : {receivedMessage}</h3>
    </div>
  );
}

export default App;
