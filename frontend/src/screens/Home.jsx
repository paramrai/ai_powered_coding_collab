import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../axios/axiosInstance";
import { selectExploreGems, setExploreGem } from "../redux/slices/gemSlice";
import InfoCards from "../components/home/InfoCards";
import Navbar from "../components/home/Navbar";
import HomeTabs from "../components/home/HomeTabs";
import Footer from "../components/home/Footer";
import GemSection from "../components/home/GemSection";

const Home = () => {
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
