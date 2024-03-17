import { useState } from "react";
import Home from "./containers/Home/Home";
import "./App.css";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import Nav from "./containers/Nav/Nav";
import CreateModal from "./components/CreateModal/CreateModal";
import Profile from "./containers/Profile/Profile";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [openCreateModal, setOpenCreateModal] = useState(false);

  //Handler for opening and closing the create post modal
  const createModalHandler = () => {
    console.log("createModalHandler");
    if (openCreateModal) {
      setOpenCreateModal(false);
    } else {
      setOpenCreateModal(true);
    }
  };

  return (
    <div className="app-container">
      <Router>
        <div className="nav-home-container">
          <Nav
            user={user}
            setUser={setUser}
            createModalHandler={createModalHandler}
          />
        </div>
        {openCreateModal ? (
          <CreateModal user={user} createModalHandler={createModalHandler} />
        ) : null}
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login onLogin={setUser} />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup onSignup={setUser} />}
          />
          <Route
            path="/"
            element={
              user ? (
                <Home user={user} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="user/:userid" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
