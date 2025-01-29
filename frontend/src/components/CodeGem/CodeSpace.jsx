import React, { useEffect, useRef, useState } from "react";
import OpenFiles from "./OpenFiles";
import VideoChatPanel from "./VideoChatPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewFile,
  selectActiveFile,
  selectFileTree,
  selectOpenFiles,
  selectPath,
} from "../../redux/slices/gemSlice";
import { updateHeight } from "../../utils/hieght";
import Editor from "@monaco-editor/react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full w-full bg-[#1e1e1e]">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const CodeSpace = ({ isVideoChatOpen, setIsVideoChatOpen }) => {
  const activeFile = useSelector(selectActiveFile);
  const path = useSelector(selectPath);
  const fileTree = useSelector(selectFileTree);
  const [content, setContent] = useState("");
  const [isFileSaved, setIsFileSaved] = useState(true);
  const codeSpaceRef = useRef();
  const [isEditorLoading, setIsEditorLoading] = useState(true);

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
    if (newContent) {
      setContent(newContent);
    } else {
      setContent("");
    }
  }, [fileTree]);

  const handleCodeChange = (newVal) => {
    const prevContent = findFileAndRead(fileTree, activeFile, path);
    setContent(newVal);
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
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          beforeMount={(monaco) => {
            monaco.editor.defineTheme("custom-dark", {
              base: "vs-dark",
              inherit: true,
              rules: [],
              colors: {
                "editor.background": "#1e293b",
              },
            });
          }}
          theme="custom-dark"
          value={content}
          onChange={handleCodeChange}
          loading={<LoadingSpinner />}
          onMount={() => setIsEditorLoading(false)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            lineNumbers: "on",
            glyphMargin: false,
            folding: true,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 3,
          }}
        />
      </div>
      <VideoChatPanel
        setIsVideoChatOpen={setIsVideoChatOpen}
        isVideoChatOpen={isVideoChatOpen}
      />
    </div>
  );
};

export default CodeSpace;
