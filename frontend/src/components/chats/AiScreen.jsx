import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  selectMessages,
} from "../../redux/slices/conversationSlice";
import { selectUser } from "../../redux/slices/userSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";

function AiScreen({ activeTab }) {
  const messages = useSelector(selectMessages);
  const { username } = useSelector(selectUser);
  const [promt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // !scroll to bottom on new msg added
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages]);

  // !handled for focus issue
  const handleInputFocus = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // !Prevent space from triggering blur
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.stopPropagation();
    }
  };

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
        scrollToBottom();

        // reciecve msg
        const response = await axiosInstance("/ai/getResult", {
          params: {
            prompt: promt,
          },
        });

        if (response.status === 200) {
          console.log(response.data);
          dispatch(
            addMessage({
              msg: response.data.text,
              sender: "ai",
            })
          );
          scrollToBottom();
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg || error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    activeTab === "ai" && (
      <>
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col mb-4">
            <div
              className={`flex items-start gap-2 ${
                message.sender === username ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className="min-w-8 min-h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">
                {message.sender === username
                  ? username.substring(0, 2).toUpperCase()
                  : "AI"}
              </div>
              <div
                className={`flex flex-col ${
                  message.sender === username ? "items-end" : "items-start"
                }`}
              >
                <span className="text-xs text-gray-400 mb-1">
                  {message.sender === username ? "You" : "AI Assistant"} •{" "}
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <div
                  className={`p-2 px-3 shadow-md whitespace-break-spaces w-[70%] rounded-2xl h-auto
                  ${
                    message.sender === username
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  {message.msg}
                </div>
              </div>
            </div>
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
        <div ref={messagesEndRef} />
        <div className="chat-promt sticky bottom-0 left-0 w-full px-2 pb-2">
          <form onSubmit={sendMessage} className="flex pt-2">
            <input
              ref={inputRef}
              type="text"
              className="flex-grow p-2 border rounded-lg bg-gray-700 text-white w-full"
              placeholder="Type your message..."
              value={promt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg ml-2"
            >
              Send
            </button>
          </form>
        </div>
      </>
    )
  );
}

export default AiScreen;
