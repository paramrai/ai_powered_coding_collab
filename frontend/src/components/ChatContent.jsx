import React from "react";

const ChatContent = ({ setIsChatOpen }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-white font-bold">Chat</h2>
        <button
          onClick={() => setIsChatOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          Close
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Chat messages will go here */}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        className="w-full p-3 bg-slate-700 text-white rounded-lg mt-4"
      />
    </div>
  );
};

export default ChatContent;
