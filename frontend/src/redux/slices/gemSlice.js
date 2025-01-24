import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../configs/axiosInstance";

let initialState = {
  gem: {},
  path: "",
  activeFile: "",
  openFiles: [],
  exploreGems: [],
};

function findPathAndAdd(iterable, type, name, path) {
  if (!Array.isArray(iterable)) {
    console.error("iterable is not an array");
    return;
  }

  for (let child of iterable) {
    if (child.name === path) {
      if (child.children.some((c) => c.name === name)) {
        console.error(`A ${type} with the name "${name}" already exists.`);
        return;
      }

      child.children.push({
        name,
        type,
        children: type === "folder" ? [] : undefined,
        content: type === "file" ? "" : undefined,
      });
      return;
    }

    if (child.children) {
      findPathAndAdd(child.children, type, name, path);
    }
  }
}

function findPathAndDelete(iterable, type, name, path) {
  if (!Array.isArray(iterable)) {
    console.error("iterable is not an array");
    return;
  }

  for (let [index, child] of iterable.entries()) {
    if (child.type === type && child.name === name) {
      console.log(`${child.name} will be deleted`);
      iterable.splice(index, 1);
    }

    if (child.children) {
      findPathAndDelete(child.children, type, name, path);
    }
  }
}

const gemSlice = createSlice({
  name: "gems",
  initialState,
  reducers: {
    setGem: (state, action) => {
      state.gem = action.payload;
    },

    setOpenFiles: (state, action) => {
      state.openFiles = [...new Set([...state.openFiles, action.payload])];
    },
    closeFile: (state, action) => {
      const closingFile = action.payload;

      if (state.openFiles.includes(closingFile)) {
        state.openFiles = state.openFiles.filter(
          (file) => file !== closingFile
        );
      }
    },
    setActiveFile: (state, action) => {
      state.activeFile = action.payload;
    },
    setCurrentPath: (state, action) => {
      const folderName = action.payload;
      state.path = folderName;
    },
    addNewFile: (state, action) => {
      const { type, name } = action.payload;
      const path = state.path;
      findPathAndAdd(state.gem.fileTree, type, name, path);
      const updatedGem = state.gem;
      axiosInstance.put(`/gems/updateGem/${state.gem._id}`, updatedGem);
    },
    deleteFile: (state, action) => {
      const { type, name } = action.payload;
      const path = state.path;

      findPathAndDelete(state.gem.fileTree, type, name, path);

      const updatedGem = state.gem;
      axiosInstance.put(`/gems/updateGem/${state.gem._id}`, updatedGem);

      if (state.activeFile === name) {
        state.activeFile = state.openFiles[0]?.name || "";
      }
    },
    setExploreGem: (state, action) => {
      state.exploreGems = action.payload;
    },
  },
});

export default gemSlice.reducer;

// selection
export const selectPath = (state) => state.gems.path;
export const selectOpenFiles = (state) => state.gems.openFiles;
export const selectActiveFile = (state) => state.gems.activeFile;
export const selectExploreGems = (state) => state.gems.exploreGems;
export const selectFileTree = (state) => state.gems.gem.fileTree;
export const selectCurrentGem = (state) => state.gems.gem;

// methods
export const {
  setGem,
  setOpenFiles,
  closeFile,
  setActiveFile,
  setCurrentPath,
  addNewFile,
  deleteFile,
  setExploreGem,
} = gemSlice.actions;
