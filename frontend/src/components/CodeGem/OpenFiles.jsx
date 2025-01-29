import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  closeFile,
  saveFileContent,
  selectActiveFile,
  selectFileTree,
  selectOpenFiles,
  selectPath,
  setActiveFile,
} from "../../redux/slices/gemSlice";
import { getFileIcon } from "./LeftBarPanel";
import { IoMdCloudDone } from "react-icons/io";
import { toast } from "react-toastify";

const OpenFiles = ({ content, isFileSaved, setIsFileSaved }) => {
  const dispatch = useDispatch();
  const openFiles = useSelector(selectOpenFiles);
  const activeFile = useSelector(selectActiveFile);
  const path = useSelector(selectPath);

  const handleSave = () => {
    // Save file content
    dispatch(
      saveFileContent({
        name: activeFile,
        path: path,
        content: content,
      })
    );

    toast.success("File saved");
    setIsFileSaved(true);
  };

  return (
    <div className="w-full overflow-x-auto scrollbar-hide bg-slate-800">
      <div className="flex min-w-max">
        {!isFileSaved && activeFile && (
          <button
            onClick={handleSave}
            title="Save your gem"
            className="text-green-500 text-2xl min-w-[50px] h-[50px] flex justify-between
                      items-center bg-slate-800 p-4
                      transition-all duration-300"
          >
            <IoMdCloudDone />
          </button>
        )}
        {openFiles?.map((file, i) => (
          <button
            key={i}
            className={`min-w-[50px] h-[50px] flex justify-between
                      items-center bg-slate-800 p-4
                      transition-all duration-300 border-b-[1px]
                      ${
                        activeFile === file.name
                          ? "border-blue-500"
                          : "border-slate-800"
                      }`}
            onClick={(e) => {
              if (e.target instanceof SVGElement) {
                let index = openFiles.findIndex(
                  (item) => item.name === file.name
                );
                dispatch(closeFile(file.name));
                // if closing file = active then active = index - 1
                if (file.name === activeFile) {
                  dispatch(setActiveFile(openFiles[index - 1]?.name));
                }
              } else {
                // set active file
                dispatch(setActiveFile(file.name));
              }
            }}
          >
            {getFileIcon(file.name)}
            <h3 className="text-sm text-white mx-2">{file.name}</h3>
            {!isFileSaved && file.name === activeFile ? (
              <GoDotFill className="min-h-2 min-w-2 rounded-full translate-x-[2px] translate-y-[1.54px] text-gray-400 hover:text-red-500 hover:scale-[1.1]" />
            ) : (
              <IoClose
                className="text-sm text-gray-400  translate-x-[2px] translate-y-[1.54px] hover:text-red-500 hover:scale-[1.1] transition-colors"
                size={18}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OpenFiles;
