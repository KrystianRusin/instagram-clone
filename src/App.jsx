import { useState } from "react";
import Home from "./containers/Home/Home";
import "./App.css";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import Nav from "./containers/Nav/Nav";
import CreateModal from "./components/CreateModal/CreateModal";
import Profile from "./containers/Profile/Profile";
import PostModal from "./components/PostModal/PostModal";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  //Handler for opening and closing the create post modal
  const createModalHandler = () => {
    console.log("createModalHandler");
    if (openCreateModal) {
      setOpenCreateModal(false);
    } else {
      setOpenCreateModal(true);
    }
  };

  const handlePostModal = () => {
    if (showPostModal) {
      setShowPostModal(false);
    } else {
      setShowPostModal(true);
    }
  };

  return (
    <div className="app-container">
      <Router>
        {user != null ? (
          <div className="nav-home-container">
            <Nav
              user={user}
              setUser={setUser}
              createModalHandler={createModalHandler}
            />
          </div>
        ) : null}
        {showPostModal ? (
          <PostModal handlePostModal={handlePostModal} post={selectedPost} />
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
                <div className="main-content-home-container">
                  {openCreateModal ? (
                    <CreateModal
                      user={user}
                      createModalHandler={createModalHandler}
                    />
                  ) : null}
                  <Home
                    setSelectedPost={setSelectedPost}
                    handlePostModal={handlePostModal}
                  />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path=":username"
            element={
              <Profile
                user={user}
                setSelectedPost={setSelectedPost}
                handlePostModal={handlePostModal}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
