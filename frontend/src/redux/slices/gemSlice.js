import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../configs/axiosInstance";
import { toast } from "react-toastify";

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
        toast.error(`A ${type} with the name "${name}" already exists.`);
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
      state.path = action.payload.name;
    },
    setOpenFiles: (state, action) => {
      const { name, path } = action.payload;
      state.openFiles.push({ name, path });

      const uniqueFiles = Array.from(
        new Set(state.openFiles.map((file) => JSON.stringify(file)))
      ).map((file) => JSON.parse(file));

      state.openFiles = uniqueFiles;
    },
    closeFile: (state, action) => {
      const closingFile = action.payload;

      if (state.openFiles.some((item) => item.name === closingFile)) {
        state.openFiles = state.openFiles.filter(
          (file) => file.name !== closingFile
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
      console.log(type, name);
      const path = state.path;
      findPathAndAdd(state.gem.fileTree, type, name, path);
      const updatedGem = state.gem;
      axiosInstance.put(`/gems/updateGem/${state.gem._id}`, updatedGem);
    },
    deleteFile: (state, action) => {
      const { type, name } = action.payload;
      const path = state.path;

      findPathAndDelete(state.gem.fileTree, type, name, path);

      // if active file deleting
      if (state.activeFile === name) {
        state.activeFile = state.openFiles[0]?.name || "";
      }

      // remove also from open files
      if (state.openFiles.some((item) => item.name === name)) {
        state.openFiles = state.openFiles.filter((file) => file.name !== name);
      }

      if (state.openFiles.length === 0) {
        state.activeFile = "";
      }

      const updatedGem = state.gem;
      axiosInstance.put(`/gems/updateGem/${state.gem._id}`, updatedGem);
    },
    setExploreGem: (state, action) => {
      const uniqueObjects = Array.from(
        new Set(action.payload.map((item) => JSON.stringify(item)))
      ).map((item) => JSON.parse(item));

      state.exploreGems = uniqueObjects;
    },
    updateStatus: (state, action) => {
      const user = action.payload;

      const targetUser = state.gem.collaborator.find(
        (collabUser) => String(collabUser._id) === String(user._id)
      );

      if (targetUser) {
        targetUser.isActive = user.isActive;
      }
    },

    saveFileContent: (state, action) => {
      const { name, path, content } = action.payload;

      console.log(name, path, content);

      function findFileAndUpdate(iterable, name, path) {
        if (!Array.isArray(iterable)) {
          console.error("iterable is not an array");
          return false;
        }

        for (let child of iterable) {
          if (child.name === name) {
            if (child.type === "file") {
              child.content = content;
              return true; // Return true if file was found and updated
            }
          }

          if (child.children) {
            const found = findFileAndUpdate(child.children, name, path);
            if (found) return true;
          }
        }
        return false;
      }

      // Update file content in file tree
      const updated = findFileAndUpdate(state.gem.fileTree, name, path);

      if (updated) {
        // Update backend
        const updatedGem = { ...state.gem };
        axiosInstance
          .put(`/gems/updateGem/${state.gem._id}`, updatedGem)
          .catch((error) => console.error("Error updating gem:", error));

        // Update state
        state.gem = updatedGem;
      }
    },
    exitTheGem: (state, action) => {
      state.gem = {};
      state.activeFile = "";
      state.openFiles = [];
      state.path = "";
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
  updateStatus,
  saveFileContent,
  exitTheGem,
} = gemSlice.actions;
