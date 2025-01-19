import { useState } from "react";
import { selectUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CreateGemModal from "./CreateGemModal";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { MdFolder } from "react-icons/md";
import { FaProjectDiagram, FaUser } from "react-icons/fa";

function HomeTabs() {
  const [createGemModal, setCreateGemModal] = useState();
  const userId = useSelector(selectUser)._id;
  const dispatch = useDispatch();

  const handleYourWorkClick = async () => {
    try {
      const res = await axiosInstance.get(`/gems/getUserGems/${userId}`);
      dispatch(setExploreGem(res.data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleExploreGemClick = async () => {
    try {
      const res = await axiosInstance.get(`/gems/getAllGems/`);
      dispatch(setExploreGem(res.data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div
      className="flex flex-wrap gap-2 justify-start p-4 bg-gray-800 text-gray-400 w-full
      shadow-md border-t-4 border-[#ffb120] mx-auto mt-4 sticky top-0 z-50"
    >
      <CreateGemModal
        createGemModal={createGemModal}
        setCreateGemModal={setCreateGemModal}
      />

      <button
        onClick={() => setCreateGemModal(true)}
        className="bg-green-500 text-black hover:text-white px-4 py-3 rounded hover:bg-green-600 focus:outline-none"
      >
        <i className="cursor-pointer hover:text-slate-200 text-md">
          <HiOutlineViewGridAdd />
        </i>
      </button>

      <button
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
        onClick={handleYourWorkClick}
        className={`group flex items-center bg-slate-700 rounded-md hover:bg-slate-600 px-4 py-2 
        cursor-pointer hover:text-white focus:text-white focus:outline-none transform transition-all 
        duration-200 ease-in-out`}
      >
        <FaUser
          className="mr-2 group-hover:text-[#ffb120] transform transition-all 
        duration-200 ease-in-out"
        />
        <span>Your Work</span>
      </button>
      <div
        className={`group flex items-center bg-slate-700 rounded-md hover:bg-slate-600 px-4 py-2 
        cursor-pointer hover:text-white focus:text-white focus:outline-none transform transition-all 
        duration-200 ease-in-out`}
      >
        <MdFolder
          className="mr-2 group-hover:text-green-500 transform transition-all 
        duration-200 ease-in-out"
        />
        <span>Collections</span>
      </div>
      <button
        onClick={handleExploreGemClick}
        className={`group flex items-center bg-slate-700 rounded-md hover:bg-slate-600 px-4 py-2 
        cursor-pointer hover:text-white focus:text-white focus:outline-none transform transition-all 
        duration-200 ease-in-out`}
      >
        <FaProjectDiagram
          className="mr-2 text-blue-500 transform transition-all 
        duration-200 ease-in-out"
        />
        <span>Explore Projects</span>
      </button>
    </div>
  );
}

export default HomeTabs;
