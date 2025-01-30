import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// component
import Home from "./screens/Home";
import CodeGem from "./screens/CodeGem";
import NotFound from "./components/NotFound";
import { useSocket } from "./redux/socket/SocketProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToken,
  selectUser,
  updateUserObject,
} from "./redux/slices/userSlice";

const App = () => {
  const socket = useSocket();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  useEffect(() => {
    // show online when user enters in home
    if (socket && user._id && token) {
      socket.emit("join", { userId: user._id });

      socket.on("joined", (user) => {
        dispatch(updateUserObject(user));
      });
    } else {
      if (socket) socket.emit("logged-out", { socketId: socket.id });
    }
  }, [socket, token, user._id]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gem/:gemName" element={<CodeGem />} />
        <Route path="*" element={<NotFound msg={"Oops Page Not Found !"} />} />
      </Routes>
    </>
  );
};

export default App;
