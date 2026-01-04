import Mainlayout from "../layout/Mainlayout";
import ProtectedRoute from "./ProtectedRoute";
import About from "../component/About";
import Category from "../component/Category";
import Home from "../component/Home";
import Notes from "../component/Notes";
import Services from "../component/Services";
import User from "../component/User";
import Login from "../login/Login";
import SignUp from "../login/SignUp";
import Profile from "../component/Profile";
const publicRoutes = {
  HOME: { index: true, component: Home },
  USER: { path: "/user", component: User },
  ABOUT: { path: "/about", component: About },
  SERVICES: { path: "/services", component: Services },
  SIGNUP: { path: "/signup", component: SignUp },
  LOGIN: { path: "/login", component: Login },
};

const protectedRoutes = {
  NOTES: { path: "/notes", component: Notes },
  PROFILE: { path: "/profile", component: Profile },
  CATEGORY: { path: "/category", component: Category },
};

// Export statements
export default publicRoutes; // Default export
export { protectedRoutes }; // Named export
