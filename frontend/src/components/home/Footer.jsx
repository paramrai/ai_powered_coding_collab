import { BiLogoVisualStudio } from "react-icons/bi";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaRegCopyright,
  FaTwitter,
} from "react-icons/fa";

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

export default Footer;
