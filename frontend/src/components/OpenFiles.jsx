import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaJs,
  FaHtml5,
  FaCss3,
  FaPhp,
  FaRust,
  FaSwift,
} from "react-icons/fa";
import {
  SiGo,
  SiCplusplus,
  SiRuby,
  SiKotlin,
  SiTypescript,
  SiDart,
} from "react-icons/si";
import { BsHash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  closeFile,
  selectActiveFile,
  selectOpenFiles,
  setActiveFile,
} from "../redux/slices/gemSlice";
import { getFileIcon } from "./LeftBarPanel";

const OpenFiles = () => {
  const openFiles = useSelector(selectOpenFiles);
  const activeFile = useSelector(selectActiveFile);
  const dispatch = useDispatch();

  return (
    <div className="w-full overflow-x-auto scrollbar-hide bg-slate-800">
      <div className="flex min-w-max">
        {openFiles.map((file, i) => (
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
                console.log("The target is an SVG element.");
                dispatch(closeFile(file.name));
                // if closing file = active then active = index - 1
                if (activeFile === file.name) {
                  console.log("same");
                  const index = openFiles.findIndex(
                    (obj) => obj.name === file.name
                  );
                  dispatch(setActiveFile(openFiles[index - 1]?.name));
                } else {
                  console.log("diffrent");
                }
              } else {
                console.log("The target is not an SVG element.");
                // set active file
                dispatch(setActiveFile(file.name));
              }
            }}
          >
            {getFileIcon(file.name)}
            <h3 className="text-sm text-white mx-2">{file.name}</h3>
            <IoClose
              className="text-sm text-gray-400 hover:text-red-500 transition-colors"
              size={18}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default OpenFiles;
