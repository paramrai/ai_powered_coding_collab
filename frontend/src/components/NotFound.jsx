import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const NotFound = ({ msg }) => {
  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 
      flex items-center justify-center p-4 overflow-hidden relative"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/10 rounded-full"
            style={{
              width: Math.random() * 4 + 2 + "px",
              height: Math.random() * 4 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            className="mb-8"
          >
            <h1
              className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-purple-400 to-pink-600 leading-none select-none"
            >
              404
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4 
              bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200"
            >
              {msg}
            </h2>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-xl mx-auto">
              Looks like you've ventured into uncharted territory. Let's get you
              back on track!
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="inline-flex items-center px-8 py-3 rounded-full
                  bg-gradient-to-r from-purple-500 to-pink-500 text-white
                  font-medium transition-all duration-200 hover:from-purple-600
                  hover:to-pink-600 hover:shadow-lg hover:shadow-purple-500/30
                  space-x-2 group"
              >
                <span>Return to Home</span>
                <svg
                  className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
