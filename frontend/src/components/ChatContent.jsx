import React, { useEffect, useRef, useState } from "react";
import { FaRobot, FaUserPlus, FaComments } from "react-icons/fa";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, selectMessages } from "../redux/slices/conversationSlice";
import { selectUser } from "../redux/slices/userSlice";
import axiosInstance from "../axios/axiosInstance";
import { toast } from "react-toastify";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex">
      <div
        className={`cursor-pointer p-2 border-b-[1px] ${
          activeTab === "ai"
            ? "text-white border-cyan-300"
            : "text-gray-400 border-transparent"
        }`}
        onClick={() => setActiveTab("ai")}
      >
        <FaRobot className="text-md hover:text-white" />
      </div>
      <div
        className={`cursor-pointer p-2 border-b-[1px] ${
          activeTab === "chat"
            ? "text-white border-cyan-300"
            : "text-gray-400 border-transparent"
        }`}
        onClick={() => setActiveTab("chat")}
      >
        <RiNotificationBadgeFill className="text-md hover:text-white" />
      </div>
      <div
        className={`cursor-pointer p-2 border-b-[1px] ${
          activeTab === "add"
            ? "text-white border-cyan-300"
            : "text-gray-400 border-transparent"
        }`}
        onClick={() => setActiveTab("add")}
      >
        <FaUserPlus className="text-md hover:text-white" />
      </div>
    </div>
  );
};

const ChatContent = ({ setIsChatOpen }) => {
  const [activeTab, setActiveTab] = useState("ai");
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();
  const { username } = useSelector(selectUser);

  const [promt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (promt.trim() !== "") {
      try {
        setLoading(true);
        // send msg
        dispatch(
          addMessage({
            msg: promt,
            sender: username,
          })
        );
        setPrompt("");
        setTimeout(() => {
          const chatWindow = chatWindowRef.current;
          chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 0);

        // reciecve mdg
        const response = await axiosInstance("/ai/getResult", {
          params: {
            prompt: promt,
          },
        });

        if (response.status === 200) {
          console.log(response.data);
          // dispatch(
          //   addMessage({
          //     msg: response.data,
          //     sender: "ai",
          //   })
          // );
          setTimeout(() => {
            const chatWindow = chatWindowRef.current;
            chatWindow.scrollTop = chatWindow.scrollHeight;
          }, 0);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <button
          onClick={() => setIsChatOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          <IoMdClose className="text-xl" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div
          ref={chatWindowRef}
          className="flex flex-col gap-2 chat_window scroll-smooth h-full overflow-y-auto 
          py-1 overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 px-3 bg-gray-300 shadow-md whitespace-break-spaces 
                w-max max-w-[70%] rounded-bl-2xl rounded-tr-2xl h-auto break-words
                ${
                  message.sender === username
                    ? "self-end rounded-tl-2xl"
                    : "rounded-br-2xl bg-slate-800 text-white"
                }`}
            >
              {message.msg}
            </div>
          ))}
          {loading && (
            <div
              id="loading-bubble"
              className="w-fit px-6 py-4 bg-slate-800 flex justify-center items-center rounded-br-xl rounded-bl-xl rounded-tr-xl"
            >
              <div id="spinner" className="flex gap-1">
                <div className="bounce1 w-[9px] h-[9px] bg-[#dcdcdc] rounded-full inline-block"></div>
                <div className="bounce2 w-[9px] h-[9px] bg-[#dcdcdc] rounded-full inline-block"></div>
                <div className="bounce3 w-[9px] h-[9px] bg-[#dcdcdc] rounded-full inline-block"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="chat-promt">
        <form onSubmit={sendMessage} className="flex pt-2">
          <input
            type="text"
            className="flex-grow p-2 border rounded-lg bg-gray-700 text-white w-full"
            placeholder="Type your message..."
            value={promt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg ml-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContent;
