import React, { useEffect, useState } from "react";
import {
  FaFolder,
  FaFolderOpen,
  FaFile,
  FaReact,
  FaJs,
  FaFolderPlus,
  FaSyncAlt,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { SiTailwindcss, SiVite } from "react-icons/si";
import { VscCollapseAll } from "react-icons/vsc";
import {
  addFileOrFolder,
  selectFileTree,
  selectOpenFiles,
  setActiveFile,
  setIsOpenedProp,
  setOpenFiles,
} from "../redux/slices/gemSlice";
import { useDispatch, useSelector } from "react-redux";

const FileTree = ({ fileTree, depth = 0.5 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsOpen(!isOpen);

    if (fileTree.type === "file") {
      dispatch(setOpenFiles({ name: fileTree.name, icon: "" }));
      dispatch(setActiveFile(fileTree.name));
    } else if (fileTree.type === "folder" || fileTree.type === "root") {
      dispatch(
        setIsOpenedProp({
          name: fileTree.name,
          type: fileTree.type,
        })
      );
    }
  };

  return (
    <>
      <div
        className="relative flex group items-center px-2 py-1
                   cursor-pointer hover:text-gray-200"
        style={{ paddingLeft: `${depth < 6 ? depth * 1 : 6}rem` }}
        onClick={handleClick}
      >
        {fileTree?.type === "root" && (
          <div className="flex items-center justify-center">
            <i className="text-gray-300 text-xs mr-1 translate-y-[1px]">
              {isOpen ? <FaChevronDown /> : <FaChevronRight />}
            </i>
            <span className="text-gray-300">{fileTree.name}</span>
          </div>
        )}
        {fileTree?.type === "folder" && (
          <>
            <span className="text-yellow-500 mr-2">
              {isOpen ? <FaFolderOpen /> : <FaFolder />}
            </span>
            <span className="text-gray-300">{fileTree?.name}</span>
          </>
        )}

        {fileTree?.type === "file" && (
          <button className="flex items-center">
            <span className="text-blue-400 mr-2 pointer-events-none">
              {fileTree?.icon || <FaFile />}
            </span>
            <span className="text-gray-300 pointer-events-none">
              {fileTree?.name}
            </span>
          </button>
        )}
      </div>

      {isOpen && (
        <div>
          {fileTree.children.map((child, index) => (
            <FileTree key={index} fileTree={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </>
  );
};

const LeftBarPanel = ({ isMobile, isLeftbarPanel, setIsLeftbarPanel }) => {
  const dispatch = useDispatch();

  const handleAddFileOrFolder = (name, type) => {
    dispatch(addFileOrFolder({ name, type }));
  };

  return (
    !isMobile &&
    isLeftbarPanel && (
      <div
        className="group relative h-full w-64 bg-slate-900 overflow-x-hidden
                 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 
               scrollbar-track-slate-900"
      >
        <div
          className="hidden group-hover:flex absolute top-0 right-0 gap-2 p-2 items-center pr-2 
        justify-end text-gray-400 bg-slate-900 w-max h-min ml-auto z-10"
        >
          <button
            onClick={() => handleAddFileOrFolder("newFile.js", "file")}
            className="text-sm cursor-pointer"
          >
            <FaFile />
          </button>
          <button
            onClick={() => handleAddFileOrFolder("newFolder", "folder")}
            className="text-sm cursor-pointer"
          >
            <FaFolderPlus />
          </button>
          <button onClick={() => {}} className="text-sm cursor-pointer">
            <FaSyncAlt />
          </button>
          <button onClick={() => {}} className="text-sm cursor-pointer">
            <VscCollapseAll />
          </button>
        </div>
        <FileTree fileTree={useSelector(selectFileTree)} />
      </div>
    )
  );
};

export default LeftBarPanel;
