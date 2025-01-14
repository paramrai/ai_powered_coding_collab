import React, { useState } from "react";

function Inbox() {
  const invites = [
    {
      id: 1,
      user: "John Doe",
      message: "John has invited you to join the project.",
    },
    {
      id: 2,
      user: "Jane Smith",
      message: "Jane has sent you an invite to the meeting.",
    },
    {
      id: 1,
      user: "John Doe",
      message: "John has invited you to join the project.",
    },
    {
      id: 2,
      user: "Jane Smith",
      message: "Jane has sent you an invite to the meeting.",
    },
    {
      id: 1,
      user: "John Doe",
      message: "John has invited you to join the project.",
    },
    {
      id: 2,
      user: "Jane Smith",
      message: "Jane has sent you an invite to the meeting.",
    },
    {
      id: 1,
      user: "John Doe",
      message: "John has invited you to join the project.",
    },
    {
      id: 2,
      user: "Jane Smith",
      message: "Jane has sent you an invite to the meeting.",
    },
    {
      id: 1,
      user: "John Doe",
      message: "John has invited you to join the project.",
    },
    {
      id: 2,
      user: "Jane Smith",
      message: "Jane has sent you an invite to the meeting.",
    },
    {
      id: 1,
      user: "John Doe",
      message: "John has invited you to join the project.",
    },
    {
      id: 2,
      user: "Jane Smith",
      message: "Jane has sent you an invite to the meeting.",
    },
    {
      id: 1,
      user: "John Doe",
      message: "John has invited you to join the project.",
    },
    {
      id: 2,
      user: "Jane Smith",
      message: "Jane has sent you an invite to the meeting.",
    },
    {
      id: 1,
      user: "John Doe",
      message: "John has invited you to join the project.",
    },
    {
      id: 2,
      user: "Jane Smith",
      message: "Jane has sent you an invite to the meeting.",
    },
    {
      id: 1,
      user: "John Doe",
      message: "John has invited you to join the project.",
    },
    {
      id: 2,
      user: "Jane Smith",
      message: "Jane has sent you an invite to the meeting.",
    },
    {
      id: 1,
      user: "John Doe",
      message: "John has invited you to join the project.",
    },
    {
      id: 2,
      user: "Jane Smith",
      message: "Jane has sent you an invite to the meeting.",
    },
  ];

  const messages = [
    { id: 1, user: "Alice Brown", message: "Alice sent you a message." },
    {
      id: 2,
      user: "Charlie Davis",
      message: "Charlie replied to your comment.",
    },
    { id: 1, user: "Alice Brown", message: "Alice sent you a message." },
    {
      id: 2,
      user: "Charlie Davis",
      message: "Charlie replied to your comment.",
    },
    { id: 1, user: "Alice Brown", message: "Alice sent you a message." },
    {
      id: 2,
      user: "Charlie Davis",
      message: "Charlie replied to your comment.",
    },
    { id: 1, user: "Alice Brown", message: "Alice sent you a message." },
    {
      id: 2,
      user: "Charlie Davis",
      message: "Charlie replied to your comment.",
    },
    { id: 1, user: "Alice Brown", message: "Alice sent you a message." },
    {
      id: 2,
      user: "Charlie Davis",
      message: "Charlie replied to your comment.",
    },
  ];

  const [currentTab, setCurrentTab] = useState("invites");
  const [notifications, setNotifications] = useState(invites);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
    setNotifications(tab === "invites" ? invites : messages);
  };

  const handleClose = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
      <div className="bg-gray-900 text-gray-100 p-10 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <div className="flex border-b-2 bg-slate-900 border-gray-700 mb-4 sticky top-0">
          <button
            onClick={() => handleTabClick("invites")}
            className={`flex-1 py-2 text-center ${
              currentTab === "invites"
                ? "border-b-4 border-blue-500 text-blue-400"
                : "text-gray-400 hover:text-blue-400 hover:border-blue-500"
            }`}
          >
            Invites
          </button>
          <button
            onClick={() => handleTabClick("messages")}
            className={`flex-1 py-2 text-center ${
              currentTab === "messages"
                ? "border-b-4 border-blue-500 text-blue-400"
                : "text-gray-400 hover:text-blue-400 hover:border-blue-500"
            }`}
          >
            Messages
          </button>
        </div>
        <div>
          {notifications.map((notification, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow mb-2"
            >
              <div>
                <p className="font-bold">{notification.user}</p>
                <p>{notification.message}</p>
              </div>
              <button
                onClick={() => handleClose(notification.id)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inbox;
