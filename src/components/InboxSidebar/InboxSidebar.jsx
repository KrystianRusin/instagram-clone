import { useState, useEffect } from "react";
import "./InboxSidebar.css";

const InboxSidebar = () => {
  const [user, setUser] = useState(null);

  //Get the user from session storage
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  //TODO: Create chat list item component
  //TODO: Create endpoint to retrieve all chats the user is a part of

  //TODO: Create actual messaging system

  return (
    <div className="inbox-sidebar-container">
      <div className="inbox-sidebar-header">
        <div className="inbox-sidebar-header-actions">
          <span className="inbox-sidebar-username">{user.username}</span>
          <button>New Message</button>
        </div>
      </div>
      <div>
        <h1 className="messages-title">Messages</h1>
      </div>
    </div>
  );
};
export default InboxSidebar;
