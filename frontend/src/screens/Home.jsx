import React, { useEffect, useState } from "react";
import InfoCards from "../components/home/InfoCards";
import Navbar from "../components/home/Navbar";
import HomeTabs from "../components/home/HomeTabs";
import Footer from "../components/home/Footer";
import GemSection from "../components/home/GemSection";
import { useSocket } from "../redux/socket/SocketProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToken,
  selectUser,
  updateUserObject,
} from "../redux/slices/userSlice";

const Home = () => {
  const socket = useSocket();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    // show online when user enters in home
    if (socket && user._id && token) {
      socket.emit("join", { userId: user._id });

      socket.on("joined", (user) => {
        dispatch(updateUserObject(user));
      });
    } else {
      if (socket) socket.emit("logged-out", { socketId: socket.id });
    }
  }, [socket, token, user._id]);

  if (!socket) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="h-full overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
      <Navbar />
      <HomeTabs />
      <GemSection />
      <InfoCards />
      <Footer />
    </main>
  );
};

export default Home;
