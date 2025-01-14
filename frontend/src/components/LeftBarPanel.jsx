import React, { useState } from "react";
import { FaFolder, FaFolderOpen, FaFile, FaReact, FaJs } from "react-icons/fa";
import { SiTailwindcss, SiVite } from "react-icons/si";
import { selectFiles, setOpenFiles } from "../redux/slices/gemSlice";
import { useDispatch, useSelector } from "react-redux";

const fileTree = {
  name: "ai_powered_coding_collab",
  type: "folder",
  children: [
    {
      name: "frontend",
      type: "folder",
      children: [
        {
          name: "src",
          type: "folder",
          children: [
            {
              name: "components",
              type: "folder",
              children: [
                { name: "LeftBar.jsx", type: "file", icon: <FaReact /> },
                { name: "LeftBarPanel.jsx", type: "file", icon: <FaReact /> },
                { name: "CodeSpace.jsx", type: "file", icon: <FaReact /> },
                { name: "ChatContent.js", type: "file", icon: <FaJs /> },
              ],
            },
            {
              name: "screens",
              type: "folder",
              children: [{ name: "Home.jsx", type: "file", icon: <FaReact /> }],
            },
            { name: "App.jsx", type: "file", icon: <FaReact /> },
            { name: "main.jsx", type: "file", icon: <FaReact /> },
          ],
        },
        { name: "tailwind.config.js", type: "file", icon: <SiTailwindcss /> },
        { name: "vite.config.js", type: "file", icon: <SiVite /> },
      ],
    },
  ],
};

const FileTreeItem = ({ fileTree, depth = 0.5 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openFiles = useSelector(selectFiles);
  const dispatch = useDispatch();

  const handleOpenFile = (file) => {
    const fileExists = openFiles.some(
      (openFile) => openFile.name === file.name
    );
    if (!fileExists) {
      dispatch(setOpenFiles(file));
    }
  };

  return (
    <div className="group">
      <div
        className="flex items-center hover:bg-slate-800 px-2 py-1
                   cursor-pointer"
        style={{ paddingLeft: `${depth < 6 ? depth * 1 : 6}rem` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {fileTree.type === "folder" ? (
          <>
            <span className="text-yellow-500 mr-2">
              {isOpen ? <FaFolderOpen /> : <FaFolder />}
            </span>
            <span className="text-gray-300">{fileTree.name}</span>
          </>
        ) : (
          <button
            onClick={() => handleOpenFile({ name: fileTree.name, icon: "" })}
            className="flex items-center"
          >
            <span className="text-blue-400 mr-2 pointer-events-none">
              {fileTree.icon || <FaFile />}
            </span>
            <span className="text-gray-300 pointer-events-none">
              {fileTree.name}
            </span>
          </button>
        )}
      </div>

      {isOpen && fileTree.children && (
        <div>
          {fileTree.children.map((child, index) => (
            <FileTreeItem key={index} fileTree={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const LeftBarPanel = ({ isMobile, isLeftbarPanel, setIsLeftbarPanel }) => {
  return (
    !isMobile &&
    isLeftbarPanel && (
      <div
        className="h-screen w-64 bg-slate-900 overflow-x-hidden
                 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 
               scrollbar-track-slate-900"
      >
        <FileTreeItem fileTree={fileTree} />
      </div>
    )
  );
};

export default LeftBarPanel;
