import { FaFile, FaSearch, FaGithub, FaCode, FaVideo } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { IoMdChatboxes } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const LeftBar = ({
  isLeftbarPanel,
  setIsLeftbarPanel,
  setIsVideoChatOpen,
  setIsChatOpen,
}) => {
  const navigate = useNavigate();

  const icons = [
    { icon: <FaFile />, label: "Explorer" },
    { icon: <FaSearch />, label: "Search" },
    { icon: <FaGithub />, label: "Source Control" },
    { icon: <IoMdChatboxes />, label: "Chat" },
    { icon: <FaVideo />, label: "Open Video Chat" },
    { icon: <ImExit />, label: "Exit" },
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
            onClick={() => {
              switch (item.label) {
                case "Exit":
                  navigate("/");
                  break;
                case "Open Video Chat":
                  setIsVideoChatOpen((prev) => !prev);
                  break;
                case "Chat":
                  setIsChatOpen((prev) => !prev);
                  break;
                default:
                  setIsLeftbarPanel(!isLeftbarPanel);
              }
            }}
          >
            <div className="text-xl">{item.icon}</div>
          </button>
          <div
            className="absolute left-[102%] ml-2 py-1 px-2 top-4 
                whitespace-nowrap bg-slate-700 text-gray-400
                text-xs rounded hidden group-hover:block
                before:content-[''] before:absolute before:left-[-8px]
                before:top-[50%] before:transform before:-translate-y-1/2
                before:border-4 before:border-transparent before:border-r-slate-700
                transition-opacity duration-200 z-50"
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftBar;
