import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { setConnect, setDisconnect } from "../slices/socketSlice";

const socket = io(import.meta.env.VITE_API_URL, {
  reconnection: false,
});

const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleConnect = () => {
      console.log("Attempting to connect...");
      dispatch(setConnect(socket));
      console.log("Socket connected and state updated");
    };

    const handleDisconnect = () => {
      console.log("Attempting to disconnect...");
      dispatch(setDisconnect());
      console.log("Socket disconnected and state updated");
    };

    console.log(import.meta.env.VITE_API_URL);
    console.log("Setting up socket event listeners...");
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      console.log("Cleaning up socket event listeners...");
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [dispatch]);

  return <div>{children}</div>;
};

export default SocketProvider;
