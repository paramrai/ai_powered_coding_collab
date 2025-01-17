import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: [
    {
      msg: "Hello",
      sender: "Ai",
    },
  ],
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload);
    },
  },
});

export default messagesSlice.reducer;

// selection
export const selectMessages = (state) => state.messages;

// methods
export const { addMessage } = messagesSlice.actions;
