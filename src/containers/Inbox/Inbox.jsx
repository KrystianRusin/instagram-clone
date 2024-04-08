import InboxSidebar from "../../components/InboxSidebar/InboxSidebar";
import "./Inbox.css";

const Inbox = () => {
  return (
    <div className="inbox-container">
      <div className="inbox-sidebar-wrapper">
        <InboxSidebar />
      </div>
    </div>
  );
};

export default Inbox;
