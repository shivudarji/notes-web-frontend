import React from "react";
import "../stylecss/About.css";
import { useOutletContext } from "react-router-dom";
const About = () => {
  return (
    <>
      <div className="about">
        <div className="about-hed">
          <h1>About Us</h1>
        </div>

        <div className="about-content">
          <div className="first-content">
            <h1>About Applywize</h1>

            <p>
              Applywize is a cutting-edge EdTech platform that bridges the gap
              between ambitious students and their educational aspirations. We
              simplify the complexities of studying abroad by offering
              personalized guidance, comprehensive resources, and an intuitive
              interface. Applywize provides holistic support to students
              worldwide, helping them navigate the university application
              process, including admissions, visa processes, and cultural
              adaptations. Our platform empowers students with the tools they
              need to confidently pursue their academic ambitions abroad and
              access top universities and programs worldwide. Focused on
              inclusivity and excellence, Applywize serves as a guiding light
              for students, offering tailored support at every step of their
              educational journey and inspiring them to chase their academic
              dreams with assurance and convenience.
            </p>
          </div>
          <div className="second-content">
                    <img
              src="/public/whoweare1-e0f0a1e6.gif"
              className="sec-content-img"
            ></img>
          </div>
        </div>
        <div></div>

        <div className="about-aim">
          <div className="vision">
            <h1>Vision</h1>
            <p>
              Our vision at Applywize is to be the premium global hub for
              educational guidance and support, connecting ambitious students
              worldwide with transformative academic opportunities. As an EdTech
              platform, we envision a world where every aspiring student,
              regardless of background, has easy access to overseas education
              and study abroad opportunities, enabling them to explore and excel
              in their chosen fields. By fostering a welcoming and inclusive
              environment, we aim to have a presence in every corner of the
              world, empowering students with personalized resources to
              confidently embark on their educational odyssey.
            </p>
          </div>

          <div className="mission">
            <h1>Mission</h1>
            <p>
              Our mission is to bridge the gap between students and their dream
              educational institutions, providing personalized guidance and
              comprehensive support throughout the application process. As a
              trusted education consultant and EdTech platform, we are dedicated
              to ensure that students can access top universities and programs
              across the world, tailoring our services to meet their unique
              aspirations and needs. We strive to be a global educational
              beacon, offering expert advice, resources, and support to help
              students achieve academic success and pursue their dreams with
              confidence.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
