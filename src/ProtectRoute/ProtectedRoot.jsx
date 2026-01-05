import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import Notes from "../component/Notes";
import Profile from "../component/Profile";
import Category from "../component/Category";
const ProtectedRoot = () => {
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated); // Check if the user is authenticated

  return (
    <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
           <Route path="/notes" element={<Notes />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/category" element={<Category />} />
    </Route>
  );
};

export default ProtectedRoot;
