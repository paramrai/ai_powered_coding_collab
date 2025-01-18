import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    token: "",
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
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const { setUser, clearUser } = userSlice.actions;
