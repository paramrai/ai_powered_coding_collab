import React, { useEffect, useState } from "react";
import CodeSpace from "../components/CodeSpace";
import MobileChatOption from "../components/MobileChatOption";
import DesktopChatOption from "../components/DesktopChatOption";
import LeftBar from "../components/LeftBar";
import LeftBarPanel from "../components/LeftBarPanel";
import { useMobileCheck } from "../hooks/useMobileCheck";
import { useLocation, useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import axiosInstance from "../axios/axiosInstance";
import { useDispatch } from "react-redux";
import { setGem } from "../redux/slices/gemSlice";

const CodeGem = () => {
  const isMobile = useMobileCheck();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isLeftbarPanel, setIsLeftbarPanel] = useState(!isMobile);
  const [chatPanelWidth, setChatPanelWidth] = useState(400); // Initial width for the chat panel
  const [isGemFound, setIsGemFound] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const { gemName } = useParams();

  useEffect(() => {
    const readGem = async () => {
      try {
        const res = await axiosInstance.get(`/gems/readGem/${gemName}`);

        if (res.status === 200) {
          setIsGemFound(true);
          dispatch(setGem(res.data));
        }
      } catch (error) {
        setIsGemFound(false);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    readGem();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="main_container max-h-screen w-full overflow-hidden flex bg-slate-900">
      {isGemFound ? (
        <>
          <LeftBar
            isLeftbarPanel={isLeftbarPanel}
            setIsLeftbarPanel={setIsLeftbarPanel}
          />
          <LeftBarPanel
            isLeftbarPanel={isLeftbarPanel}
            setIsLeftbarPanel={setIsLeftbarPanel}
          />
          <CodeSpace />
          <MobileChatOption />
          <DesktopChatOption
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
            width={chatPanelWidth}
            setWidth={setChatPanelWidth}
          />
        </>
      ) : (
        <NotFound msg={"Ooops No Gem Found !"} />
      )}
    </main>
  );
};

export default CodeGem;
