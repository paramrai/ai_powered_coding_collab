import React, { useState } from "react";
import InviteScreen from "./InviteScreen";
import GroupChatScreen from "./GroupChatScreen";
import AiScreen from "./AiScreen";
import TabOptions from "./TabOptions";

const ChatContent = ({ setIsChatOpen }) => {
  const [activeTab, setActiveTab] = useState("ai");

  return (
    <div className="h-full flex flex-col">
      <TabOptions
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setIsChatOpen={setIsChatOpen}
      />
      <div className="chat_window mb-12 flex-1 flex flex-col gap-2 scroll-smooth h-full overflow-y-auto py-1 overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
        <AiScreen activeTab={activeTab} />
        <GroupChatScreen activeTab={activeTab} />
        <InviteScreen activeTab={activeTab} />
      </div>
    </div>
  );
};

export default ChatContent;
