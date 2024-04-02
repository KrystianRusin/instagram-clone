import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PostCard from "../../components/PostCard/PostCard";

import "../../styles/Home.css";

const Home = ({ setSelectedPost, handlePostModal }) => {
  const [posts, setPosts] = useState([]);

  //Gather all posts from db to render them on feed (Temporary implementation, will only show followed users posts later)
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user._id);
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/posts/feed/${user._id}`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("An error occurred while fetching the posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-container">
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

Home.propTypes = {
  setSelectedPost: PropTypes.func.isRequired,
  handlePostModal: PropTypes.func.isRequired,
};

export default Home;
