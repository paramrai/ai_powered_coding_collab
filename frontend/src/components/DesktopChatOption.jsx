import React from "react";
import ChatContent from "./chats/ChatContent";
import { useMobileCheck } from "../hooks/useMobileCheck";

const DesktopChatOption = ({ isChatOpen, setIsChatOpen }) => {
  const isMobile = useMobileCheck();

  return (
    !isMobile &&
    isChatOpen && (
      <div className="bg-slate-900 flex-2 p-2 w-[400px]">
        <ChatContent setIsChatOpen={setIsChatOpen} />
      </div>
    )
  );
};

export default DesktopChatOption;
