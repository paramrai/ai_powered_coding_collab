import { BiComment } from "react-icons/bi";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import { GoScreenFull } from "react-icons/go";
import axiosInstance from "../../axios/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUserCollection } from "../../redux/slices/userSlice";
import { selectExploreGems, setExploreGem } from "../../redux/slices/gemSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const profile =
  "https:assets.codepen.io/2017/internal/avatars/users/default.png";
const defaultPreview =
  "https://img.freepik.com/free-vector/web-design-concept-with-flat-design_23-2147862426.jpg?t=st=1736832472~exp=1736836072~hmac=02c02e22fc0c1cb582e7f93316d30d5aaa11878d534f158e7a405757ce889694&w=740";

function GemSection() {
  const [page, setPage] = useState(0);
  const exploreGems = useSelector(selectExploreGems).slice(page, page + 6);
  const userId = useSelector(selectUser)._id;
  const dispatch = useDispatch();

  // fetch gems
  useEffect(() => {
    const fetchAllGems = async () => {
      try {
        const res = await axiosInstance.get("/gems/getAllGems");
        dispatch(setExploreGem(res.data));
      } catch (error) {
        toast.error(error.response?.data.msg);
        console.log(error);
      }
    };

    fetchAllGems();
  }, [page]);

  const handleLikeClick = async (gem) => {
    try {
      const res = await axiosInstance.put(`/gems/collectGem/${gem._id}`, {
        userId,
      });
      if (res.status === 200 || res.status === "OK") {
        dispatch(setUserCollection(gem));
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleNext() {
    setPage((prev) => prev + 6);
    window.scrollTo(0, 0);
  }

  return (
    <section className="flex flex-col my-4 px-2">
      <div
        className={`${
          exploreGems.length === 0
            ? "w-full"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        }`}
      >
        {exploreGems.length === 0 && (
          <div className="max-w-[500px] mx-auto text-gray-400 px-4 text-lg">
            <span className="text-3xl">Thank you </span>
            for taking the time to explore our projects. Each one is a gem,
            meticulously crafted with passion, creativity, and dedication. We
            hope you've enjoyed discovering these treasures as much as we
            enjoyed creating them. Your support and appreciation mean the world
            to us, and we look forward to continuing this journey together.
          </div>
        )}
        {exploreGems.map((gem, index) => (
          <div
            key={index}
            className="group project_card hover:bg-slate-800 w-full text-white rounded-md flex flex-col gap-4 p-3 transform transition duration-300"
          >
            <div className="relative space-y-2">
              <div className="overlay_effect_div absolute bg-slate-800 h-full w-full z-[-1] top-3 left-3 rounded-md"></div>
              <div className="project_preview_img w-full rounded-md relative">
                <img
                  src={gem.preview || defaultPreview}
                  alt="preview"
                  className="object-cover rounded-md max-h-[200px] w-full"
                />
                <i
                  title="See in Detail"
                  className="absolute top-2 right-2 p-2 text-lg bg-slate-800 rounded-md cursor-pointer opacity-0 group-hover:opacity-100 transform transition duration-300"
                >
                  <GoScreenFull />
                </i>
              </div>
              <div className="project_info gap-4 flex">
                <img
                  src={profile}
                  alt="profile"
                  className="profile_img h-[45px] w-[45px] rounded-md"
                />
                <div className="project_title flex flex-col justify-between">
                  <span className="text-md font-bold">{gem.name}</span>
                  <span className="text-sm">
                    {gem.owner.username}
                    <span className="bg-[#ffb120] rounded-sm px-1 h-min ml-2 text-black font-bold uppercase text-xs">
                      Pro
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="project_interaction flex gap-3 items-center opacity-0 group-hover:opacity-100">
              <button
                onClick={() => handleLikeClick(gem)}
                className="project_likes flex gap-1 not-italic items-center text-xs bg-slate-600 p-1 rounded-sm px-2 hover:bg-slate-500 cursor-pointer"
              >
                <FaThumbsUp />
                <span className="text-xs">{gem.likes}</span>
              </button>
              <i className="project_views flex gap-1 not-italic items-center text-xs bg-slate-600 p-1 rounded-sm px-2 hover:bg-slate-500 cursor-pointer">
                <FaEye />
                <span className="text-xs">
                  {Math.floor(Math.random() * 1000) + 1}
                </span>
              </i>
              <i className="project_comments flex gap-1 not-italic items-center text-xs bg-slate-600 p-1 rounded-sm px-2 hover:bg-slate-500 cursor-pointer">
                <BiComment />
                <span className="text-xs">
                  {Math.floor(Math.random() * 100) + 1}
                </span>
              </i>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full text-center mt-2">
        <button
          onClick={handleNext}
          className="bg-green-500 text-black hover:text-white px-4 py-3 rounded hover:bg-green-600 focus:outline-none w-[120px]"
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default GemSection;
