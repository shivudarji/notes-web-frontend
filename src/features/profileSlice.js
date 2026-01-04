import { createSlice } from "@reduxjs/toolkit";
import { secureLocalStorage } from "../localstorageData/localStorageUtils";

// Define initial state structure
const initialState = secureLocalStorage.getItem("profile") || {};
// const initialState = {};
// Helper function to update storage
const updateProfileStorage = (profile) => {
  secureLocalStorage.setItem("profile", profile);
  localStorage.setItem(
    "fullname",
    `${profile.firstName} ${profile.lastName}`.trim(),
  );
};

const profileSlice = createSlice({
  name: "profile",
  // Load from storage if available
  initialState: initialState,
  reducers: {
    updateProfile: (state, action) => {
      const updatedProfile = { ...state, ...action.payload };
      updateProfileStorage(updatedProfile);
      const data = secureLocalStorage.getItem("profile");
      return updatedProfile;
    },

    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
      // console.log("State:",action.payload);
      // secureLocalStorage.setItem(field, value);

      updateProfileStorage(state);
    },

    resetProfile: (state) => {
      // secureLocalStorage.removeItem('profile');
      // secureLocalStorage.removeItem('hobbies');

      secureLocalStorage.setItem("profile", state);
      return initialState;
    },
  },
});

export const { updateProfile, updateField, resetProfile } =
  profileSlice.actions;
export default profileSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import { secureLocalStorage } from '../localstorageData/localStorageUtils';

// // Retrieve profile data from secureLocalStorage on initialization
// // const storedProfile =  {}
// const initialState = {};

// const profileSlice = createSlice({
//   name: 'profile',
//   initialState,
//   reducers: {
//     // Update the entire profile
//     updateProfile: (state, action) => {
//       const updatedProfile = { ...state, ...action.payload };
//       secureLocalStorage.setItem('profile', updatedProfile); // Save to secureLocalStorage
//       const pname = secureLocalStorage.getItem('profile');
//       const fullname = pname.firstName + " " + pname.lastName;
//       localStorage.setItem('fullname',fullname);
//       return updatedProfile;
//     },

//     // Update a specific field in the profile
//     updateField: (state, action) => {
//       const { field, value } = action.payload;
//       state[field] = value;
//       secureLocalStorage.setItem('profile', state); // Save to secureLocalStorage
//       const pname = secureLocalStorage.getItem('profile');
//       const fullname = pname.firstName + " " + pname.lastName;
//       localStorage.setItem('fullname',fullname);

//     },

//     // Reset the profile to initial state
//     resetProfile: (state) => {
//       secureLocalStorage.removeItem('profile'); // Save to secureLocalStorage
//       return {};
//     },
//   },
// });

// export const { updateProfile, updateField, resetProfile } = profileSlice.actions;
// export default profileSlice.reducer;
