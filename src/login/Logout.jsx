// authActions.js
import { resetProfile } from "../features/profileSlice";
import { secureLocalStorage } from "../localstorageData/localStorageUtils";
import { logout } from "../features/userSlice";
export const completeLogout = () => (dispatch) => {
  // Clear all user-related data from storage
  secureLocalStorage.removeItem("profile");

  // Reset all redux states
  // dispatch(logout());
  dispatch(resetProfile());
};
