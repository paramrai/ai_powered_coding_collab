import React, { useState } from "react";

const tiles = [
  "Problems",
  "output",
  "Terminal",
  "ports",
  "postman console",
  "comments",
];

const Terminal = () => {
  const [activeTile, setActiveTile] = useState("terminal");

  return (
    <div className="min-h-[100px] w-full flex gap-3 flex-shrink-[0] flex-grow-[0] flex-auto">
      {tiles.map((tile, i) => (
        <button
          key={i}
          className={`flex justify-between
                    items-center bg-slate-900
                    transition-all duration-300 border-b-[1px]
                    self-start whitespace-nowrap
                    ${
                      activeTile === tile
                        ? "border-blue-500"
                        : "border-slate-900"
                    }`}
          onClick={() => setActiveTile(tile)}
        >
          <span className="text-xs font-thin text-white p-2 ">
            {tile.toUpperCase()}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Terminal;
