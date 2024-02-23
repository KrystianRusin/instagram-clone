import { useState } from "react";
import Nav from "./containers/Nav/Nav";
import "./App.css";
import Login from "./containers/Login/Login";

function App() {
  return (
    <div className="main-content">
      <div className="Nav">
        <Nav />
      </div>
      <Login />
    </div>
  );
}

export default App;
