import { useState, useEffect } from "react";
import Home from "./containers/Home/Home";
import "./App.css";
import Login from "./containers/Login/Login";
import Signup from "./containers/Signup/Signup";
import Nav from "./containers/Nav/Nav";
import CreateModal from "./components/CreateModal/CreateModal";
import Profile from "./containers/Profile/Profile";
import PostModal from "./components/PostModal/PostModal";
import Search from "./containers/Search/Search";
import EditProfile from "./containers/EditProfile/EditProfile";

//TODO: Add comment preview to postCard
//TOOD: Messages between users and notifications (websockets)

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

  useEffect(() => {
    const getUser = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/users/id/${userId}`
          );
          const data = await response.json();
          sessionStorage.setItem("user", JSON.stringify(data));
          setUser(data);
        } catch (error) {
          console.error("An error occurred while fetching user data:", error);
        }
      }
    };

    getUser();
  }, []);
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
                createModalHandler={createModalHandler}
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
                onLogout={setUser}
                user={user}
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
          <Route path="accounts/edit" element={<EditProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
