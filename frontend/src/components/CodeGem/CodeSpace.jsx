import React, { useEffect, useRef, useState } from "react";
import OpenFiles from "./OpenFiles";
import VideoChatPanel from "./VideoChatPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveFile,
  selectFileTree,
  selectPath,
} from "../../redux/slices/gemSlice";
import useOwnerOrCollaberCheck from "../../hooks/useOwnerOrCollaberCheck";
import { toast } from "react-toastify";

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
  const dispatch = useDispatch();
  const [isFileSaved, setIsFileSaved] = useState(true);
  const isOwnerOrCollaber = useOwnerOrCollaberCheck();

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
          console.log("file not found");
          return content;
        }
      }

      if (child.children) {
        const content = findFileAndRead(child.children, name, path);
        if (content) return content;
      }
    }

    console.log("file not found");
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
    const prevContent = findFileAndRead(fileTree, activeFile, path);

    if (isOwnerOrCollaber) {
      setContent(e.target.value);
      setIsFileSaved(content === prevContent);
    } else {
      toast.info(
        "You are not owner or collaborator to this gem so you can only see this gem , create your own gem to edit , chats and prompt to ai , and invite users to your gems"
      );
    }
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
      {ownerOrCollaber && (
        <VideoChatPanel
          setIsVideoChatOpen={setIsVideoChatOpen}
          isVideoChatOpen={isVideoChatOpen}
        />
      )}
    </div>
  );
};

export default CodeSpace;
