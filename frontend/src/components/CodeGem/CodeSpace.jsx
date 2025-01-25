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

const CodeSpace = () => {
  const codeRef = useRef();
  const activeFile = useSelector(selectActiveFile);
  const path = useSelector(selectPath);
  const fileTree = useSelector(selectFileTree);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  function findFileAndRead(iterable, name, path) {
    if (!Array.isArray(iterable)) {
      console.error("iterable is not an array");
      return;
    }

    for (let [index, child] of iterable.entries()) {
      if (child.name === name) {
        if (child.type === "file") {
          // console.log({ content: iterable[index].content });
          setContent(iterable[index].content);
        }
      }

      if (child.children) {
        findFileAndRead(child.children, name, path);
      }
    }
  }

  useEffect(() => {
    dispatch(setActiveFile(""));

    if (!activeFile) {
      setContent("");
    }
  }, [activeFile]);

  useEffect(() => {
    findFileAndRead(fileTree, activeFile, path);
  }, [activeFile]);

  const handleCodeChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <div className="min-h-screen w-auto overflow-hidden flex-1 flex flex-col">
      <OpenFiles content={content} setContent={setContent} />
      <textarea
        ref={codeRef}
        value={content}
        onChange={handleCodeChange}
        name="code_space"
        id="code_space"
        className="w-full bg-slate-800 text-gray-100 
                   font-mono text-sm p-4 outline-none 
                   resize-none transition-colors duration-200
                   select-none user-select-none
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
      <VideoChatPanel />
    </div>
  );
};

export default CodeSpace;
