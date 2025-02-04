import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../configs/axiosInstance";
import { selectToken, selectUser } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { setGem } from "../../redux/slices/gemSlice";

function CreateGemModal({ createGemModal, setCreateGemModal }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const token = useSelector(selectToken);
  const userId = useSelector(selectUser)?._id;

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
              children: [],
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
        dispatch(setGem(res.data));
        navigate(`/gem/${res.data.name}`);
        toast.success("Your gem is created");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.msg || error.message);
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
        <div className="fixed inset-0 flex items-center justify-center bg-transparent px-2">
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

export default CreateGemModal;
