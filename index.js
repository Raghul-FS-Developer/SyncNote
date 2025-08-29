// server.js
const { Server } = require("socket.io");
const io = new Server(4000, {
  cors: { origin: "*" },
});

let locks = {}; //stores data of locked indexes
let latestData = []; // stores data on every line updates
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  io.emit("updated_lines", latestData); // sending the latest data when user login

  socket.on("line_locked", ({ lineIndex, username }) => {
    locks[socket.id] = lineIndex; // { D6O9u8TsDZQQdWc2AAAS: 1 }

    io.emit("line_locked", { lineIndex, username });
  });

  socket.on("live_updates", (data) => {
    latestData[0] = data.newLines;
    io.emit("live_updates", data); //live line updates
  });

  socket.on("line_unlocked", ({ lineIndex }) => {
    if (locks[socket.id] === lineIndex) {
      delete locks[socket.id]; // Removing the user and index from locks object
    }
    io.emit("line_unlocked", { lineIndex });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    if (locks[socket.id] !== undefined) {
      io.emit("line_unlocked", { lineIndex: locks[socket.id] }); // Triggering unlock incase user got disconnected
      delete locks[socket.id];
    }
  });
});

console.log("Socket.IO server running on 4000");
