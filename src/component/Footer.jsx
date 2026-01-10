import React from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "../stylecss/Footer.css";
import notifyLogo from '../assets/noteifyLogo.png'
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-content">
          <div className="first-col">
            <h1 className="logo">
                <img src={notifyLogo} className="logo" alt="Logo"/>
            
                   </h1>
            <p>Privacy Policy</p>
            <br></br>
            <p>Terms & Conditions</p>
            <br></br>
            <p>Modern Slavery</p>
            <br></br>

            <h1>Follow Us</h1>
            <div className="icon">
              <FacebookRoundedIcon></FacebookRoundedIcon>
              <InstagramIcon></InstagramIcon>
              <LinkedInIcon></LinkedInIcon>
              <YouTubeIcon></YouTubeIcon>
            </div>
          </div>

          <div className="second-col">
            <h2>Universities</h2>
            <br></br>

            <div className="country1">
              <h5>Australia</h5>
              <h5>UK</h5>
            </div>

            <div className="country2">
              <h5>Canada</h5>
              <h5>USA</h5>--
            </div>

            <h5>Ireland</h5>
            <h5>New Zealand</h5>
          </div>

          <div className="third-col">
            <h2>Study In</h2>
            <br></br>
            <div className="studyIn">
              <div className="studyIn1">
                <h5>Study In Australia</h5>
                <h5>Study In Canada</h5>
                <h5>Study In Germany</h5>
                <h5>Study In Ireland</h5>
              </div>

              <div className="studyIn2">
                <h5>Study In New Zealand</h5>
                <h5>Study In UAE</h5>
                <h5>Study In UK</h5>
                <h5>Study In USA</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p>© 2023 Applywize. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
