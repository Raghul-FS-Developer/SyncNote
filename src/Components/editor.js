import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function Editor({ onLogin, user }) {

  const url = 'http://localhost:4000'
  //Dummy data
  const [socket, setSocket] = useState(null);
  const [lines, setLines] = useState([
    "This is line 1",
    "This is line 2",
    "This is line 3",
    "This is line 4",
    "This is line 5",
  ]);

  const [activeLine, setActiveLine] = useState(null);
  const [locks, setLocks] = useState({}); // { lineIndex: username }

  useEffect(() => {
    const socketIo = io(url, {
  transports: ["websocket"],
}); //socket connection
    setSocket(socketIo);

    //To get latest data when user login
    socketIo.on("updated_lines", (updatedLines) => {
      if (updatedLines.length > 0) updatedLines.forEach((e) => setLines(e));
    });

    // Listen for events from server
    socketIo.on("line_locked", ({ lineIndex, username }) => {
      setLocks((prev) => ({ ...prev, [lineIndex]: username }));
    });

    socketIo.on("live_updates", ({ newLines }) => {
      setLines(newLines);
    });
    socketIo.on("line_unlocked", ({ lineIndex }) => {
      setLocks((prev) => {
        const updated = { ...prev };
        delete updated[lineIndex];
        return updated;
      });
    });

    return () => {
      socketIo?.disconnect();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    onLogin(null);
  };

  const handleLines = (e, i) => {
    const newValue = e.target.value;
    setLines((prev) => {
      const newLines = [...prev];
      newLines[i] = newValue;
      socket?.emit("live_updates", { newLines });
      return newLines;
    });
  };

  const handleFocus = (i) => {
    setActiveLine(i);
    socket?.emit("line_locked", { lineIndex: i, username: user });
  };

  const handleBlur = (i) => {
    setActiveLine(null);
    socket?.emit("line_unlocked", { lineIndex: i });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
      >
        Logout
      </button>

      <h1 className="text-2xl font-bold mb-6">Welcome, {user} 👋</h1>

      <div className="space-y-2">
        {lines.map((line, i) => (
          <div key={i} className="relative">
            <input
              type="text"
              value={line}
              onFocus={() => handleFocus(i)}
              onBlur={() => handleBlur(i)}
              onChange={(e) => handleLines(e, i)}
              disabled={locks[i] && locks[i] !== user} // disable if another user is editing
              className={`w-full pr-36 border rounded p-2 shadow-sm focus:outline-none ${
                locks[i] && locks[i] !== user
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white focus:ring-2 focus:ring-blue-400"
              }`}
            />

            {locks[i] && (
              <p className="absolute right-2 top-2 text-sm text-gray-600 italic">
                {locks[i] === user
                  ? "✍️ You are editing"
                  : `🔒 ${locks[i]} is editing`}
              </p>
            )}
          </div>
        ))}
      </div>

      {activeLine !== null && locks[activeLine] === user && (
        <p className="mt-4 text-gray-700">
          ✍️ You ({user}) are editing <b>line {activeLine + 1}</b>
        </p>
      )}
    </div>
  );
}

export default Editor;
