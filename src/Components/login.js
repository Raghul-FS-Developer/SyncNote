import React, { useState } from "react";

function LoginPage({onLogin}){
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name){
        name.trim()
        localStorage.setItem("username", name);
        onLogin(name)
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome 👋
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Enter your name to start editing
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Continue →
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage
