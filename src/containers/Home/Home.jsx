import { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import CreateModal from "../../components/CreateModal/CreateModal";
import PostCard from "../../components/PostCard/PostCard";
import PostModal from "../../components/PostModal/PostModal";
import "../../styles/Home.css";

const Home = ({ user, setUser }) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);

  //Gather all posts from db to render them on feed (Temporary implementation, will only show followed users posts later)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts/feed");
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("An error occurred while fetching the posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const handlePostModal = () => {
    if (showPostModal) {
      setShowPostModal(false);
    } else {
      setShowPostModal(true);
    }
  };

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
    <div className="home-container">
      <div className="nav-home-container">
        <Nav
          user={user}
          setUser={setUser}
          createModalHandler={createModalHandler}
        />
      </div>

      {showPostModal ? (
        <PostModal handlePostModal={handlePostModal} post={post} />
      ) : null}

      {openCreateModal ? (
        <CreateModal user={user} createModalHandler={createModalHandler} />
      ) : null}
      <div className="feed-container">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handlePostModal={handlePostModal}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
