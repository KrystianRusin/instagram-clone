import { useState } from "react";
import Nav from "./containers/Nav/Nav";
import "./App.css";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login onLogin={setUser} />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup onSignup={setUser} />}
        />
        <Route path="/" element={user ? <Nav /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
