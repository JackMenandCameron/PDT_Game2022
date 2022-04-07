import { useEffect, useRef, useState } from "react";
import React from "react";
import "./App.css";

import { io } from "socket.io-client";

function App() {
  const socket = useRef();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.current = io("ws://localhost:9013");

    socket.current.on("connection", () => {
      console.log("connected");
    });
  }, []);

  useEffect(() => {
    socket.current.on("new_user", (user) => {
      setUsers(users.concat(user));
    });
  }, [users]);

  const handleClick = () => {
    socket.current.emit("new_user", "james");
  };
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Game Leaderboard</h1>
      {users.map((user, index) => {
        if (index % 2 === 0) {
          return <p className="">{user} even</p>;
        } else {
          return <p>{user} odd</p>;
        }
      })}

      <button type="button" onClick={handleClick}>
        Emit a time message
      </button>
    </div>
  );
}

export default App;
