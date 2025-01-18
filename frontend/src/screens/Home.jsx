import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaTools, FaLightbulb, FaShareAlt } from "react-icons/fa";
import { FaThumbsUp, FaEye } from "react-icons/fa";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { GoScreenFull } from "react-icons/go";
import { BiComment } from "react-icons/bi";
import {
  FaGithub,
  FaHome,
  FaProjectDiagram,
  FaUser,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaRegCopyright,
} from "react-icons/fa";
import { BiLogoVisualStudio } from "react-icons/bi";
import { MdFolder } from "react-icons/md";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectToken, selectUser } from "../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "../axios/axiosInstance";
import {
  addGem,
  selectExploreGems,
  setExploreGem,
} from "../redux/slices/gemSlice";

function CreateGemModal({ createGemModal, setCreateGemModal }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const token = useSelector(selectToken);
  const userId = useSelector(selectUser)._id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateGem = async (btn) => {
    try {
      if (!name) {
        toast.error("Name is required...");
        return;
      }

      const res = await axiosInstance.post(
        "/gems/createGem",
        {
          name,
          description,
          owner: userId,
          fileTree: [
            {
              name,
              type: "root",
              content: "",
              children: [{}],
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201 || res.statusText === "Created") {
        toast.success("Your gem is created");
        dispatch(
          addGem({
            name,
            type: "root",
            content: "",
            children: [{}],
          })
        );
        navigate("/gem");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    createGemModal && (
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{
          scale: 0.3,
          opacity: 0,
          transition: {
            duration: 0.2,
            ease: "easeInOut",
          },
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 15,
          mass: 1,
          duration: 0.2,
        }}
        className="fixed inset-0 bg-slate-900 z-50 p-2"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-transparent">
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-400"
              onClick={() => setCreateGemModal(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-200">Add Gem</h2>
            <div className="mb-4">
              <label htmlFor="gem-name" className="block text-gray-500">
                Create your hidden Gem
              </label>
              <div className="search_input w-[100%] mt-2 focus-within:ring-2 focus-within:ring-indigo-500 flex gap-2 items-center p-3 bg-slate-900 text-gray-500 transition-all">
                <input
                  autoComplete="off"
                  className="bg-transparent  w-full h-full outline-none"
                  placeholder="Ai Powered : Code Gem"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-500">
                Description
              </label>
              <div className="search_input w-[100%] mt-2 focus-within:ring-2 focus-within:ring-indigo-500 flex gap-2 items-center p-3 bg-slate-900 text-gray-500 transition-all">
                <textarea
                  autoComplete="off"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-transparent  w-full h-[100px] resize-none outline-none scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 text-start"
                  placeholder={`Code Gem is an innovative online code editor that blends the power of AI with seamless collaboration and communication.
                  Key Features:AI-Powered Coding Assistance: Code Gem leverages advanced AI to help you write, debug, and optimize code with intelligent suggestions and real-time error checking.                  
                  Video Chat Integration: Collaborate with your team or friends through built-in video chat, making it easy to discuss and solve coding challenges together.
                  Real-Time Collaboration: Work on the same codebase simultaneously with anyone, whether they are using Code Gem or invited to join your coding session. Changes are synchronized instantly, ensuring a smooth and efficient collaborative experience.
                  Enhance your coding productivity and creativity with Code Gem—where technology and teamwork come together.`}
                  type="text"
                ></textarea>
              </div>
            </div>
            <div className="btns space-x-2 flex justify-end">
              <button
                onClick={handleCreateGem}
                className="bg-green-500 text-black hover:text-white px-4 py-2 rounded focus:outline-none"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  );
}

const RightBar = ({ isOpen, setIsRightBarOpen }) => {
  const user = useSelector(selectUser);
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="fixed top-0 right-0 h-full w-64 bg-slate-800 shadow-lg p-4 z-[60] text-gray-400"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <button
          onClick={() => setIsRightBarOpen(false)}
          className="text-xl font-semibold mb-4"
        >
          Close
        </button>
      </div>
      <div>{user?.username}</div>
      <div>{user?.email}</div>
    </motion.div>
  );
};

function Navbar() {
  const [close, setClose] = useState(false);
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isRightBarOpen, setIsRightBarOpen] = useState(false);

  // Logging out
  const handleLogout = () => {
    dispatch(clearUser());
    toast.info("Logged out successfully.");
  };

  return (
    <nav className="flex gap-4 justify-between items-center">
      <AuthForm
        isAuthFormOpen={isAuthFormOpen}
        setIsAuthFormOpen={setIsAuthFormOpen}
      />
      <div className="search_input flex-1 focus-within:ring-2 focus-within:ring-indigo-500 flex gap-2 items-center p-3 bg-slate-800 text-gray-500 transition-all">
        <i className="cursor-pointer hover:text-slate-200 text-md">
          <FaSearch />
        </i>
        <input
          autoComplete="off"
          className="bg-transparent w-full h-full outline-none"
          placeholder="Search for public projects"
          type="text"
        />
      </div>
      {!user.email ? (
        <div className="btns space-x-2 hidden sm:flex flex-shrink-0">
          <button
            onClick={() => setIsAuthFormOpen(true)}
            className="bg-green-500 text-black hover:text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsAuthFormOpen(true)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="relative flex space-x-2">
          <button
            onClick={handleLogout}
            className="bg-green-500 text-black hover:text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log Out
          </button>
          <button
            onClick={() => setIsRightBarOpen(true)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
          >
            Profile
          </button>

          {isRightBarOpen && (
            <RightBar
              isOpen={isRightBarOpen}
              setIsRightBarOpen={setIsRightBarOpen}
            />
          )}
        </div>
      )}
    </nav>
  );
}

function Tabs() {
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
     z-50 shadow-md sticky border-t-4 border-[#ffb120] mx-auto mt-4"
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

function GemSection({ page }) {
  const exploreGems = useSelector(selectExploreGems).slice(page, page + 6);
  const dispatch = useDispatch();
  const userId = useSelector(selectUser)._id;

  const profile =
    "https:assets.codepen.io/2017/internal/avatars/users/default.png";
  const defaultPreview =
    "https://img.freepik.com/free-vector/web-design-concept-with-flat-design_23-2147862426.jpg?t=st=1736832472~exp=1736836072~hmac=02c02e22fc0c1cb582e7f93316d30d5aaa11878d534f158e7a405757ce889694&w=740";

  const handleLikeClick = async (gemId) => {
    try {
      const res = await axiosInstance.put(`/collectGem/${gemId}`, {
        userId,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          meticulously crafted with passion, creativity, and dedication. We hope
          you've enjoyed discovering these treasures as much as we enjoyed
          creating them. Your support and appreciation mean the world to us, and
          we look forward to continuing this journey together.
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
              onClick={() => handleLikeClick(gem._id)}
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
  );
}

function InfoCards() {
  return (
    <>
      <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-gray-800 text-white transform transition duration-500 hover:shadow-xl mx-auto">
        <div className="px-6 py-4">
          <FaTools className="text-teal-400 mb-2" size={24} />
          <div className="font-bold text-xl mb-2">Build and Test</div>
          <p className="text-gray-400 text-base">
            Start building your projects and test your ideas with our powerful
            tools and resources.
          </p>
        </div>
        <div className="px-6 pt-4 pb-6">
          <button className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
            Explore Features
          </button>
        </div>
      </div>

      <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-gray-800 text-white transform transition duration-500 hover:shadow-xl mx-auto">
        <div className="px-6 py-4">
          <FaLightbulb className="text-purple-400 mb-2" size={24} />
          <div className="font-bold text-xl mb-2">Learn and Discover</div>
          <p className="text-gray-400 text-base">
            Explore new technologies, learn from tutorials, and discover
            innovative solutions.
          </p>
        </div>
        <div className="px-6 pt-4 pb-6">
          <button className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500">
            Get Started
          </button>
        </div>
      </div>

      <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-gray-800 text-white transform transition duration-500 hover:shadow-xl mx-auto">
        <div className="px-6 py-4">
          <FaShareAlt className="text-red-400 mb-2" size={24} />
          <div className="font-bold text-xl mb-2">Share Your Work</div>
          <p className="text-gray-400 text-base">
            Showcase your projects, share your progress, and get feedback from
            the community.
          </p>
        </div>
        <div className="px-6 pt-4 pb-6">
          <button className="bg-red-500 text-white px-4 py-2 rounded-full hover focus:outline-none focus:ring-2 focus:ring-red-500">
            Join the Community
          </button>
        </div>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 p-6">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-2">
        <div className="flex items-center space-x-2">
          <BiLogoVisualStudio className="text-3xl text-white" />
          <span className="text-xl text-white font-bold">
            Ai Powered : Code Gems
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="hover:text-white">
            Community
          </a>
          <a href="#" className="hover:text-white">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
        </div>
        <div className="flex gap-2">
          <a
            href="#"
            className="hover:text-white hover:translate-y-[-2px] transform transition-all duration-150"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="#"
            className="hover:text-white hover:translate-y-[-2px] transform transition-all duration-150"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="#"
            className="hover:text-white hover:translate-y-[-2px] transform transition-all duration-150"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="#"
            className="hover:text-white hover:translate-y-[-2px] transform transition-all duration-150"
          >
            <FaInstagram size={20} />
          </a>
        </div>
        <div className="text-center text-gray-500">
          <FaRegCopyright className="inline-block" /> 2025 Online Code Editor.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}

const Home = () => {
  const [page, setPage] = useState(0);
  const exploreGems = useSelector(selectExploreGems);
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

  function handleNext() {
    setPage((prev) => prev + 6);
    window.scrollTo(0, 0);
  }

  return (
    <main className="h-full overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
      <header className="p-3 border-b-[1px] border-slate-800">
        <Navbar />
      </header>
      <nav className="sticky top-0 z-50">
        <Tabs />
      </nav>
      <section className="flex my-4 px-2">
        <GemSection page={page} />
      </section>
      <div className="w-full text-center">
        <button
          onClick={handleNext}
          className="bg-green-500 text-black hover:text-white px-4 py-3 rounded hover:bg-green-600 focus:outline-none w-[120px]"
        >
          Next
        </button>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center my-8 p-2">
        <InfoCards />
      </section>
      <Footer />
    </main>
  );
};

export default Home;
