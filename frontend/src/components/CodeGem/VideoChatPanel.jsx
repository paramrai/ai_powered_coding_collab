import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaVideo, FaPhone, FaPhoneSlash } from "react-icons/fa";
import { useMobileCheck } from "../../hooks/useMobileCheck";
import { useResizePanel } from "../../hooks/useResizePanel";
import {
  resizeHandleClasses,
  resizableContainerClasses,
} from "../../styles/resizeHandle";

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

const VideoChatPanel = ({ isVideoChatOpen, setIsVideoChatOpen }) => {
  const isMobile = useMobileCheck();
  const [panelHeight, setPanelHeight] = useState(200);
  const [localStream, setLocalStream] = useState(null);

  // refs
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const videoPanelRef = useRef(null);
  const handleResize = useResizePanel(videoPanelRef, "vertical", {
    minHeight: 150,
    maxHeight: 400,
    onResize: setPanelHeight,
    reverse: true,
  });

  if (!isVideoChatOpen || isMobile) return null;

  return (
    <div
      ref={videoPanelRef}
      className={`${resizableContainerClasses} w-full flex justify-between z-50`}
      style={{ height: `${panelHeight}px` }}
    >
      <div
        className={`${resizeHandleClasses.vertical} top-[-1px] h-[3px]`}
        onMouseDown={handleResize}
      />
      <div className="left w-full h-full border-r-[1px] border-slate-800 flex justify-center items-center text-gray-400">
        <div ref={localVideoRef} autoPlay muted>
          For Video chat coming soon
        </div>
      </div>
      <div className="right w-full h-full p-4 overflow-y-auto scrollbar-hide overflow-x-hidden flex justify-center items-center text-gray-400">
        <div ref={remoteVideoRef} autoPlay muted>
          For Video chat coming soon
        </div>
      </div>
    </div>
  );
};

export default VideoChatPanel;
