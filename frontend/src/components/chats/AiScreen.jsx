import { useDispatch, useSelector } from "react-redux";
import { selectToken, selectUser } from "../../redux/slices/userSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import axiosInstance from "../../configs/axiosInstance";
import { addMessage, selectAiMessages } from "../../redux/slices/messageSlice";
import { toast } from "react-toastify";
import {
  addNewFile,
  saveFileContent,
  selectFileTree,
  selectOpenFiles,
  selectPath,
  setActiveFile,
  setOpenFiles,
} from "../../redux/slices/gemSlice";

function AiScreen({ activeTab }) {
  const messages = useSelector(selectAiMessages);
  const { username } = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [referenceFiles, setreferenceFiles] = useState({});
  const [prompt, setPrompt] = useState("");
  const openFiles = useSelector(selectOpenFiles);
  const fileTree = useSelector(selectFileTree);
  const path = useSelector(selectPath);

  // refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  function findFileAndRead(iterable, name) {
    if (!Array.isArray(iterable)) {
      console.error("iterable is not an array");
      return;
    }

    for (let child of iterable) {
      if (child.name === name) {
        if (child.type === "file") {
          return child.content;
        }
      }

      if (child.children) {
        const result = findFileAndRead(child.children, name);
        if (result) return result;
      }
    }
    return null;
  }

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

    // collect all file references
    const checkedRefs = document.querySelectorAll('input[name="fileOption"]');

    checkedRefs.forEach((ref) => {
      if (ref.checked) {
        const content = findFileAndRead(fileTree, ref.value);
        referenceFiles[ref.value] = content;
      }
    });

    if (prompt.trim() !== "") {
      try {
        setLoading(true);
        // send msg
        dispatch(
          addMessage({
            msg: prompt,
            sender: username,
          })
        );
        setPrompt("");
        scrollToBottom();

        // reciecve msg
        const response = await axiosInstance.post(
          "/ai/getResult",
          {
            prompt,
            referenceFiles,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data);

          const files = Object.keys(response.data.code);

          files.forEach((file) => {
            const isFileExist = findFileAndRead(fileTree, file);

            if (!isFileExist) {
              dispatch(addNewFile({ type: "file", name: file }));
              dispatch(setActiveFile(files[0]));
              dispatch(setOpenFiles({ name: file, path }));
            }

            dispatch(
              saveFileContent({
                name: file,
                path,
                content: response.data.code[file],
              })
            );
          });

          dispatch(
            addMessage({
              msg: response.data.text,
              sender: "ai",
            })
          );

          let plan = "";

          if (response.data.plan) {
            for (let [key, value] of Object.entries(response.data.plan)) {
              plan += ` ${key}: ${value} `;
            }

            dispatch(
              addMessage({
                msg: `here is plan ${plan}`,
                sender: "ai",
              })
            );
          }

          scrollToBottom();
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data.msg || error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    activeTab === "ai" && (
      <div className="h-full flex flex-col">
        <div className="flex-1 py-2 flex flex-col gap-2">
          {messages.map((message, index) => (
            <div key={index} className="h-auto flex flex-col">
              <div
                className={`flex items-start gap-2 ${
                  message.sender === username ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">
                  {message.sender === username
                    ? username.substring(0, 2).toUpperCase()
                    : "AI"}
                </div>
                <div
                  className={`flex flex-col w-full ${
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
                    className={`p-2 px-3 shadow-md max-w-[70%] rounded-2xl h-auto
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
            <div className="flex items-start gap-2 mt-2">
              <div className="min-w-8 min-h-8 max-w-8 max-h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">
                AI
              </div>

              <div
                id="loading-bubble"
                className="w-fit px-6 py-4 mb-2 bg-gray-700 flex justify-center items-center rounded-2xl"
              >
                <div id="spinner" className="flex gap-1">
                  <div className="bounce1 w-[9px] h-[9px] bg-[#dcdcdc] rounded-full inline-block"></div>
                  <div className="bounce2 w-[9px] h-[9px] bg-[#dcdcdc] rounded-full inline-block"></div>
                  <div className="bounce3 w-[9px] h-[9px] bg-[#dcdcdc] rounded-full inline-block"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
        <div className="flex flex-col flex-wrap gap-1 bg-gray-700 p-4 rounded sticky bottom-0">
          <h2 className="text-gray-400 text-sm font-semibold">
            Select reference files
          </h2>
          {!openFiles.length && (
            <h4 className="text-gray-400 text-xs font-semibold">
              Open a file to select refs
            </h4>
          )}
          <div className="flex flex-wrap gap-3 overflow-auto items-center">
            {openFiles.map((file, i) => (
              <label
                key={i}
                className="flex items-center space-x-3 text-white px-3 py-2 rounded-lg transition-all hover:bg-gray-700 bg-gray-750 border-gray-600 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 cursor-pointer rounded-md text-blue-500 bg-gray-600 transition-all"
                  name="fileOption"
                  value={file.name}
                />
                <span className="text-sm font-medium text-gray-200">
                  {file.name}
                </span>
              </label>
            ))}
          </div>
          <div className="chat-promt sticky bottom-0 w-full">
            <form onSubmit={sendMessage} className="flex pt-2">
              <input
                ref={inputRef}
                type="text"
                className="flex-grow p-2 border rounded-lg bg-gray-700 text-white w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Type your message..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-lg ml-2 hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export default AiScreen;
