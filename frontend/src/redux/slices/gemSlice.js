import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  openFiles: [], // name;'file.js' , icon:'js'
  activeFile: "",
  fileTree: {
    name: "root",
    type: "root",
    isOpened: false,
    children: [
      {
        name: "frontend",
        type: "folder",
        isOpened: false,
        children: [
          {
            name: "src",
            type: "folder",
            isOpened: false,
            children: [
              { name: "App.js", type: "file", children: [], content: "" },
            ],
            content: "",
          },
        ],
        content: "",
      },
      {
        name: "backend",
        type: "folder",
        isOpened: false,
        children: [
          { name: "server.js", type: "file", children: [], content: "" },
        ],
        content: "",
      },
    ],
  },
};

const findFolderAndUpdate = (children, name) => {
  let folderFound;

  const search = (children) => {
    for (let child of children) {
      if (child.name === name) {
        folderFound = child;
        break;
      }

      if (child.children) {
        search(child.children);
      }
    }
  };
  search(children);

  if (folderFound) {
    console.log("folder founded");
  } else {
    console.log("not found");
  }
};

const falseAllFolders = (children) => {
  return children.map((child) => {
    if (child.children) {
      return falseAllFolders(child.children);
    } else {
      if (child.isOpened) child.isOpened = false;
    }
  });
};

const gemSlice = createSlice({
  name: "gems",
  initialState,
  reducers: {
    setIsOpenedProp: (state, action) => {
      const { name, type } = action.payload;
      if (type === "root") {
        if (!state.fileTree.isOpened) {
          state.fileTree.isOpened = true;
        } else if (state.fileTree.isOpened) {
          state.fileTree.isOpened = false;
        }
        // false all with recursive
        falseAllFolders(state.fileTree.children);
      }

      if (type === "folder") {
        findFolderAndUpdate(state.fileTree.children, name);
      }
    },
    addFileOrFolder: (state, action) => {
      const { name, type, path, isOpened } = action.payload;
      let newItem =
        type === "file"
          ? { name, type, children: null, content: "" }
          : { name, type, isOpened, children: [], content: null };
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
  },
});

export default gemSlice.reducer;
export const {
  setIsOpenedProp,
  setOpenFiles,
  closeFile,
  setActiveFile,
  addFileOrFolder,
} = gemSlice.actions;
export const selectOpenFiles = (state) => state.gems.openFiles;
export const selectActiveFile = (state) => state.gems.activeFile;
export const selectFileTree = (state) => state.gems.fileTree;
