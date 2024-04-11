import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import InboxSidebar from "../../components/InboxSidebar/InboxSidebar";
import { useNavigate } from "react-router-dom";
import "./Inbox.css";

const Inbox = ({ setNavCollapsed }) => {
  useEffect(() => {
    setNavCollapsed(true);
  }, []);

  const navigate = useNavigate();

  const handleChatSelect = (chat) => {
    navigate(`/inbox/${chat.id}`);
  };

  return (
    <div className="inbox-container">
      <div className="inbox-sidebar-wrapper">
        <InboxSidebar handleChatSelect={handleChatSelect} />
      </div>
      <Routes>
        <Route path=":chatId" element={<div>Chat</div>} />
      </Routes>
    </div>
  );
};

export default Inbox;
