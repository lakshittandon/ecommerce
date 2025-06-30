import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: { isAuth: false, user: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.isAuth = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { setUser, clearUser } = slice.actions;
export default slice.reducer;