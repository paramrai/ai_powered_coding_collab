import React, { useEffect, useRef, useState } from "react";
import { useMobileCheck } from "../hooks/useMobileCheck";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import axiosInstance from "../configs/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentGem,
  setGem,
  setOpenFiles,
} from "../redux/slices/gemSlice";
import LeftBar from "../components/CodeGem/LeftBar";
import LeftBarPanel from "../components/CodeGem/LeftBarPanel";
import CodeSpace from "../components/CodeGem/CodeSpace";
import MobileChatOption from "../components/CodeGem/MobileChatOption";
import DesktopChatOption from "../components/CodeGem/DesktopChatOption";
import { selectUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import useOwnerOrCollaberCheck from "../hooks/useOwnerOrCollaberCheck";
import { updateHeight } from "../utils/hieght";

const CodeGem = () => {
  const isMobile = useMobileCheck();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isVideoChatOpen, setIsVideoChatOpen] = useState(true);
  const [isLeftbarPanel, setIsLeftbarPanel] = useState(!isMobile);
  const [chatPanelWidth, setChatPanelWidth] = useState(400); // Initial width for the chat panel
  const [isGemFound, setIsGemFound] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const ownerOrCollaber = useOwnerOrCollaberCheck();
  const currentGem = useSelector(selectCurrentGem);
  const { gemName } = useParams();
  const codeGemRef = useRef();

  // for Mob ui
  useEffect(() => {
    updateHeight(codeGemRef);
    window.addEventListener("resize", updateHeight(codeGemRef));
  }, []);

  useEffect(() => {
    if (!ownerOrCollaber && currentGem._id) {
      toast.info(
        "You are not owner or collaborator to this gem so you can only see this gem , create your own gem to edit , chats and prompt to ai , and invite users to your gems"
      );
    }

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
      <div className="h-[90vh] w-full flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main
      ref={codeGemRef}
      className="main_container max- w-full overflow-hidden flex bg-slate-900"
    >
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
            ownerOrCollaber={ownerOrCollaber}
          />
          {ownerOrCollaber && <MobileChatOption />}
          {ownerOrCollaber && (
            <DesktopChatOption
              isChatOpen={isChatOpen}
              setIsChatOpen={setIsChatOpen}
              width={chatPanelWidth}
              setWidth={setChatPanelWidth}
            />
          )}
        </>
      ) : (
        <NotFound msg={"Ooops No Gem Found !"} />
      )}
    </main>
  );
};

export default CodeGem;
