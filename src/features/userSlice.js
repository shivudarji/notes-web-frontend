import { createSlice } from "@reduxjs/toolkit";
import { secureLocalStorage } from "../localstorageData/localStorageUtils";
import { resetProfile } from "./profileSlice";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    notes: [],
    isAuthenticated: localStorage.getItem("auth") || false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.notes = action.payload;
      state.isAuthenticated = true; // Mark as authenticated
      // state.title=action.payload;
      secureLocalStorage.setItem("user", state.user);
      // secureLocalStorage.setItem('notes',state.notes);
      localStorage.setItem("auth", true);
    },
    logout: (state) => {
      state.user = null;
      state.notes = [];
      state.isAuthenticated = false; // Mark as authenticated
      // console.log('auth',state.user.isAuthenticated);
      secureLocalStorage.removeItem("user");
      secureLocalStorage.removeItem("notes");
      // dispatch(resetProfile());
      localStorage.removeItem("profile");
      secureLocalStorage.removeItem("hobbies");
      // Remove authentication status from localStorage
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
    },
  },
});
export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
