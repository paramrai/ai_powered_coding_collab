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

const icons = {
  JavaScript: <FaJs className="text-yellow-400" size={16} />,
  Python: <FaPython className="text-blue-500" size={16} />,
  Java: <FaJava className="text-orange-500" size={16} />,
  "C++": <SiCplusplus className="text-blue-600" size={16} />,
  TypeScript: <SiTypescript className="text-blue-400" size={16} />,
  React: <FaReact className="text-cyan-400" size={16} />,
  Node: <FaNodeJs className="text-green-500" size={16} />,
  Go: <SiGo className="text-blue-500" size={16} />,
  Ruby: <SiRuby className="text-red-500" size={16} />,
  PHP: <FaPhp className="text-purple-500" size={16} />,
  Swift: <FaSwift className="text-orange-500" size={16} />,
  Kotlin: <SiKotlin className="text-orange-400" size={16} />,
  Rust: <FaRust className="text-orange-600" size={16} />,
  "C#": (
    <div className="flex items-center">
      <span className="text-green-500 font-bold text-sm">C</span>
      <BsHash className="text-green-500" size={16} />
    </div>
  ),
  Dart: <SiDart className="text-blue-400" size={16} />,
  HTML: <FaHtml5 className="text-orange-500" size={16} />,
  CSS: <FaCss3 className="text-blue-500" size={16} />,
};

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
                // set active before this index only if file name same
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
            {file.icon}
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
