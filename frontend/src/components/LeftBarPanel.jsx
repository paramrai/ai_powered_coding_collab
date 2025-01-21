import React, { useEffect, useRef, useState } from "react";
import {
  FaFolder,
  FaFolderOpen,
  FaFolderPlus,
  FaSyncAlt,
  FaChevronDown,
  FaChevronRight,
  FaJs,
  FaPython,
  FaHtml5,
  FaReact,
  FaJava,
  FaPhp,
  FaCss3Alt,
  FaFileExcel,
  FaFileWord,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileCsv,
  FaFile,
} from "react-icons/fa";
import {
  SiRuby,
  SiSwift,
  SiTypescript,
  SiGo,
  SiKotlin,
  SiRust,
  SiDotenv,
} from "react-icons/si";
import { PiFileCSharp } from "react-icons/pi";

import { VscCollapseAll } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewFile,
  selectFileTree,
  setActiveFile,
  setCurrentPath,
  setOpenFiles,
} from "../redux/slices/gemSlice";
import { useMobileCheck } from "../hooks/useMobileCheck";
import { useResizePanel } from "../hooks/useResizePanel";

export const getFileIcon = (fileName) => {
  if (fileName.endsWith(".js")) return <FaJs className="text-yellow-400" />;
  if (fileName.endsWith(".py")) return <FaPython className="text-blue-400" />;
  if (fileName.endsWith(".html"))
    return <FaHtml5 className="text-orange-600" />;
  if (fileName.endsWith(".jsx")) return <FaReact className="text-blue-400" />;
  if (fileName.endsWith(".java")) return <FaJava className="text-red-600" />;
  if (fileName.endsWith(".php")) return <FaPhp className="text-purple-600" />;
  if (fileName.endsWith(".css")) return <FaCss3Alt className="text-blue-500" />;
  if (fileName.endsWith(".xlsx"))
    return <FaFileExcel className="text-green-600" />;
  if (fileName.endsWith(".docx"))
    return <FaFileWord className="text-blue-600" />;
  if (fileName.endsWith(".pdf")) return <FaFilePdf className="text-red-600" />;
  if (fileName.endsWith(".pptx"))
    return <FaFilePowerpoint className="text-orange-600" />;
  if (fileName.endsWith(".csv"))
    return <FaFileCsv className="text-green-400" />;
  if (fileName.endsWith(".rb")) return <SiRuby className="text-red-500" />;
  if (fileName.endsWith(".swift"))
    return <SiSwift className="text-orange-500" />;
  if (fileName.endsWith(".cs"))
    return <PiFileCSharp className="text-green-500" />;
  if (fileName.endsWith(".ts"))
    return <SiTypescript className="text-blue-500" />;
  if (fileName.endsWith(".go")) return <SiGo className="text-blue-400" />;
  if (fileName.endsWith(".kt")) return <SiKotlin className="text-purple-500" />;
  if (fileName.endsWith(".rs")) return <SiRust className="text-brown-500" />;
  if (fileName.endsWith(".env")) return <SiDotenv className="text-green-500" />;

  // Add more icons as needed
  return <FaFile className="text-blue-500" />;
};

const FileTree = ({
  fileTree,
  depth = 0.5,
  addingForm,
  showInput,
  setShowInput,
  type,
  setType,
  handleAddFileSubmit,
  lastOpenedFolder,
  setLastOpenedFolder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (fileTree.type === "file") {
      dispatch(setOpenFiles({ name: fileTree.name }));
      dispatch(setActiveFile(fileTree.name));
    } else if (fileTree.type === "folder" || fileTree.type === "root") {
      dispatch(setCurrentPath(fileTree.name));
      if (!isOpen) setLastOpenedFolder(fileTree.name);
    }
  };

  return (
    <>
      <div
        className="relative flex group items-center p-[0.5px] cursor-pointer hover:text-gray-200"
        style={{ paddingLeft: `${depth < 6 ? depth * 1 : 6}rem` }}
        onClick={handleClick}
      >
        {fileTree?.type === "root" && (
          <div className="flex items-center justify-center sticky top-0">
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
              {getFileIcon(fileTree?.name)}
            </span>
            <span className="text-gray-300 pointer-events-none">
              {fileTree?.name}
            </span>
          </button>
        )}
      </div>

      {lastOpenedFolder === fileTree?.name && showInput && (
        <form
          ref={addingForm}
          className="w-full flex gap-2 items-center text-gray-400 my-2"
          onSubmit={handleAddFileSubmit}
          style={{ paddingLeft: `${depth < 6 ? depth * 1 : 6}rem` }}
        >
          {type === "folder" ? (
            <FaFolder className="text-yellow-500" />
          ) : (
            <FaFile className="text-blue-400" />
          )}
          <input
            type="text"
            className="w-full bg-transparent ring-1 ring-orange-500 rounded-sm"
            onBlur={() => setShowInput(false)}
            autoFocus
          />
        </form>
      )}

      {isOpen && (
        <div>
          {fileTree.children?.map((child, index) => (
            <FileTree
              key={index}
              fileTree={child}
              depth={depth + 1}
              addingForm={addingForm}
              showInput={showInput}
              setShowInput={setShowInput}
              type={type}
              setType={setType}
              handleAddFileSubmit={handleAddFileSubmit}
              lastOpenedFolder={lastOpenedFolder}
              setLastOpenedFolder={setLastOpenedFolder}
            />
          ))}
        </div>
      )}
    </>
  );
};

const LeftBarPanel = ({ isLeftbarPanel, setIsLeftbarPanel }) => {
  const dispatch = useDispatch();
  const addingForm = useRef(null);
  const [type, setType] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [lastOpenedFolder, setLastOpenedFolder] = useState(null);
  const leftBarRef = useRef(null);
  const handleResize = useResizePanel(leftBarRef, "horizontal", {
    minWidth: 200,
    maxWidth: 600,
  });

  const fileTree = useSelector(selectFileTree)[0];

  const handleAddFileSubmit = (e) => {
    e.preventDefault();
    const input = addingForm.current.querySelector("input");
    const newFileName = input.value.trim();
    if (newFileName) {
      dispatch(
        addNewFile({
          type: type === "file" ? "file" : "folder",
          name: newFileName,
          icon: getFileIcon(newFileName),
        })
      );
      input.value = "";
      setShowInput(false);
      if (type === "file") {
        dispatch(setOpenFiles({ name: newFileName }));
        dispatch(setActiveFile(newFileName));
      }
    }
  };

  useEffect(() => {
    const input = addingForm.current?.querySelector("input");
    const handleBlur = () => setShowInput(false);

    if (showInput && input) {
      input.focus();
      input.addEventListener("blur", handleBlur);
    }
    return () => {
      if (input) {
        input.removeEventListener("blur", handleBlur);
      }
    };
  }, [showInput]);

  return (
    isLeftbarPanel && (
      <div
        ref={leftBarRef}
        className="group relative h-screen w-64 bg-slate-900 overflow-x-hidden 
        overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
      >
        <div className="hidden group-hover:flex absolute top-0 right-0 gap-2 p-2 items-center pr-2 justify-end text-gray-400 bg-slate-900 w-max h-min ml-auto z-10">
          <button
            onClick={() => {
              setType("file");
              setShowInput(true);
            }}
            className="text-sm cursor-pointer"
          >
            <FaFile />
          </button>
          <button
            onClick={() => {
              setType("folder");
              setShowInput(true);
            }}
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
        <FileTree
          fileTree={fileTree}
          addingForm={addingForm}
          showInput={showInput}
          setShowInput={setShowInput}
          type={type}
          setType={setType}
          handleAddFileSubmit={handleAddFileSubmit}
          lastOpenedFolder={lastOpenedFolder}
          setLastOpenedFolder={setLastOpenedFolder}
        />
        {/* Add resize handle */}
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-ew-resize hover:bg-purple-500/50
          transition-colors group z-50"
          onMouseDown={handleResize}
        />
      </div>
    )
  );
};

export default LeftBarPanel;
