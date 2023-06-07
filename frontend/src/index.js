import React, { useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {UserContext} from "./context/context.js"

function Spa() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <UserContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        <App />
      </UserContext.Provider>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Spa />
  </React.StrictMode>
);
