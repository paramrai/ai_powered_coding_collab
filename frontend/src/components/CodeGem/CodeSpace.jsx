import React, { useEffect, useRef, useState } from "react";
import OpenFiles from "./OpenFiles";
import VideoChatPanel from "./VideoChatPanel";
import { useSelector } from "react-redux";
import {
  selectActiveFile,
  selectFileTree,
  selectPath,
} from "../../redux/slices/gemSlice";
import { updateHeight } from "../../utils/hieght";

const CodeSpace = ({
  isVideoChatOpen,
  setIsVideoChatOpen,
  ownerOrCollaber,
}) => {
  const codeRef = useRef(null);
  const activeFile = useSelector(selectActiveFile);
  const path = useSelector(selectPath);
  const fileTree = useSelector(selectFileTree);
  const [content, setContent] = useState("");
  const [isFileSaved, setIsFileSaved] = useState(true);
  const codeSpaceRef = useRef();

  // for Mob ui
  useEffect(() => {
    updateHeight(codeSpaceRef);
    window.addEventListener("resize", updateHeight(codeSpaceRef));
  }, []);

  function findFileAndRead(iterable, name) {
    if (!Array.isArray(iterable)) {
      console.error("iterable is not an array");
      return;
    }

    for (let child of iterable) {
      if (child.name === name && child.type === "file") {
        if (child.content) {
          return child.content;
        } else {
          return "";
        }
      }

      if (child.children) {
        const content = findFileAndRead(child.children, name);
        if (content) return content;
      }
    }
  }

  useEffect(() => {
    if (!activeFile) {
      setContent("");
    } else {
      const savedContent = findFileAndRead(fileTree, activeFile, path);

      if (savedContent) {
        setContent(savedContent);
      } else {
        setContent("");
      }
    }
  }, [activeFile]);

  useEffect(() => {
    const newContent = findFileAndRead(fileTree, activeFile, path);
    setContent(newContent);
  }, [fileTree]);

  const handleCodeChange = (e) => {
    const prevContent = findFileAndRead(fileTree, activeFile, path);

    setContent(e.target.value);
    setIsFileSaved(content === prevContent);
  };

  return (
    <div
      ref={codeSpaceRef}
      className="h-full w-auto overflow-hidden flex-1 flex flex-col"
    >
      <OpenFiles
        content={content}
        setContent={setContent}
        isFileSaved={isFileSaved}
        setIsFileSaved={setIsFileSaved}
      />
      <textarea
        ref={codeRef}
        value={content}
        onChange={handleCodeChange}
        name="code_space"
        id="code_space"
        className="w-full bg-slate-800 text-gray-100 
                   font-mono text-sm p-4 outline-none 
                   resize-none transition-colors duration-200
                   select-none user-select-none whitespace-nowrap
                   [&::-webkit-user-select]:none
                   [&::-moz-user-select]:none
                   [&::-ms-user-select]:none
                   flex-grow-[1] scrollbar-hide"
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
      <VideoChatPanel
        setIsVideoChatOpen={setIsVideoChatOpen}
        isVideoChatOpen={isVideoChatOpen}
      />
    </div>
  );
};

export default CodeSpace;
