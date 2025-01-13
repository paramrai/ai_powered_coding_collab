import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: function (state, action) {
      return action.payload;
    },
    clearUser: () => {
      return {};
    },
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.user;
export const { setUser, clearUser } = userSlice.actions;
