import { useDispatch, useSelector } from "react-redux";
import { selectCurrentGem, updateStatus } from "../../redux/slices/gemSlice";
import { selectUser } from "../../redux/slices/userSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "../../redux/socket/SocketProvider";
import { toast } from "react-toastify";
import {
  addGroupMessage,
  selectGroupMessages,
} from "../../redux/slices/messageSlice";

function GroupChatScreen({ activeTab }) {
  const socket = useSocket();
  const [message, setMessage] = useState();
  const gem = useSelector(selectCurrentGem);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const groupMessages = useSelector(selectGroupMessages);

  useEffect(() => {
    if (socket) {
      socket.emit("join-room", gem._id);

      socket.on("userOnline", (user) => {
        dispatch(updateStatus(user));
        toast.info(`${user.username} is online now`);
      });

      socket.on("userOffline", (user) => {
        dispatch(updateStatus(user));
        toast.info(`${user.username} goes offline`);
      });

      // Listen for new messages
      socket.on("new-message", (msg) => {
        dispatch(addGroupMessage(msg));
        scrollToBottom();
      });

      return () => {
        socket.off("new-message");
        socket.off("userOffline");
        socket.off("userOnline");
      };
    }
  }, [socket]);

  // refs
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // !scroll to bottom on new msg added
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [groupMessages]);

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

  const collaborator = gem.collaborator.filter(
    (person) => person._id !== user._id
  );

  const onlineUsers = collaborator.filter((user) => user.isActive);
  const offlineUsers = collaborator.filter((user) => !user.isActive);

  const sendMessage = (e) => {
    e.preventDefault();
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    let hours = String(currentDate.getHours()).padStart(2, "0");
    if (hours > 12) {
      hours -= 12;
    }
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    let msg = {
      sender: user.username,
      message: message,
      time: `${formattedTime} ,${formattedDate} `,
      avatar: user.username.slice(0, 2),
    };

    if (socket) {
      socket.emit("send-message", { msg, gem });
      dispatch(addGroupMessage(msg));
      setMessage("");
      scrollToBottom();
    }
  };

  return (
    activeTab === "chat" && (
      <div className="h-full flex flex-col">
        <div className="flex-1">
          <div className="flex gap-4 p-2 scrollbar-hide overflow-x-auto bg-slate-900 sticky top-0">
            {onlineUsers.map((user, i) => (
              <div key={i} className="relative group">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold cursor-pointer">
                  {user.avatar || user.username.slice(0, 2).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 bg-green-500"></div>
                <div className="absolute top-0 left-0 bg-green-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                  {user.username}
                  <div className="text-[10px] text-gray-300">
                    {user.lastMessage || "Lets debug"}
                  </div>
                </div>
              </div>
            ))}
            {offlineUsers.map((user) => (
              <div key={user.id} className="relative group">
                <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold opacity-70 cursor-pointer">
                  {user.avatar || user.username.slice(0, 2).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 bg-gray-500"></div>
                <div className="absolute top-0 left-0 bg-gray-700 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                  {user.username}
                  <div className="text-[10px] text-gray-300">
                    {user.time || "1h ago"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Group Chat Section */}
          <div className="mt-4 px-4">
            <div className="text-gray-400 text-sm mb-2">Group Chat</div>
            <div className="space-y-4 flex flex-col pb-2">
              {groupMessages.map((msg) => (
                <div key={msg.id} className={`flex gap-3`}>
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm flex-shrink-0">
                    {msg.avatar.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-white">
                        {msg.sender === user.username ? "You" : msg.sender}
                      </span>
                      <span className="text-xs text-gray-400">{msg.time}</span>
                    </div>
                    <div className="mt-1 text-gray-300 text-sm bg-gray-700 rounded-xl p-2 w-fit">
                      {msg.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div ref={messagesEndRef} />
        <div className="chat-promt sticky bottom-0 w-full px-2 pb-2">
          <form onSubmit={sendMessage} className="flex pt-2">
            <input
              ref={inputRef}
              type="text"
              className="flex-grow p-2 border rounded-lg bg-gray-700 text-white w-full"
              placeholder="Search or start new chat..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
      </div>
    )
  );
}

export default GroupChatScreen;
