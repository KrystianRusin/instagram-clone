import { useState, useEffect } from "react";
import PostCard from "../../components/PostCard/PostCard";
import PostModal from "../../components/PostModal/PostModal";
import "../../styles/Home.css";

const Home = ({ user, setUser }) => {
  const [posts, setPosts] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

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

  return (
    <div className="home-container">
      {showPostModal ? (
        <PostModal handlePostModal={handlePostModal} post={selectedPost} />
      ) : null}

      <div className="feed-container">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handlePostModal={() => {
              setSelectedPost(post);
              handlePostModal();
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
