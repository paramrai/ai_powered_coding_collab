import React from "react";
import VideoChatPanel from "./VideoChatPanel";
import OpenFiles from "./OpenFiles";

const CodeSpace = ({ isMobile, setIsChatOpen }) => {
  return (
    <div className="min-h-screen w-auto overflow-hidden flex-1 flex flex-col">
      <OpenFiles />
      <textarea
        name="code_space"
        id="code_space"
        className="w-full bg-slate-800 text-gray-100 
                   font-mono text-sm p-4 outline-none 
                   resize-none transition-colors duration-200
                   select-none user-select-none
                   [&::-webkit-user-select]:none
                   [&::-moz-user-select]:none
                   [&::-ms-user-select]:none
                   flex-grow-[1]"
        placeholder="// Start coding here..."
        spellCheck="false"
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
        style={{
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
          pointerEvents: "auto",
          WebkitUserDrag: "none",
          WebkitTextFillColor: "currentcolor",
        }}
      ></textarea>
      {!isMobile && <VideoChatPanel setIsChatOpen={setIsChatOpen} />}
    </div>
  );
};

export default CodeSpace;
