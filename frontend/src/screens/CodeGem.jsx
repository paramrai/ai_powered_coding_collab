import React, { useEffect, useState } from "react";
import { useMobileCheck } from "../hooks/useMobileCheck";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import axiosInstance from "../configs/axiosInstance";
import { useDispatch } from "react-redux";
import { setGem } from "../redux/slices/gemSlice";
import LeftBar from "../components/CodeGem/LeftBar";
import LeftBarPanel from "../components/CodeGem/LeftBarPanel";
import CodeSpace from "../components/CodeGem/CodeSpace";
import MobileChatOption from "../components/CodeGem/MobileChatOption";
import DesktopChatOption from "../components/CodeGem/DesktopChatOption";

const CodeGem = () => {
  const isMobile = useMobileCheck();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isVideoChatOpen, setIsVideoChatOpen] = useState(true);
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
            setIsVideoChatOpen={setIsVideoChatOpen}
            setIsChatOpen={setIsChatOpen}
          />
          <LeftBarPanel
            isLeftbarPanel={isLeftbarPanel}
            setIsLeftbarPanel={setIsLeftbarPanel}
          />
          <CodeSpace
            isVideoChatOpen={isVideoChatOpen}
            setIsVideoChatOpen={setIsChatOpen}
          />
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
