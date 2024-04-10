import { useEffect } from "react";
import InboxSidebar from "../../components/InboxSidebar/InboxSidebar";
import "./Inbox.css";

const Inbox = ({ setNavCollapsed }) => {
  useEffect(() => {
    setNavCollapsed(true);
  }, []);

  return (
    <div className="inbox-container">
      <div className="inbox-sidebar-wrapper">
        <InboxSidebar />
      </div>
    </div>
  );
};

export default Inbox;
