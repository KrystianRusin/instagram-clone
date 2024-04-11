import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import db from "../../firebase";
import "./ChatRoom.css";

const ChatRoom = () => {
  const [chatData, setChatData] = useState(null);
  const [user, setUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  const { chatId } = useParams();

  useEffect(() => {
    const fetchChatData = async () => {
      const docRef = doc(db, "chats", chatId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setChatData(docSnap.data());
      } else {
        console.log("No such document!");
      }
      console.log(chatData);
    };

    fetchChatData();
  }, [chatId]);

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
    //Compare Id of current users to users stored in chat data, then retrieve the other user from mongodb
    if (chatData) {
      const otherUserId = Object.keys(chatData.users).find(
        (id) => id !== user._id
      );
      const fetchOtherUser = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/users/id/${otherUserId}`
        );
        const data = await response.json();
        setOtherUser(data);
      };
      fetchOtherUser();
    }
  }, [chatData]);

  const handelNewMessage = async (e) => {
    console.log("Sending message...");
  };

  return (
    <div className="chat-room-container">
      <div className="chat-room-header">
        <div className="chat-room-participant-info">
          <img
            src={otherUser ? otherUser.profilePic : null}
            alt={otherUser ? otherUser.username : null}
            className="chat-room-img"
          />
          <span className="chat-room-name">
            {otherUser ? otherUser.username : null}
          </span>
        </div>
      </div>
      <div className="messages-container"></div>
      <form className="message-input-form" onSubmit={handelNewMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          className="message-input"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        ></input>
        <button
          type="submit"
          className="message-send-btn"
          disabled={messageInput.trim().length === 0}
        >
          Send
        </button>
      </form>
    </div>
  );
};
export default ChatRoom;
