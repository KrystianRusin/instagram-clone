import { useState } from "react";
import Home from "./containers/Home/Home";
import "./App.css";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import Nav from "./containers/Nav/Nav";
import CreateModal from "./components/CreateModal/CreateModal";
import Profile from "./containers/Profile/Profile";
import PostModal from "./components/PostModal/PostModal";
import Search from "./containers/Search/Search";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const storedUser = sessionStorage.getItem("user");
  const [user, setUser] = useState(
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null
  );
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  //Handler for opening and closing the create post modal
  const createModalHandler = () => {
    console.log("createModalHandler");
    if (openCreateModal) {
      setOpenCreateModal(false);
    } else {
      setOpenCreateModal(true);
    }
  };

  //Handler for opening and closing the post modal
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
          <div className="sidebar-container">
            <div
              className={`nav-home-container ${
                isSearchOpen ? "collapsed" : ""
              }`}
            >
              <Nav
                user={user}
                setUser={setUser}
                createModalHandler={createModalHandler}
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />
            </div>
            <Search isSearchOpen={isSearchOpen} />
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
