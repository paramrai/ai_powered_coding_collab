import React, { useState, useEffect } from "react";
import ChatContent from "./ChatContent";

const DesktopChatOption = ({ isMobile, isChatOpen, setIsChatOpen }) => {
  return (
    !isMobile &&
    isChatOpen && (
      <div className="bg-slate-900 p-4 flex-2">
        <ChatContent setIsChatOpen={setIsChatOpen} />
      </div>
    )
  );
};

export default DesktopChatOption;
