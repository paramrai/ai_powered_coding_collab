import React, { useEffect, useState } from "react";
import CodeSpace from "../components/CodeSpace";
import MobileChatOption from "../components/MobileChatOption";
import DesktopChatOption from "../components/DesktopChatOption";
import LeftBar from "../components/LeftBar";
import LeftBarPanel from "../components/LeftBarPanel";
import { motion, AnimatePresence } from "framer-motion";

const Main = () => {
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
      <CodeSpace isMobile={isMobile} setIsChatOpen={setIsChatOpen} />
      <MobileChatOption isMobile={isMobile} />
      <DesktopChatOption
        isMobile={isMobile}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
      />
    </main>
  );
};

const Home = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{
          scale: 0.9,
          opacity: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 10,
          mass: 1,
          duration: 0.8,
        }}
        className="fixed inset-0 bg-red-900 z-50 flex justify-center items-center"
      >
        <Main />
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
