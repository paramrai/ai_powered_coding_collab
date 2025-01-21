import { FaRobot, FaUserPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { RiNotificationBadgeFill } from "react-icons/ri";

const TabOptions = ({ activeTab, setActiveTab, setIsChatOpen }) => {
  return (
    <div className="option_container flex justify-between">
      <div className="option_container_left flex">
        <div
          className={`cursor-pointer p-2 border-b-[1px] ${
            activeTab === "ai"
              ? "text-white border-cyan-300"
              : "text-gray-400 border-transparent"
          }`}
          onClick={() => setActiveTab("ai")}
        >
          <FaRobot className="text-md hover:text-white" />
        </div>
        <div
          className={`cursor-pointer p-2 border-b-[1px] ${
            activeTab === "chat"
              ? "text-white border-cyan-300"
              : "text-gray-400 border-transparent"
          }`}
          onClick={() => setActiveTab("chat")}
        >
          <RiNotificationBadgeFill className="text-md hover:text-white" />
        </div>
        <div
          className={`cursor-pointer p-2 border-b-[1px] ${
            activeTab === "add"
              ? "text-white border-cyan-300"
              : "text-gray-400 border-transparent"
          }`}
          onClick={() => setActiveTab("add")}
        >
          <FaUserPlus className="text-md hover:text-white" />
        </div>
      </div>
      <div className="option_container_right flex justify-between items-center">
        <button
          onClick={() => setIsChatOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          <IoMdClose className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default TabOptions;
