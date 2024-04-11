import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import InboxSidebar from "../../components/InboxSidebar/InboxSidebar";
import { useNavigate } from "react-router-dom";
import "./Inbox.css";
import ChatRoom from "../../components/ChatRoom/ChatRoom";

const Inbox = ({ setNavCollapsed }) => {
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    setNavCollapsed(true);
  }, []);

  const navigate = useNavigate();

  const handleChatSelect = (chat) => {
    setChatId(chat.id);
    navigate(`/inbox/${chat.id}`);
  };

  return (
    <div className="inbox-container">
      <div className="inbox-sidebar-wrapper">
        <InboxSidebar handleChatSelect={handleChatSelect} />
      </div>
      <Routes>
        <Route path=":chatId" element={<ChatRoom chatId={chatId} />} />
      </Routes>
    </div>
  );
};

export default Inbox;
