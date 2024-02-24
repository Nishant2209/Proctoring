import "./App.css";
import JoinRoom from "./components/JoinRoom";
import Conference from "./components/Conference";
import { useState } from "react";
import Header from "./components/Header";
import { selectIsConnectedToRoom, useHMSStore } from "@100mslive/react-sdk";

function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  const [roomId, setRoomId] = useState("");
  const [roomCode, setRoomCode] = useState("");

  return (
    <div className="App">
      <Header roomId={roomId} />
      {isConnected ? (
        <Conference />
      ) : (
        <JoinRoom
          roomId={roomId}
          setRoomId={setRoomId}
          roomCode={roomCode}
          setRoomCode={setRoomCode}
        />
      )}
    </div>
  );
}

export default App;
