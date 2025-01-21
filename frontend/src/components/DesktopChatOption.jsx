import React, { useRef } from "react";
import ChatContent from "./chats/ChatContent";
import { useMobileCheck } from "../hooks/useMobileCheck";
import { useResizePanel } from "../hooks/useResizePanel";
import {
  resizeHandleClasses,
  resizableContainerClasses,
} from "../styles/resizeHandle";

const DesktopChatOption = ({ isChatOpen, setIsChatOpen, width, setWidth }) => {
  const isMobile = useMobileCheck();
  const chatPanelRef = useRef(null);

  const handleResize = useResizePanel(chatPanelRef, "horizontal", {
    minWidth: 300,
    maxWidth: 800,
    onResize: setWidth,
    reverse: true,
    onClose: () => setIsChatOpen(false),
    closeAtWidth: 310, // Slightly higher than minWidth to create a "snap" effect
  });

  if (!isChatOpen || isMobile) return null;

  return (
    <div
      ref={chatPanelRef}
      className={`${resizableContainerClasses} h-[100vh] bg-red-900 border-l border-slate-700`}
      style={{ width: `${width}px` }}
    >
      <div
        className={`${resizeHandleClasses.horizontal} left-0`}
        onMouseDown={handleResize}
      />
      <div className="h-full pl-2 pr-1 py-1 overflow-hidden">
        <ChatContent setIsChatOpen={setIsChatOpen} />
      </div>
    </div>
  );
};

export default DesktopChatOption;
