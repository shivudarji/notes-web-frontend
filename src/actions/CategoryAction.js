import axios from "axios";
import axiosRequest from "../login/axiosRequest";
import { toast, ToastContainer } from "react-toastify";
import APIUrl from "../login/APIUrl";

export const getCategoryData = async () => {
  try {
    const response = await axiosRequest({
      method: "GET",
      url: `${APIUrl}/get-category`,
    });
    console.warn("response", response);
    return response.data || [];
  } catch (error) {
    toast.error("Failed to load categories");
    return [];
  }
};
export default getCategoryData;
