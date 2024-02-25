import React from "react";
import Nav from "../Nav/Nav";

const Home = ({ user, setUser }) => {
  return (
    <div>
      <Nav user={user} setUser={setUser} />
    </div>
  );
};

export default Home;
