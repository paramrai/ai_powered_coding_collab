import { useDispatch, useSelector } from "react-redux";
import {
  selectHomeActiveTab,
  selectUser,
  setHomeActiveTab,
} from "../../redux/slices/userSlice";
import { useCallback, useEffect, useState } from "react";
import CreateGemModal from "./CreateGemModal";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { FaProjectDiagram, FaUser } from "react-icons/fa";
import { MdFolder } from "react-icons/md";
import { toast } from "react-toastify";
import axiosInstance from "../../configs/axiosInstance";
import { setExploreGem } from "../../redux/slices/gemSlice";
import InboxModal from "./InboxModal";

function Tabs() {
  const [createGemModal, setCreateGemModal] = useState();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const homeActiveTab = useSelector(selectHomeActiveTab);
  const [showInvites, setShowInvites] = useState(false);

  const handleTabChange = async (tab) => {
    if (!user._id && tab !== "explore") {
      tab === "me" && toast.info("Please Login First !");
      tab === "collection" &&
        toast.info("See collection by logging in First !");
      return;
    }

    let request;

    switch (tab) {
      case "me":
        request = `/gems/getUserGems/${user._id}`;
        break;
      case "collection":
        dispatch(setExploreGem(user.collection));
        dispatch(setHomeActiveTab(tab));
        return;
      case "explore":
        request = `/gems/getAllGems/${user._id}`;
      default:
        request = `/gems/getAllGems/${user._id}`;
    }

    try {
      const res = await axiosInstance.get(request);
      dispatch(setExploreGem(res.data));
      dispatch(setHomeActiveTab(tab));
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.msg || error.message);
    }
  };

  useEffect(() => {
    if (homeActiveTab) {
      handleTabChange(homeActiveTab);
    } else {
      handleTabChange("explore");
    }
  }, []);

  return (
    <div
      className="flex flex-wrap gap-2 justify-start p-4 bg-gray-800 text-gray-400 w-full
       z-50 shadow-md sticky border-t-4 border-[#ffb120] mx-auto mt-4"
    >
      <CreateGemModal
        createGemModal={createGemModal}
        setCreateGemModal={setCreateGemModal}
      />

      <InboxModal showInvites={showInvites} setShowInvites={setShowInvites} />

      <button
        onClick={() => setCreateGemModal(true)}
        className="bg-green-500 text-black hover:text-white px-4 py-3 rounded hover:bg-green-600 focus:outline-none"
      >
        <i className="cursor-pointer hover:text-slate-200 text-md">
          <HiOutlineViewGridAdd />
        </i>
      </button>

      <button
        onClick={() => setShowInvites(true)}
        className="group flex items-center bg-slate-700 rounded-md hover:bg-slate-600 px-4 py-2 
        cursor-pointer hover:text-white focus:text-white focus:outline-none transform transition-all 
        duration-200 ease-in-out"
      >
        <RiNotificationBadgeFill
          className="mr-2 group-hover:text-purple-600 transform transition-all 
        duration-200 ease-in-out"
        />
        <span>Inbox</span>
      </button>

      <button
        onClick={() => handleTabChange("me")}
        className={`group flex items-center bg-slate-700 rounded-md hover:bg-slate-600 px-4 py-2 
        cursor-pointer hover:text-white focus:text-white focus:outline-none transform transition-all 
        duration-200 ease-in-out ${
          homeActiveTab === "me"
            ? "border-l-4 border-green-500 bg-slate-600 text-white"
            : "border-l-4 border-transparent"
        }`}
      >
        <FaUser
          className="mr-2 group-hover:text-[#ffb120] transform transition-all 
        duration-200 ease-in-out"
        />
        <span>Your Work</span>
      </button>
      <div
        onClick={() => handleTabChange("collection")}
        className={`group flex items-center bg-slate-700 rounded-md hover:bg-slate-600 px-4 py-2 
        cursor-pointer hover:text-white focus:text-white focus:outline-none transform transition-all 
        duration-200 ease-in-out ${
          homeActiveTab === "collection"
            ? "border-l-4 border-green-500 bg-slate-600 text-white"
            : "border-l-4 border-transparent"
        }`}
      >
        <MdFolder
          className="mr-2 group-hover:text-green-500 transform transition-all 
        duration-200 ease-in-out"
        />
        <span>Collections</span>
      </div>
      <button
        onClick={() => handleTabChange("explore")}
        className={`group flex items-center bg-slate-700 rounded-md hover:bg-slate-600 px-4 py-2 
        cursor-pointer hover:text-white focus:text-white focus:outline-none transform transition-all 
        duration-200 ease-in-out ${
          homeActiveTab === "explore"
            ? "border-l-4 border-green-500 bg-slate-600 text-white"
            : "border-l-4 border-transparent"
        }`}
      >
        <FaProjectDiagram
          className="mr-2 text-blue-500 transform transition-all 
        duration-200 ease-in-out"
        />
        <span>Explore Gems</span>
      </button>
    </div>
  );
}

export default Tabs;
