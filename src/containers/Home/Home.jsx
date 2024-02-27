import { useState } from "react";
import Nav from "../Nav/Nav";
import CreateModal from "../../components/CreateModal/CreateModal";

const Home = ({ user, setUser }) => {
  const [openCreateModal, setOpenCreateModal] = useState(false);

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
      <Nav
        user={user}
        setUser={setUser}
        createModalHandler={createModalHandler}
      />
      {openCreateModal ? (
        <CreateModal user={user} createModalHandler={createModalHandler} />
      ) : null}
    </div>
  );
};

export default Home;
