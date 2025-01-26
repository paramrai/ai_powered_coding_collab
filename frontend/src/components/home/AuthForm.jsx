import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectUser, selectToken } from "../../redux/slices/userSlice";
import axiosInstance from "../../configs/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInForm = ({ setIsAuthFormOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);

    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      if (response.status === 200 || response.statusText === "OK") {
        const user = response.data;
        dispatch(setUser(user));
        setIsAuthFormOpen(false);
        toast.success("Logged in successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data.msg || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 bg-transparent outline-none text-gray-200"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 bg-transparent outline-none text-gray-200"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

const SignUpForm = ({ setIsAuthFormOpen }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);

    try {
      const response = await axiosInstance.post("/users/register", {
        username,
        email,
        password,
      });
      const user = response.data;
      dispatch(setUser(user));
      toast.success("Signed up successfully!");
      setIsAuthFormOpen(false);
    } catch (error) {
      dispatch(setError(error.message));
      toast.error(error.response?.data.msg || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 bg-transparent outline-none text-gray-200"
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 bg-transparent outline-none text-gray-200"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 bg-transparent outline-none text-gray-200"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

const AuthForm = ({ isAuthFormOpen, setIsAuthFormOpen }) => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const token = useSelector(selectToken);

  return (
    <div>
      {!token && (
        <AnimatePresence>
          {isAuthFormOpen && (
            <motion.div
              initial={{ y: "-100%", scale: 0 }}
              animate={{ y: "0%", scale: 1 }}
              exit={{
                y: "-100%",
                opacity: 0,
                transition: { duration: 0.3, ease: "easeInOut" },
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
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative m-2">
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <h2 className="text-xl text-gray-200">
                    {isSigningUp ? "Sign Up" : "Sign In"}
                  </h2>
                  <h2
                    onClick={() => setIsAuthFormOpen(false)}
                    className="text-sm text-blue-700 cursor-pointer"
                  >
                    Skip for now
                  </h2>
                </div>
                {isSigningUp ? (
                  <SignUpForm setIsAuthFormOpen={setIsAuthFormOpen} />
                ) : (
                  <SignInForm setIsAuthFormOpen={setIsAuthFormOpen} />
                )}
                <button
                  onClick={() => setIsSigningUp(!isSigningUp)}
                  className="text-sm text-blue-700 cursor-pointer w-full text-center mt-4"
                >
                  {isSigningUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default AuthForm;
