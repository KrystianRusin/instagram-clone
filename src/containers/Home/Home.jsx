import React from "react";
import Nav from "../Nav/Nav";
import CreateModal from "../../components/CreateModal/CreateModal";

const Home = ({ user, setUser }) => {
  return (
    <div className="home-container">
      <Nav user={user} setUser={setUser} />
      <CreateModal user={user} />
    </div>
  );
};

export default Home;
