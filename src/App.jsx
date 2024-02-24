import { useState } from "react";
import Nav from "./containers/Nav/Nav";
import "./App.css";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";

function App() {
  return (
    <div className="main-content">
      <div className="Nav">
        <Nav />
      </div>
      <Login />
      <Signup />
    </div>
  );
}

export default App;
