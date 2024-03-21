import { useState, useEffect } from "react";
import PostCard from "../../components/PostCard/PostCard";

import "../../styles/Home.css";

const Home = ({ setSelectedPost, handlePostModal }) => {
  const [posts, setPosts] = useState([]);

  //Gather all posts from db to render them on feed (Temporary implementation, will only show followed users posts later)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/posts/feed");
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

export default Home;
