import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_URL);

    newSocket.on("connect", () => {
      console.info(`A user connected with ID: ${newSocket.id}`);
      setSocket(newSocket);
    });

    newSocket.on("disconnect", (reason) => {
      console.info(`User disconnected due to ${reason}`);
      setSocket(null);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
