import axios from "axios";
import Notes from "../component/Notes";

// Helper function to verify token existence and validity
export const verifyToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  // Optional: Add token expiration check if you store expiration time
  // const expiration = localStorage.getItem("tokenExpiration");
  // if (expiration && Date.now() > parseInt(expiration)) {
  //   throw new Error("Session expired. Please log in again.");
  // }

  return token;
};

// Verify token exists and is valid
const axiosRequest = async ({ method, url, data = null, headers = {} }) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const finalHeaders = { ...defaultHeaders, ...headers };
  const postheaders = { "Content-Type": "application/json" };

  try {
    let response;
    if (method === "GET") {
      response = await axios.get(url, { headers: finalHeaders });
    } else if (method === "POST") {
      response = await axios.post(url, data, { headers: finalHeaders });
    } else if (method === "PUT") {
      response = await axios.put(url, data, { headers: finalHeaders });
    } else if (method === "DELETE") {
      response = await axios.delete(url, { headers: finalHeaders });
    } else {
      throw new Error("Invalid HTTP method");
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
export default axiosRequest;
