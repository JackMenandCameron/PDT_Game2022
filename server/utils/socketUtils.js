const socketIO = require("socket.io");

exports.sio = (server) => {
  return socketIO(server, {
    transports: ["polling"],
    cors: {
      origin: "*",
    },
  });
};

exports.connection = (io) => {
  io.on("connection", (socket) => {
    console.log("A user is connected");
    socket.emit("new_user", "steve");

    socket.on("message", (message) => {
      console.log(`message from ${socket.id} : ${message}`);
    });

    socket.on("new_user", (user) => {
      console.log("new user");
      io.emit("new_user", user);
    });

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
};
