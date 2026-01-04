import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import profileReducer from "../features/profileSlice";
import notesReducer from "../features/notesSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer, // Add profile slice
    notes: notesReducer,
  },
});
