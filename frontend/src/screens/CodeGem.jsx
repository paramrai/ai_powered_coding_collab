import React, { useState } from "react";
import CodeSpace from "../components/CodeSpace";
import MobileChatOption from "../components/MobileChatOption";
import DesktopChatOption from "../components/DesktopChatOption";
import LeftBar from "../components/LeftBar";
import LeftBarPanel from "../components/LeftBarPanel";
import { useMobileCheck } from "../hooks/useMobileCheck";

const CodeGem = () => {
  const isMobile = useMobileCheck();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isLeftbarPanel, setIsLeftbarPanel] = useState(!isMobile);

  return (
    <main className="main_container max-h-screen w-full overflow-hidden flex bg-slate-900">
      <LeftBar
        isLeftbarPanel={isLeftbarPanel}
        setIsLeftbarPanel={setIsLeftbarPanel}
      />
      <LeftBarPanel
        isLeftbarPanel={isLeftbarPanel}
        setIsLeftbarPanel={setIsLeftbarPanel}
      />
      <CodeSpace />
      <MobileChatOption />
      <DesktopChatOption
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />
    </main>
  );
};

export default CodeGem;
