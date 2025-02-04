import { BiComment } from "react-icons/bi";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import { GoScreenFull } from "react-icons/go";
import axiosInstance from "../../configs/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  selectHomeActiveTab,
  selectUser,
  setUserCollection,
} from "../../redux/slices/userSlice";
import {
  selectExploreGems,
  setExploreGem,
  setGem,
} from "../../redux/slices/gemSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const randomProfile = [
  "https:assets.codepen.io/2017/internal/avatars/users/default.png",
  "https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp",
  "https://images.sftcdn.net/images/t_app-icon-s/p/c34c15bf-054c-4287-8c2c-73cef14107c2/3273691428/boys-dp-boy-profile-pictures-logo",
  "https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png",
];

const randomPreview = [
  "https://as2.ftcdn.net/v2/jpg/03/42/45/91/1000_F_342459198_KmVmJ04KdNKUFXjZ7JGzVfoevl1cBw7L.jpg",
  "https://as1.ftcdn.net/v2/jpg/03/42/45/92/1000_F_342459217_8ZwBCz2xv3bDXa1P1v1egRafFgmFvmot.jpg",
  "https://cdn.dribbble.com/userupload/3160967/file/original-079c818bc3fa4c2e0cf90e1da0cf2c4e.png?resize=1024x768&vertical=center",
  "https://cdn.dribbble.com/userupload/4673833/file/original-458a45cadd81267da289136a7b1de673.png?resize=1024x768&vertical=center",
  "https://cdn1.dronahq.com/wp-content/uploads/2023/01/custom_web_app_development_2x-scaled.webp",
  "https://img.freepik.com/free-vector/application-learn-languages_23-2148624202.jpg?t=st=1737918819~exp=1737922419~hmac=d98dddcf46146e0a6521da5c8b8c34ce2fa27cfd72f02458523173565bc63a10&w=740",
  "https://img.freepik.com/free-vector/flat-background-international-mother-language-day_23-2151115303.jpg?t=st=1737918847~exp=1737922447~hmac=c79d996387098e343a13396f41738c7ecab94533327310ed5c1b010982c330c8&w=740",
  "https://img.freepik.com/free-vector/hand-drawn-english-school-illustration_23-2149494006.jpg?t=st=1737918879~exp=1737922479~hmac=4d1c65b1b1f4b5856f00f7234d93d1254e16f91e2e6e5578c9d5afd98a2ac04d&w=740",
  "https://media.istockphoto.com/id/1058262630/vector/creation-responsive-internet-website-for-multiple-platforms-building-mobile-interface-on.jpg?s=1024x1024&w=is&k=20&c=Qrko2b9M1HK7M_5L2CYdj_iNG2xBt6OMJprLd3mmUOM=",
];

function GemSection() {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [gems, setGems] = useState([]);
  const [loading, setLoading] = useState(false);
  const homeActiveTab = useSelector(selectHomeActiveTab);
  const exploreGems = useSelector(selectExploreGems);
  const userId = useSelector(selectUser)?._id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setPage(0);
  }, [homeActiveTab]);

  useEffect(() => {
    setLoading(true);
    let sortedGems = [...exploreGems].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    setGems(sortedGems);
    setHasMore(page + 6 < exploreGems.length);

    setLoading(false);
  }, [exploreGems, homeActiveTab, page]);

  const handleLikeClick = async (gem) => {
    try {
      const res = await axiosInstance.put(`/gems/collectGem/${gem._id}`, {
        userId,
      });
      if (res.status === 200 || res.status === "OK") {
        dispatch(setUserCollection(gem));
        if (homeActiveTab === "collection") {
          // Update local state immediately
          setGems((prevGems) => prevGems.filter((g) => g._id !== gem._id));
          // Update redux state
          dispatch(setExploreGem(exploreGems.filter((g) => g._id !== gem._id)));
        }
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleNext() {
    setLoading(true); // Start loading
    setPage((prev) => prev + 6);
    window.scrollTo(0, 0);
    setLoading(false); // Stop loading
  }

  function handlePrev() {
    setPage((prev) => Math.max(0, prev - 6));
    window.scrollTo(0, 0);
  }

  const handleOpenGem = (gem) => {
    navigate(`/gem/${gem.name}`);
  };

  return (
    <section className="flex flex-col my-4 px-2">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <div
          className={`${
            gems.length === 0
              ? "w-full"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          }`}
        >
          {gems.map((gem, index) => (
            <div
              key={index}
              className="group project_card hover:bg-slate-800 w-full text-white rounded-md flex flex-col gap-4 p-3 transform transition duration-300 cursor-pointer "
            >
              <div className="relative space-y-2">
                <div className="overlay_effect_div absolute bg-slate-800 h-full w-full z-[-1] top-3 left-3 rounded-md"></div>
                <div className="project_preview_img w-full bg-slate-700 h-[230px] rounded-md relative overflow-hidden">
                  <img
                    src={
                      randomPreview[
                        Math.floor(Math.random() * randomPreview.length)
                      ]
                    }
                    alt="preview"
                    className="object-cover rounded-md h-full w-full"
                  />
                  <button
                    onClick={() => handleOpenGem(gem)}
                    title="Click to see in detail"
                    className="group-hover:scale-[1.8] group-hover:transform group-hover:translate-y-6 group-hover:-translate-x-6 absolute top-2 right-2 p-2 text-lg bg-slate-800 rounded-md cursor-pointer opacity-0 group-hover:opacity-100 transform transition duration-300"
                  >
                    <GoScreenFull />
                  </button>
                </div>
                <div className="project_info gap-4 flex">
                  <div className="profile_img_container bg-slate-700 rounded-md max-h-[45px] max-w-[45px] min-h-[45px] min-w-[45px]">
                    <img
                      src={
                        randomProfile[
                          Math.floor(Math.random() * randomProfile.length)
                        ]
                      }
                      alt="profile"
                      className="profile_img rounded-md object-cover max-h-[45px] max-w-[45px] min-h-[45px] min-w-[45px]"
                    />
                  </div>
                  <div className="project_title flex flex-col justify-between w-full">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-md font-bold block">
                        {gem.name}
                      </span>
                      <span className="text-md font-bold block">
                        {moment(gem.createdAt).fromNow()}
                      </span>
                    </div>
                    <div className="text-sm">
                      <div className="flex w-full justify-between">
                        <div className="username_container">
                          <span className="username">
                            {gem.owner?.username}
                          </span>
                          <span className="badge bg-[#ffb120] rounded-sm px-1 h-min ml-2 text-black font-bold uppercase text-xs">
                            Pro
                          </span>
                        </div>
                        {homeActiveTab === "me" && (
                          <span className="bg-[#ffb120] bg-opacity-70 rounded-sm px-1 h-min ml-2 text-black font-bold  text-xs">
                            {gem.owner._id !== userId &&
                              `Collabed with ${gem.owner?.username}`}
                          </span>
                        )}
                      </div>
                    </div>
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
      )}
      {gems.length > 0 && (
        <div className="w-full text-center mt-2 flex justify-center gap-4">
          {page > 0 && (
            <button
              onClick={handlePrev}
              className="bg-blue-500 text-black hover:text-white px-4 py-3 rounded hover:bg-blue-600 focus:outline-none w-[120px]"
            >
              Previous
            </button>
          )}
          {hasMore && (
            <button
              onClick={handleNext}
              className="bg-green-500 text-black hover:text-white px-4 py-3 rounded hover:bg-green-600 focus:outline-none w-[120px]"
            >
              Next
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default GemSection;
