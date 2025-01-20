import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
import { motion } from "framer-motion";

const RightBarProfile = ({ isOpen, setIsRightBarOpen }) => {
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

export default RightBarProfile;
