import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./slices/socketSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    socket: socketReducer,
    user: userReducer,
  },
});
