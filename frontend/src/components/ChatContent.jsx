import React, { useEffect, useRef, useState } from "react";
import { FaRobot, FaUserPlus, FaComments } from "react-icons/fa";
import { RiNotificationBadgeFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

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
  const [messages, setMessages] = useState([
    { msg: "Hello!", sender: "Alice" },
    { msg: "How's it going?", sender: "Bob" },
    { msg: "What are you up to?", sender: "me" },
    { msg: "Long time no see!", sender: "Diana" },
    { msg: "Good morning!", sender: "me" },
    { msg: "Any plans for the weekend?", sender: "Frank" },
    { msg: "Guess what?", sender: "Grace" },
    { msg: "I'm so excited!", sender: "Hank" },
    { msg: "Need any help?", sender: "me" },
    { msg: "Just checking in.", sender: "Jack" },
    { msg: "What's new?", sender: "Kate" },
    { msg: "I'm here!", sender: "Leo" },
    { msg: "Let's catch up.", sender: "me" },
    { msg: "Happy to see you!", sender: "Nina" },
    { msg: "How have you been?", sender: "Oscar" },
    { msg: "Good afternoon!", sender: "me" },
    { msg: "What's for lunch?", sender: "Quinn" },
    { msg: "Stay safe!", sender: "Rita" },
    { msg: "Good night!", sender: "me" },
    { msg: "Have a great day!", sender: "Tina" },
    { msg: "See you soon.", sender: "Uma" },
    { msg: "Take care.", sender: "Vince" },
    { msg: "Thanks!", sender: "Wendy" },
    { msg: "You're welcome.", sender: "me" },
    { msg: "How's the weather?", sender: "Yara" },
    { msg: "I'm on my way.", sender: "Zack" },
    { msg: "Can't wait to chat.", sender: "Anna" },
    { msg: "Feeling great today.", sender: "Ben" },
    { msg: "Need to talk.", sender: "Cara" },
    { msg: "Exciting news!", sender: "Dave" },
    { msg: "How's work?", sender: "Ella" },
    { msg: "Let's hang out.", sender: "me" },
    { msg: "Busy day ahead.", sender: "Gina" },
    { msg: "Thinking of you.", sender: "Hugo" },
    { msg: "Miss you!", sender: "Isla" },
    { msg: "Catch you later.", sender: "Jay" },
    { msg: "What's your plan?", sender: "Kim" },
    { msg: "All good here.", sender: "me" },
    { msg: "Need a break.", sender: "Mila" },
    { msg: "Talk to you soon.", sender: "Noah" },
    { msg: "See you later.", sender: "Ola" },
    { msg: "Feeling sleepy.", sender: "Pia" },
    { msg: "Good job!", sender: "Qasim" },
    { msg: "You did it!", sender: "Riya" },
    { msg: "Time for coffee.", sender: "Sean" },
    { msg: "On a call.", sender: "Tara" },
    { msg: "Need advice.", sender: "Umar" },
    { msg: "Happy Monday!", sender: "Vera" },
    { msg: "So tired.", sender: "Will" },
    { msg: "Congrats!", sender: "Xia" },
    { msg: "Let's chat.", sender: "Yusuf" },
    { msg: "Feeling hopeful.", sender: "Zara" },
    { msg: "What's up?", sender: "Ahmed" },
    { msg: "Back to work.", sender: "Bella" },
    { msg: "Loving this weather.", sender: "Cody" },
    { msg: "Ready for the day.", sender: "Dana" },
    { msg: "Had a great day.", sender: "Eli" },
    { msg: "Feeling grateful.", sender: "Faye" },
    { msg: "Happy Friday!", sender: "Gus" },
    { msg: "Ready for the weekend.", sender: "Hilda" },
    { msg: "On my way.", sender: "me" },
    { msg: "Just arrived.", sender: "Jill" },
    { msg: "All set.", sender: "Karl" },
    { msg: "Good evening!", sender: "Lana" },
    { msg: "Talk soon.", sender: "Matt" },
    { msg: "Great job today.", sender: "Nora" },
    { msg: "So excited.", sender: "Omar" },
    { msg: "Feeling motivated.", sender: "Pia" },
    { msg: "Need a chat.", sender: "Quinn" },
    { msg: "Thinking about you.", sender: "Rick" },
    { msg: "What a day!", sender: "Sue" },
    { msg: "Almost there.", sender: "Tom" },
    { msg: "Good to go.", sender: "Uma" },
    { msg: "Keep it up!", sender: "Vic" },
    { msg: "Feeling awesome.", sender: "Wes" },
    { msg: "Great news!", sender: "Xena" },
    { msg: "Need your opinion.", sender: "Yani" },
    { msg: "Let's do this.", sender: "Zoe" },
    { msg: "Happy to help.", sender: "Alex" },
    { msg: "Great seeing you.", sender: "Blake" },
    { msg: "Stay positive.", sender: "Chad" },
    { msg: "Good vibes only.", sender: "Dixie" },
    { msg: "Excited for this.", sender: "Evan" },
    { msg: "Ready when you are.", sender: "Fay" },
    { msg: "Have a good one.", sender: "Gabe" },
    { msg: "Best wishes.", sender: "Hana" },
    { msg: "Cheering you on.", sender: "Ike" },
    { msg: "You've got this.", sender: "Joy" },
    { msg: "Stay strong.", sender: "Kyle" },
    { msg: "Feeling fantastic.", sender: "Lara" },
    { msg: "Keep smiling.", sender: "Max" },
    { msg: "So proud of you.", sender: "Nina" },
  ]);
  const [input, setInput] = useState("");
  const chatWindowRef = useRef("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { msg: input, sender: "me" }]);
      setInput("");
      setTimeout(() => {
        const chatWindow = chatWindowRef.current;
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }, 0);
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
              className={`border border-gray-300 p-2 px-3 bg-gray-300 shadow-md whitespace-break-spaces 
                w-max max-w-[70%] rounded-bl-2xl rounded-tr-2xl h-auto break-words
                ${
                  message.sender === "me"
                    ? "self-end rounded-tl-2xl"
                    : "rounded-br-2xl"
                }`}
            >
              {message.msg}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-input flex pt-2">
        <input
          type="text"
          className="flex-grow p-2 border rounded-lg bg-gray-700 text-white"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-lg ml-2"
          onClick={() => {
            sendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContent;
