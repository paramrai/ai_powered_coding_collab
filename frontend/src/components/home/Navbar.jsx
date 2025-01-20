import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser } from "../../redux/slices/userSlice";
import AuthForm from "../AuthForm";
import RightBarProfile from "./RightBarProfile";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

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
    <nav className="flex gap-4 justify-between items-center p-3 border-b-[1px] border-slate-800">
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
            <RightBarProfile
              isOpen={isRightBarOpen}
              setIsRightBarOpen={setIsRightBarOpen}
            />
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
