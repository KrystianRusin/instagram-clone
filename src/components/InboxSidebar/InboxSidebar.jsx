import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from "../../firebase";
import "./InboxSidebar.css";
import NewChatModal from "../newChatModal/newChatModal";

const InboxSidebar = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [showModal, setShowModal] = useState(false);
  const [chats, setChats] = useState([]);

  //Get the user from session storage
  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "chats"),
        where(`users.${user._id}`, "==", true)
      );

      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const chatsData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const chatData = doc.data();

            // Fetch the user data for each user ID in the 'users' map
            const usersData = await Promise.all(
              Object.keys(chatData.users).map(async (userId) => {
                const response = await fetch(
                  `${import.meta.env.VITE_API_BASE_URL}/users/id/${userId}`
                );
                const userData = await response.json();
                return userData;
              })
            );

            return {
              id: doc.id,
              ...chatData,
              users: usersData,
            };
          })
        );

        console.log(chatsData);
        setChats(chatsData);
      });

      // Clean up the subscription
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    console.log("chats: ", chats);
  }, [chats]);

  const handleNewChatClick = async () => {
    setShowModal(true);
  };

  //TODO: Create modal to create new chat
  //TODO: Create chat list item component
  //TODO: Create endpoint to retrieve all chats the user is a part of

  //TODO: Create actual messaging system

  return (
    <div className="inbox-sidebar-container">
      {showModal ? (
        <NewChatModal setShowModal={setShowModal} user={user} />
      ) : null}
      <div className="inbox-sidebar-header">
        <div className="inbox-sidebar-header-actions">
          <span className="inbox-sidebar-username">
            {user ? user.username : "Loading...."}
          </span>
          <button onClick={handleNewChatClick}>New Message</button>
        </div>
      </div>
      <div>
        <h1 className="messages-title">Messages</h1>
      </div>
    </div>
  );
};
export default InboxSidebar;
