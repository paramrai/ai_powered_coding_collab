import React, { useEffect, useRef, useState } from "react";
import { FaMicrophone, FaVideo, FaPhone, FaPhoneSlash } from "react-icons/fa";
import { useMobileCheck } from "../hooks/useMobileCheck";
import { useResizePanel } from "../hooks/useResizePanel";
import {
  resizeHandleClasses,
  resizableContainerClasses,
} from "../styles/resizeHandle";

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

const VideoChatPanel = () => {
  const isMobile = useMobileCheck();
  const [localStream, setLocalStream] = useState(null);

  // refs
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const videoPanelRef = useRef(null);
  const handleResize = useResizePanel(videoPanelRef, "vertical", {
    minHeight: 150,
    maxHeight: 400,
    reverse: true, // Add this to fix the direction
  });

  return (
    !isMobile && (
      <div
        ref={videoPanelRef}
        className={`${resizableContainerClasses} h-[200px] w-full flex justify-between`}
      >
        <div
          className={resizeHandleClasses.vertical}
          onMouseDown={handleResize}
        />
        <div className="left w-full h-full border-r-[1px] border-slate-800">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-full h-full"
          ></video>
        </div>
        <div className="right w-full h-full p-4 overflow-y-auto scrollbar-hide overflow-x-hidden flex justify-center items-center">
          <video ref={remoteVideoRef} autoPlay muted></video>
        </div>
      </div>
    )
  );
};

export default VideoChatPanel;
