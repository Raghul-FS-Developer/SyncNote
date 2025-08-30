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
  io.emit("inital_linelocks", locks); // sending current lock to user who logins later

  socket.on("line_locked", ({ lineIndex, username }) => {
    locks[socket.id] = { lineIndex, username }; // { V6rbeLx_1BAK4aXmAAAE: { lineIndex: 2, username: 'r' } }

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
    if (locks[socket.id]) {
      const lineIndex = locks[socket.id].lineIndex;
      delete locks[socket.id];
      io.emit("line_unlocked", { lineIndex });
    }
  });
});

console.log("Socket.IO server running on 4000");
