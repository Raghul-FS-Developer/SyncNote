// server.js
const { Server } = require("socket.io");
const io = new Server(4000, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("line_locked", (data) => {
    io.emit("line_locked", data); // broadcast to all
  });
     socket.on("live_updates", (data) => {
        io.emit("live_updates", data); // broadcast to all
       
      });

  socket.on("line_unlocked", (data) => {
    io.emit("line_unlocked", data);
  }); 

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

console.log("Socket.IO server running on 4000");
