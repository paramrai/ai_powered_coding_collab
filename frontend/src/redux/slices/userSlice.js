import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    token: "",
    homeActiveTab: "explore", // explore,me,collection
  },
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      return {
        ...state,
        user,
        token,
      };
    },
    clearUser: (state) => {
      return {
        ...state,
        user: {},
        token: "",
      };
    },
    setHomeActiveTab: (state, action) => {
      state.homeActiveTab = action.payload;
    },
    setUserCollection: (state, action) => {
      const isAlreadyThere = state.user.collection.some(
        (gem) => gem._id === action.payload._id
      );

      if (isAlreadyThere) {
        state.user.collection = state.user.collection.filter(
          (gem) => gem._id !== action.payload._id
        );
      } else {
        state.user.collection = [...state.user.collection, action.payload];
      }
    },
    updateUserObject: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectHomeActiveTab = (state) => state.user.homeActiveTab;

export const {
  setUser,
  clearUser,
  setHomeActiveTab,
  setUserCollection,
  updateUserObject,
} = userSlice.actions;
