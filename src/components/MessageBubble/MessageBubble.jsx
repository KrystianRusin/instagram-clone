import "./MessageBubble.css";

const MessageBubble = ({ currUser, message }) => {
  const isCurrentUser = currUser === message.userId;

  return (
    <div
      className={`message-bubble-container ${isCurrentUser ? "right" : "left"}`}
    >
      <div className="message-bubble">{message.text}</div>
    </div>
  );
};
export default MessageBubble;
