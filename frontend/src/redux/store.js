import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "./slices/socketSlice";
import userReducer from "./slices/userSlice";
import gemReducer from "./slices/gemSlice";

export const store = configureStore({
  reducer: {
    socket: socketReducer,
    user: userReducer,
    gems: gemReducer,
  },
});
