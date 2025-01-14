import React from "react";
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

function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <div className="search_input w-[70%] sm:w-max max-w-96 focus-within:ring-2 focus-within:ring-indigo-500 flex gap-2 items-center p-3 bg-slate-800 text-gray-500 transition-all">
        <i className="cursor-pointer hover:text-slate-200 text-md">
          <FaSearch />
        </i>
        <input
          autocomplete="off"
          className="bg-transparent w-full h-full outline-none"
          placeholder="Search for public projects"
          type="text"
        />
      </div>
      <div className="btns space-x-2 hidden sm:flex">
        <button className="bg-green-500 text-black hover:text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Sign Up
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
          Login
        </button>
      </div>
    </nav>
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
          <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
            Join the Community
          </button>
        </div>
      </div>
    </>
  );
}

function Tabs() {
  return (
    <div
      className="flex flex-wrap gap-2 justify-start p-4 bg-gray-800 text-gray-400 w-full
     z-50 shadow-md sticky border-t-4 border-[#ffb120] max-w-[90%] mx-auto mt-4"
    >
      <button className="bg-green-500 text-black hover:text-white px-4 py-3 rounded hover:bg-green-600 focus:outline-none">
        <i className="cursor-pointer hover:text-slate-200 text-md">
          <HiOutlineViewGridAdd />
        </i>
      </button>
      <div
        className="group flex items-center bg-slate-700 rounded-md hover:bg-slate-600 px-4 py-2 
      cursor-pointer hover:text-white focus:text-white focus:outline-none transform transition-all 
      duration-200 ease-in-out"
      >
        <RiNotificationBadgeFill
          className="mr-2 group-hover:text-red-500 transform transition-all 
      duration-200 ease-in-out"
        />
        <span>Inbox</span>
      </div>
      <div
        className="group flex items-center bg-slate-700 rounded-md hover:bg-slate-600 px-4 py-2 
      cursor-pointer hover:text-white focus:text-white focus:outline-none transform transition-all 
      duration-200 ease-in-out"
      >
        <FaUser
          className="mr-2 group-hover:text-[#ffb120] transform transition-all 
      duration-200 ease-in-out"
        />
        <span>Your Work</span>
      </div>
      <div
        className="group flex items-center bg-slate-700 rounded-md hover:bg-slate-600 px-4 py-2 
      cursor-pointer hover:text-white focus:text-white focus:outline-none transform transition-all 
      duration-200 ease-in-out"
      >
        <MdFolder
          className="mr-2 group-hover:text-green-500 transform transition-all 
      duration-200 ease-in-out"
        />
        <span>Collections</span>
      </div>
      <div
        className="group flex items-center rounded-md bg-slate-600 px-4 py-2 
      cursor-pointer text-white transform transition-all 
      duration-200 ease-in-out"
      >
        <FaProjectDiagram
          className="mr-2 text-blue-500 transform transition-all 
      duration-200 ease-in-out"
        />
        <span>Explore Projects</span>
      </div>
    </div>
  );
}

function ProjectSection() {
  const projects = [
    {
      title: "Project Title 1",
      description:
        "Brief description of the project. This can be an overview or a short summary.",
      preview:
        "https:img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg",
    },
    {
      title: "Project Title 2",
      description:
        "Brief description of the project. This can be an overview or a short summary.",
    },
    {
      title: "Project Title 1",
      description:
        "Brief description of the project. This can be an overview or a short summary.",
      preview:
        "https:img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg",
    },
    {
      title: "Project Title 2",
      description:
        "Brief description of the project. This can be an overview or a short summary.",
    },
    {
      title: "Project Title 1",
      description:
        "Brief description of the project. This can be an overview or a short summary.",
    },
    {
      title: "Project Title 2",
      description:
        "Brief description of the project. This can be an overview or a short summary.",
    },
  ];
  const profile =
    "https:assets.codepen.io/2017/internal/avatars/users/default.png";
  const defaultPreview =
    "https://img.freepik.com/free-vector/web-design-concept-with-flat-design_23-2147862426.jpg?t=st=1736832472~exp=1736836072~hmac=02c02e22fc0c1cb582e7f93316d30d5aaa11878d534f158e7a405757ce889694&w=740";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {projects.map((project, index) => (
        <div
          key={index}
          className="group project_card hover:bg-slate-800 w-full text-white rounded-md flex flex-col gap-4 p-3 transform transition duration-300"
        >
          <div className="relative space-y-2">
            <div className="overlay_effect_div absolute bg-slate-800 h-full w-full z-[-1] top-3 left-3 rounded-md"></div>
            <div className="project_preview_img w-full rounded-md relative">
              <img
                src={project.preview || defaultPreview}
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
                <span className="text-md font-bold">{project.title}</span>
                <span className="text-sm">
                  Owner
                  <span className="bg-[#ffb120] rounded-sm px-1 h-min ml-2 text-black font-bold uppercase text-xs">
                    Pro
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="project_interaction flex gap-3 items-center opacity-0 group-hover:opacity-100">
            <i className="project_likes flex gap-1 not-italic items-center text-xs bg-slate-600 p-1 rounded-sm px-2 hover:bg-slate-500 cursor-pointer">
              <FaThumbsUp />
              <span className="text-xs">
                {Math.floor(Math.random() * 100) + 1}
              </span>
            </i>
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

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 p-6">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center md:justify-between items-center gap-2">
        <div className="flex items-center space-x-2">
          <BiLogoVisualStudio className="text-3xl text-white" />
          <span className="text-xl text-white font-bold">
            Ai Powered : Coding Collab
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

const Projects = () => {
  return (
    <div>
      <header className="p-3 border-b-[1px] border-slate-800">
        <Navbar />
      </header>
      <nav>
        <Tabs />
      </nav>
      <section className="flex my-4 px-2">
        <ProjectSection />
      </section>
      <div className="w-full text-center">
        <button className="bg-green-500 text-black hover:text-white px-4 py-3 rounded hover:bg-green-600 focus:outline-none w-[120px]">
          Next
        </button>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center my-8 p-2">
        <InfoCards />
      </section>
      <Footer />
    </div>
  );
};

export default Projects;
