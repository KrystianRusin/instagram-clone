import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import db from "../../firebase";
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

  useEffect(() => {
    const docRef = doc(db, "chats", chat.id);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const chatData = docSnap.data();
        if (chatData.messages.length > 0) {
          setLastMessage(chatData.messages[chatData.messages.length - 1]);
        }
      } else {
        console.log("No such document!");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [chat.id, currUser]);

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
          {lastMessage ? lastMessage.text : null}
        </span>
      </div>
    </div>
  );
};
export default ChatCard;
