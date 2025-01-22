import { createSlice } from "@reduxjs/toolkit";

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

  for (let child in iterable) {
    if (child.type === type && child.name === name) {
      console.log(`${child.name} will be deleted`);
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
      state.openFiles = [...state.openFiles, action.payload];

      const uniqueFiles = [];
      const seenNames = new Set();

      for (let file of state.openFiles) {
        if (!seenNames.has(file.name)) {
          seenNames.add(file.name);
          uniqueFiles.push(file);
        }
      }

      state.openFiles = uniqueFiles;
    },
    closeFile: (state, action) => {
      let closingFile = action.payload;

      state.openFiles = state.openFiles.filter(
        (file) => file.name !== closingFile
      );
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
    },
    deleteFile: (state, action) => {
      const { type, name } = action.payload;
      const path = state.path;
      findPathAndDelete(state.gem.fileTree, type, name, path);
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
