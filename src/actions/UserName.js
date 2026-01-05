import axios from "axios";
import axiosRequest from "../login/axiosRequest";
import { toast, ToastContainer } from "react-toastify";
import APIUrl from "../login/APIUrl";

export const editProfile = async () => {
  try {
    const response = await axiosRequest({
      method: "GET",
      url: `${APIUrl}/profile`,
    });
    return response.data || [];
  } catch (error) {
    toast.error("Failed to load user data");
    return [];
  }
};
export const updateProfileData = async (data) => {
  try {
    const response = await axiosRequest({
      method: "POST",
      url: `${APIUrl}/edit-profile`,
      data,
    });
    return response.data.userId || [];
  } catch (error) {
    toast.error("Failed to load user data");
    return [];
  }
};
export default { editProfile, updateProfileData };
