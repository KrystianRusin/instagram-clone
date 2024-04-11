import { useEffect, useState } from "react";
import "./ChatCard.css";

const ChatCard = ({ chat, handleChatSelect }) => {
  const [currUser, setCurrUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [otherUser, setOtherUser] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  // Get the current user from session storage

  const handleChatSelectClick = () => {
    handleChatSelect(chat);
  };

  useEffect(() => {
    setOtherUser(chat.users.find((user) => user._id !== currUser._id));
  }, [currUser]);
  // Find the user that is not the current user

  // Return early if the other user is not found
  useEffect(() => {
    if (chat.messages.length > 0) {
      setLastMessage(chat.messages[chat.messages.length - 1]);
    }
  }, [chat]);

  if (!otherUser) {
    return null;
  }

  return (
    <div className="chat-card-container" onClick={handleChatSelectClick}>
      <img
        src={otherUser ? otherUser.profilePic : null}
        alt={otherUser.name}
        className="chat-card-img"
      />
      <div className="chat-card-text">
        <span className="chat-card-name">
          {otherUser ? otherUser.username : null}
        </span>
        <span className="chat-card-last-message">
          {chat.lastMessage ? chat.lastMessage.text : null}
        </span>
      </div>
    </div>
  );
};
export default ChatCard;
