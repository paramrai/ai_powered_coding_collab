import { FaFile, FaSearch, FaGithub, FaCode, FaCog } from "react-icons/fa";

const LeftBar = ({ isLeftbarPanel, setIsLeftbarPanel }) => {
  const icons = [
    { icon: <FaFile />, label: "Explorer" },
    { icon: <FaSearch />, label: "Search" },
    { icon: <FaGithub />, label: "Source Control" },
    { icon: <FaCode />, label: "Code" },
    { icon: <FaCog />, label: "Settings" },
  ];

  return (
    <div className="h-screen bg-slate-900 flex flex-col items-left border-r border-slate-700">
      {icons.map((item, index) => (
        <div key={index} className="relative group">
          <button
            className="p-4 mb-2 text-gray-400 hover:text-white w-full
                       transition-all duration-200 
                       border-l-2 border-transparent
                     hover:border-blue-500"
            onClick={() => setIsLeftbarPanel(!isLeftbarPanel)}
          >
            <div className="text-xl">{item.icon}</div>
          </button>
          <div
            className="absolute left-[102%] ml-2 py-1 px-2 top-4 
                whitespace-nowrap bg-slate-800 text-gray-400
                text-xs rounded hidden group-hover:block
                before:content-[''] before:absolute before:left-[-8px]
                before:top-[50%] before:transform before:-translate-y-1/2
                before:border-4 before:border-transparent before:border-r-slate-800
                transition-opacity duration-200"
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftBar;
