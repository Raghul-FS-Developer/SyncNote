import React, { useLayoutEffect,useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Components/login";
import Editor from "./Components/editor";


function App() {

 
  const [user, setUser] = useState('');

  // Only for inital page rendering
  useLayoutEffect(() => {
    const storedUser = sessionStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <>
       
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Editor onLogin={setUser} user={user} />
            ) : (
              <LoginPage onLogin={setUser} />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
