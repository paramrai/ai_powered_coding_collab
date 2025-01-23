import { useSelector } from "react-redux";
import { selectCurrentGem } from "../../redux/slices/gemSlice";

function GroupChatScreen({ activeTab }) {
  const gem = useSelector(selectCurrentGem);
  const collaborator = gem.collaborator;

  const onlineUsers = collaborator.filter((user) => user.isOnline);
  const offlineUsers = collaborator.filter((user) => !user.isOnline);

  // Add sample group messages
  const groupMessages = [
    {
      id: 1,
      sender: "Mike Johnson",
      message: "I've pushed the new changes to the repo",
      time: "10:30 AM",
      avatar: "MJ",
    },
    {
      id: 2,
      sender: "Sarah Wilson",
      message: "Great! I'll review the code changes",
      time: "10:32 AM",
      avatar: "SW",
    },
    {
      id: 3,
      sender: "Pike Jade",
      message: "Found a bug in the authentication flow",
      time: "10:45 AM",
      avatar: "PJ",
    },
  ];

  return (
    activeTab === "chat" && (
      <div className="h-full flex flex-col">
        <div className="flex-1">
          <div className="flex gap-4 p-2 scrollbar-hide overflow-x-auto">
            {onlineUsers.map((user) => (
              <div key={user.id} className="relative group">
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
            <div className="space-y-4">
              {groupMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm flex-shrink-0">
                    {msg.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-white">
                        {msg.sender}
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
        {/* <div ref={messagesEndRef} /> */}
        <div className="chat-promt sticky bottom-0 w-full px-2 pb-2">
          <form
            // onSubmit={sendMessage}
            className="flex pt-2"
          >
            <input
              // ref={inputRef}
              type="text"
              className="flex-grow p-2 border rounded-lg bg-gray-700 text-white w-full"
              placeholder="Search or start new chat..."
              // value={message}
              // onChange={(e) => setMessage(e.target.value)}
              // onKeyDown={handleKeyDown}
              // onFocus={handleInputFocus}
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
