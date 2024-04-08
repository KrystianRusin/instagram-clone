import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import db from "../../firebase";
import "./InboxSidebar.css";

const InboxSidebar = () => {
  const [user, setUser] = useState(null);

  //Get the user from session storage
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  const handleNewChatClick = async () => {
    const handleAddDoc = async () => {
      try {
        const docRef = await addDoc(collection(db, "myCollection"), {
          test: "data",
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };

    handleAddDoc();
  };

  //TODO: Create chat list item component
  //TODO: Create endpoint to retrieve all chats the user is a part of

  //TODO: Create actual messaging system

  return (
    <div className="inbox-sidebar-container">
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
