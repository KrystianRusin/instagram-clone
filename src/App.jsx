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
import Inbox from "./containers/Inbox/Inbox";
import Disclaimer from "./Disclaimer/Disclaimer";

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
  const [navCollapsed, setNavCollapsed] = useState(false);
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
      <Disclaimer />
      <Router>
        {user != null ? (
          <div
            className={`sidebar-container ${navCollapsed ? "collapsed" : ""}`}
          >
            <div
              className={`nav-home-container ${
                navCollapsed ? "collapsed" : ""
              }`}
            >
              <Nav
                createModalHandler={createModalHandler}
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
                onLogout={setUser}
                user={user}
                navCollapsed={navCollapsed}
                setNavCollapsed={setNavCollapsed}
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
            path="/"
            element={
              user ? <Navigate to="/home" /> : <Login onLogin={setUser} />
            }
          />
          <Route
            path="/signup"
            element={
              user ? <Navigate to="/home" /> : <Signup onSignup={setUser} />
            }
          />
          <Route
            path="/home"
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
          <Route
            path="/direct/inbox"
            element={
              <div className="inbox-main-container">
                <Inbox setNavCollapsed={setNavCollapsed} />
              </div>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
