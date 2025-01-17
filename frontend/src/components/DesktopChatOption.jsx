import React, { useState, useEffect } from "react";
import ChatContent from "./ChatContent";

const DesktopChatOption = ({ isMobile, isChatOpen, setIsChatOpen }) => {
  return (
    !isMobile &&
    isChatOpen && (
      <div className="bg-slate-900 flex-2 p-2 max-w-[400px]">
        <ChatContent setIsChatOpen={setIsChatOpen} />
      </div>
    )
  );
};

export default DesktopChatOption;
