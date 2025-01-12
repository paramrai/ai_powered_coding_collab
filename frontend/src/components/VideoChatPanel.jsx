import React from "react";
import { useSocket } from "../context/socket.context";
import { FaMicrophone, FaVideo, FaPhone, FaPhoneSlash } from "react-icons/fa";

const VideoChatPanel = ({ setIsChatOpen }) => {
  const socket = useSocket();

  const handleCallRequest = () => {};

  return (
    <div className="max-h-[200px] h-[200px] w-full flex justify-between flex-shrink-[0] flex-grow-[0] flex-auto">
      <div className="left flex-1 border-r-[1px] border-slate-800">
        <div className="bg-orange-400 w-full h-full">
          <div className="calling_option flex justify-center gap-4 relative top-[70%] bg-yellow-600">
            <i className="text-lg bg-green-700 p-3 rounded-full text-slate-950 cursor-pointer">
              <FaMicrophone />
            </i>
            <i className="text-lg bg-green-700 p-3 rounded-full text-slate-950 cursor-pointer">
              <FaVideo />
            </i>
            <i className="text-lg bg-red-700 p-3 rounded-full text-slate-950 cursor-pointer overflow-x-hidden">
              <FaPhoneSlash />
            </i>
          </div>
        </div>
      </div>
      <div className="right flex-1 p-4 overflow-y-auto scrollbar-hide overflow-x-hidden flex justify-center items-center">
        <i
          className="text-blue-500 underline cursor-pointer"
          onClick={() => setIsChatOpen(true)}
        >
          Invite a friend
        </i>
      </div>
    </div>
  );
};

export default VideoChatPanel;
