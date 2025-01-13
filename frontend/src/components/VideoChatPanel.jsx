import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaVideo, FaPhone, FaPhoneSlash } from "react-icons/fa";

const CallingOption = () => {
  return (
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
  );
};

const VideoChatPanel = ({ setIsChatOpen }) => {
  const [localStream, setLocalStream] = useState(null);

  // refs
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  return (
    <div className="max-h-[200px] h-[200px] w-full flex justify-between flex-shrink-[0] flex-grow-[0] flex-auto">
      <div className="left bg-orange-400 w-full h-full border-r-[1px] border-slate-800">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-full h-full"
        ></video>
      </div>
      <div
        onClick={() => setIsChatOpen(true)}
        className="right bg-green-600 w-full h-full p-4 overflow-y-auto scrollbar-hide overflow-x-hidden flex justify-center items-center"
      >
        <video ref={remoteVideoRef} autoPlay muted></video>
      </div>
    </div>
  );
};

export default VideoChatPanel;
