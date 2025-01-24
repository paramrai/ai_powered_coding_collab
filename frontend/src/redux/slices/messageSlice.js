import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    aiMessages: [
      {
        msg: "Hello",
        sender: "Ai",
      },
    ],
    groupMessages: [
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
    ],
  },
  reducers: {
    addMessage: (state, action) => {
      state.aiMessages.push(action.payload);
    },
    addGroupMessage: (state, action) => {
      state.groupMessages.push(action.payload);
    },
  },
});

export default messagesSlice.reducer;

// selection
export const selectAiMessages = (state) => state.messages.aiMessages;
export const selectGroupMessages = (state) => state.messages.groupMessages;

// methods
export const { addMessage, addGroupMessage } = messagesSlice.actions;
