import { createSlice } from "@reduxjs/toolkit";

const gemSlice = createSlice({
  name: "gems",
  initialState: {
    openFiles: [
      {
        name: "",
        icon: "js",
      },
    ],
    fileTree: [],
  },
  reducers: {
    setOpenFiles: (state, action) => {
      if (!state.openFiles.includes(action.payload)) {
        state.openFiles.push(action.payload);
      }
    },
    removeFile: (state, action) => {
      state.openFiles = state.openFiles.filter(
        (file) => file.name !== action.payload
      );
    },
  },
});

export default gemSlice.reducer;
export const { setOpenFiles, removeFile } = gemSlice.actions;
export const selectFiles = (state) => state.gems.openFiles;
export const selectUser = (state) => state.user;
