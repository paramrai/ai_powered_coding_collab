import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ChatContent from "../chats/ChatContent";
import { useMobileCheck } from "../../hooks/useMobileCheck";

const MobileChatOption = () => {
  const isMobile = useMobileCheck();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    isMobile && (
      <AnimatePresence mode="wait">
        {isChatOpen ? (
          <motion.div
            initial={{ scale: 0.3, opacity: 0, y: "50%", x: "50%" }}
            animate={{ scale: 1, opacity: 1, y: 0, x: 0 }}
            exit={{
              scale: 0.3,
              opacity: 0,
              y: "0%",
              x: "0%",
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 15,
              mass: 1,
              duration: 0.2,
            }}
            className="fixed inset-0 bg-slate-900 z-50 p-2"
          >
            <ChatContent setIsChatOpen={setIsChatOpen} />
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 p-4 bg-blue-600 
                     text-white rounded-full shadow-lg z-50"
          >
            <FaRobot size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    )
  );
};

export default MobileChatOption;
