import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const SignInForm = ({ close, setClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    if (!password || !email || !username) {
      alert("Username or Password is required");
      return;
    }

    const user = { username, email };
    dispatch(setUser(user));
    setClose(true);
  };

  return (
    <AnimatePresence>
      {!close && (
        <motion.div
          initial={{ y: "-100%", scale: 0, opacity: 0 }}
          animate={{ y: "0%", scale: 1, opacity: 1 }}
          exit={{
            y: "-100%",
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
          }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            mass: 1,
            duration: 0.5,
          }}
          className="fixed inset-0 bg-slate-900 z-[60] flex justify-center items-center"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative m-2">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <h2 className="text-xl">Sign In</h2>
              <h2
                onClick={() => {
                  setClose(true);
                }}
                className="text-sm text-blue-700 cursor-pointer"
              >
                Skip for now
              </h2>
            </div>
            <input
              type="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              onClick={handleSignIn}
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              Sign In
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignInForm;
