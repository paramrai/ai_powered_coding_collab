import React, { useEffect, useRef, useState } from "react";
import OpenFiles from "./OpenFiles";
import VideoChatPanel from "./VideoChatPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveFile,
  selectFileTree,
  selectPath,
  setActiveFile,
} from "../../redux/slices/gemSlice";
import * as Diff from "diff";

const CodeSpace = ({ isVideoChatOpen, setIsVideoChatOpen }) => {
  const codeRef = useRef(null);
  const activeFile = useSelector(selectActiveFile);
  const path = useSelector(selectPath);
  const fileTree = useSelector(selectFileTree);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const [isFileSaved, setIsFileSaved] = useState(true);

  function findFileAndRead(iterable, name, path) {
    if (!Array.isArray(iterable)) {
      console.error("iterable is not an array");
      return;
    }

    for (let [index, child] of iterable.entries()) {
      if (child.name === name) {
        if (child.type === "file") {
          const content = iterable[index].content;
          console.log({ name, content });
          return content;
        }
      }

      if (child.children) {
        const content = findFileAndRead(child.children, name, path);
        return content;
      }
    }
  }

  useEffect(() => {
    if (!activeFile) {
      setContent("");
    } else {
      const savedContent = findFileAndRead(fileTree, activeFile, path);
      setContent(savedContent);
    }
  }, [activeFile]);

  useEffect(() => {
    const newContent = findFileAndRead(fileTree, activeFile, path);
    setContent(newContent);
    // const newLines = newContent?.split("\n");
    // const prevLines = content?.split("\n");

    // const textarea = codeRef.current;

    // const uniqueLines = newLines?.filter((line) => !prevLines?.includes(line));
    // const regex = /\\b(${uniqueLines.join('|')})\\b/gi;

    // const matches = content.match({ regex });
    // console.log(matches);
  }, [fileTree]);

  const handleCodeChange = (e) => {
    setContent(e.target.value);
    setIsFileSaved(false);
  };

  return (
    <div className="min-h-screen w-auto overflow-hidden flex-1 flex flex-col">
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
