import { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import CreateModal from "../../components/CreateModal/CreateModal";
import PostCard from "../../components/PostCard/PostCard";
import "../../styles/Home.css";

const Home = ({ user, setUser }) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [posts, setPosts] = useState([]);

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

      {openCreateModal ? (
        <CreateModal user={user} createModalHandler={createModalHandler} />
      ) : null}
      <div className="feed-container">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
