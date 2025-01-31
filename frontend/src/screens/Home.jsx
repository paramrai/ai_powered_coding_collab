// react and redux
import React, { useEffect, useRef } from "react";
import { updateHeight } from "../utils/hieght";
import InfoCards from "../components/home/InfoCards";
import Navbar from "../components/home/Navbar";
import HomeTabs from "../components/home/HomeTabs";
import Footer from "../components/home/Footer";
import GemSection from "../components/home/GemSection";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";

const Home = () => {
  const homeRef = useRef();
  const user = useSelector(selectUser);

  // for Mob ui
  useEffect(() => {
    updateHeight(homeRef);
    document.title = user?.username
      ? `${
          user.username.charAt(0).toUpperCase() + user.username.slice(1)
        } : Code Gems`
      : `Ai Powered : Code Gems`;
    window.addEventListener("resize", updateHeight(homeRef));
  }, []);

  return (
    <main
      ref={homeRef}
      className="h-full overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
    >
      <Navbar />
      <HomeTabs />
      <GemSection />
      <InfoCards />
      <Footer />
    </main>
  );
};

export default Home;
