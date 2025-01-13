import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    connected: false,
    socket: null,
  },
  reducers: {
    setConnect: (state, action) => {
      state.connected = true;
      state.socket = action.payload;
    },
    setDisconnect: (state) => {
      state.connected = false;
      state.socket = null;
    },
  },
});

export default socketSlice.reducer;
export const selectSocket = (state) => state.socket;
export const { setConnect, setDisconnect } = socketSlice.actions;
