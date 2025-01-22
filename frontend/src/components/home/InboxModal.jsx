import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";

const modalVariants = {
  hidden: {
    opacity: 0,
    y: "-100%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.3,
    },
  },
};

const InboxModal = ({ showInvites, setShowInvites }) => {
  const user = useSelector(selectUser);
  const recievedInvites = user.recievedInvites;
  const [activeInviteTab, setActiveInviteTab] = useState("received");
  const sentInvites = user.sentInvites;

  console.log(sentInvites.recieverIds);

  return (
    <AnimatePresence>
      {showInvites && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 backdrop-blur-sm"
            onClick={() => setShowInvites(false)}
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bg-gray-800 rounded-lg shadow-xl z-50
             max-w-sm mx-auto inset-x-0 top-20"
          >
            <div className="p-6 flex-1 overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
              <h2 className="text-2xl font-bold text-white mb-4">Invites</h2>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveInviteTab("received")}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 
              ${
                activeInviteTab === "received"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
                >
                  Received
                </button>
                <button
                  onClick={() => setActiveInviteTab("sent")}
                  className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 
              ${
                activeInviteTab === "sent"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
                >
                  Sent
                </button>
              </div>

              {activeInviteTab === "received" ? (
                recievedInvites?.length > 0 ? (
                  <div className="space-y-4">
                    {recievedInvites.map((invite, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-700 p-4 rounded-lg border border-gray-600"
                      >
                        <p className="text-white font-medium mb-1">
                          From: {invite.senderId}
                        </p>
                        <p className="text-gray-300 text-sm mb-3">
                          Project: {invite.gemId}
                        </p>
                        <div className="flex gap-3">
                          <button
                            className="flex-1 bg-green-600 hover:bg-green-700 
                        text-white rounded-md py-2 px-4 transition-all duration-200 
                        hover:shadow-lg hover:shadow-green-600/30 active:scale-95"
                          >
                            Accept
                          </button>
                          <button
                            className="flex-1 bg-red-600 hover:bg-red-700 
                        text-white rounded-md py-2 px-4 transition-all duration-200 
                        hover:shadow-lg hover:shadow-red-600/30 active:scale-95"
                          >
                            Reject
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center">
                    No received invites
                  </p>
                )
              ) : (
                <div className="space-y-4">
                  {sentInvites.length > 0 ? (
                    sentInvites.map((invite, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-700 p-4 rounded-lg border border-gray-600"
                      >
                        <p className="text-white font-medium mb-1">
                          Gem: {invite.gemId}
                        </p>
                        <div className="space-y-2">
                          {invite.recieverIds.map((recieverId, idx) => (
                            <div
                              key={idx}
                              className="flex gap-2 items-center justify-between bg-gray-600 p-2 rounded"
                            >
                              <span className="text-gray-300">
                                To: {recieverId}
                              </span>
                              <button
                                className="bg-red-600 hover:bg-red-700 
                                text-white rounded-md py-1 px-3 text-sm transition-all duration-200 
                                hover:shadow-lg hover:shadow-red-600/30 active:scale-95"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center">No sent invites</p>
                  )}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-700">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white 
            px-4 py-2 rounded-lg transition-all duration-200 
            hover:shadow-lg active:scale-95"
                onClick={() => setShowInvites(false)}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InboxModal;
