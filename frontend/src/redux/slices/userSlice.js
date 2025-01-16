import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.data = {};
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
export const selectUser = (state) => state.user.data.user;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;
export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
