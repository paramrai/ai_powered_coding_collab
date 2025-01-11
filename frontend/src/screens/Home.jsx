import React, { useEffect, useState } from "react";
import CodeSpace from "../components/CodeSpace";
import MobileChatOption from "../components/MobileChatOption";
import DesktopChatOption from "../components/DesktopChatOption";
import LeftBar from "../components/LeftBar";
import LeftBarPanel from "../components/LeftBarPanel";
import { BsChatDots } from "react-icons/bs";

const Home = () => {
  const [isMobile, setIsMobile] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isLeftbarPanel, setIsLeftbarPanel] = useState(!isMobile);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth <= 768);
    }
    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main
      className="main_container max-h-screen w-full
                 overflow-hidden flex bg-slate-900"
    >
      <LeftBar
        isLeftbarPanel={isLeftbarPanel}
        setIsLeftbarPanel={setIsLeftbarPanel}
      />
      <LeftBarPanel
        isMobile={isMobile}
        isLeftbarPanel={isLeftbarPanel}
        setIsLeftbarPanel={setIsLeftbarPanel}
      />
      <CodeSpace isMobile={isMobile} />
      <MobileChatOption isMobile={isMobile} />
      <DesktopChatOption
        isMobile={isMobile}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />
      {!isChatOpen && (
        <button
          className="fixed bottom-32 right-6 p-4 bg-blue-600 
                   text-white rounded-full shadow-lg z-50"
          onClick={() => setIsChatOpen(true)}
        >
          <BsChatDots />
        </button>
      )}
    </main>
  );
};

export default Home;
