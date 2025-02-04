import React, { useCallback, useEffect, useRef, useState } from "react";
import OpenFiles from "./OpenFiles";
import VideoChatPanel from "./VideoChatPanel";
import { useSelector } from "react-redux";
import {
  selectActiveFile,
  selectCurrentGem,
  selectFileTree,
  selectPath,
} from "../../redux/slices/gemSlice";
import { updateHeight } from "../../utils/hieght";
import Editor from "@monaco-editor/react";
import { selectUser } from "../../redux/slices/userSlice";
import { useSocket } from "../../redux/socket/SocketProvider";
import { getLanguage } from "../../utils/getLanguage";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-full w-full bg-[#1e1e1e]">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export function findFileAndRead(iterable, name) {
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

const CodeSpace = ({ isVideoChatOpen, setIsVideoChatOpen }) => {
  const socket = useSocket();
  const path = useSelector(selectPath);
  const activeFile = useSelector(selectActiveFile);
  const fileTree = useSelector(selectFileTree);
  const gem = useSelector(selectCurrentGem);
  const [content, setContent] = useState("");
  const [isFileSaved, setIsFileSaved] = useState(true);
  const [isEditorLoading, setIsEditorLoading] = useState(true);
  const codeSpaceRef = useRef();
  const user = useSelector(selectUser);
  const [language, setLanguage] = useState("plaintext");

  useEffect(() => {
    if (activeFile) {
      const language = getLanguage(activeFile);

      if (language) {
        setLanguage(language);
      }
    }
  }, [activeFile]);

  useEffect(() => {
    if (socket) {
      socket.emit("join-room", gem._id);
    }
  }, [socket]);

  // for Mob ui
  useEffect(() => {
    updateHeight(codeSpaceRef);
    window.addEventListener("resize", updateHeight(codeSpaceRef));
  }, []);

  useEffect(() => {
    setIsFileSaved(true);

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

  const handleCodeChange = useCallback(
    (newContent) => {
      const savedContent = findFileAndRead(fileTree, activeFile);

      if (activeFile) {
        setContent(newContent);
        setIsFileSaved(newContent === savedContent);

        if (socket) {
          socket.emit("codeChange", {
            user,

            gem,
            file: activeFile,
            content: newContent,
          });
        }
      }
    },
    [activeFile]
  );

  // recieve codeChanged
  useEffect(() => {
    if (socket) {
      socket.on("codeChanged", ({ user, file, gem, content }) => {
        setContent(content);
      });
    }
  }, [socket]);

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
        {activeFile ? (
          <Editor
            height="100%"
            className="monaco-editor"
            language={language}
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
              wordWrap: "off",
              lineNumbers: "on",
              glyphMargin: false,
              folding: true,
              lineDecorationsWidth: 0,
              lineNumbersMinChars: 3,
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col gap-2 justify-center items-center bg-slate-800 text-gray-300 p-3 rounded-lg shadow-lg z-50 transition-opacity duration-300 ease-in-out ">
            <p className="text-sm">Use Ctrl+Z for undo</p>
            <p className="text-sm">Multiple users can edit simultaneously</p>
            <p className="text-sm">Double click to select word</p>
            <p className="text-sm">Triple click to select line</p>
          </div>
        )}
      </div>
      <VideoChatPanel
        setIsVideoChatOpen={setIsVideoChatOpen}
        isVideoChatOpen={isVideoChatOpen}
      />
    </div>
  );
};

export default CodeSpace;
