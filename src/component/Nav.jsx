import React, { useState, useEffect } from "react";
import "../stylecss/Nav.css";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout, login } from "../features/userSlice";
import { toast } from "react-toastify";
import { secureLocalStorage } from "../localstorageData/localStorageUtils";
import { completeLogout } from "../login/Logout";
import publicRoutes, { protectedRoutes } from "../ProtectRoute/CommonRoute";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import notifyLogo from '../assets/noteifyLogo.png'
const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const notes = useSelector((state) => state.notes.notes);
  const token = localStorage.getItem("token");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogin = () => {
    dispatch(login(user, notes));
  };

  const logoutBtn = () => {
    dispatch(completeLogout());
    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
    secureLocalStorage.clear();
    navigate(publicRoutes.LOGIN.path);
  };

  const profile = () => {
    navigate(protectedRoutes.PROFILE.path);
  };

  const handleNewButtonClick = () => {
    navigate(protectedRoutes.NEW_FEATURE.path);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          <img src={notifyLogo} className="logo" alt="Logo" />

          {/* Hamburger menu button */}
          <div className="navbar__toggle" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </div>

         <ul
  className={`navbar_menu 
    ${isMobileMenuOpen ? "active" : ""} 
    ${isAuthenticated && token ? "auth-menu" : ""}
  `}
>   <li className="navbar_item">
              <Link
                to="/"
                className="navbar_links"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="navbar_item">
              <Link
                to={publicRoutes.USER.path}
                className="navbar_links"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Users
              </Link>
            </li>
            <li className="navbar_item">
              <Link
                to={publicRoutes.ABOUT.path}
                className="navbar_links"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>

            {/* {isAuthenticated && token && (
              <li className="navbar_item">
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => {
                    handleNewButtonClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="new-feature-button"
                >
                  New Feature
                </Button>
              </li>
            )} */}

            {isAuthenticated && token ? (
              <>
                <li className="navbar_item">
                  <Link
                    to={protectedRoutes.CATEGORY.path}
                    className="navbar_links"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Category
                  </Link>
                </li>
                <li className="navbar_item">
                  <Link
                    to={protectedRoutes.NOTES.path}
                    className="navbar_links"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Notes
                  </Link>
                </li>
                <li className="navbar_btn">
                  <div className="profile" onClick={toggleDropdown}>
                    <div className="profile-icon">
                      <AccountCircleIcon fontSize="large" />
                    </div>

                    {showDropdown && (
                      <div className="dropdown-menu show text-center me-0">
                        <p className="dropdown-item">
                          {localStorage.getItem("fullname")}
                        </p>

                        <p
                          className="dropdown-item"
                          onClick={() => {
                            profile();
                            setShowDropdown(false);
                          }}
                        >
                          <PersonIcon /> Profile
                        </p>

                        <p
                          className="dropdown-item logout"
                          onClick={() => {
                            logoutBtn();
                            setShowDropdown(false);
                          }}
                        >
                          <LogoutIcon /> Logout
                        </p>
                      </div>
                    )}
                  </div>
                </li>
              </>
            ) : (
              <li className="navbar_btn">
                <Link
                  to={publicRoutes.LOGIN.path}
                  className="button"
                  onClick={() => {
                    handleLogin();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
