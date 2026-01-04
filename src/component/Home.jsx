import React from "react";
import "../stylecss/Home.css";
// import rightImg from '../assets/rightImg'
const Home = () => {
  return (
    <>
      <div className="main">
        <div className="main_container">
          <div className="header">Notes Header</div>
          <div className="content">
            APPLYWIZE simplifies higher education admissions for students
            aspiring to study abroad. Our online platform serves as a
            centralized application portal, enabling easy applications to
            multiple universities. We offer comprehensive admission services,
            including personalized guidance and document assistance, to
            streamline the process. With APPLYWIZE, students can confidently
            pursue their academic ambitions worldwide.
          </div>
        </div>
        <div className="Threebox">
          <div className="box box1">
            <h1>Single-Point Application Handling</h1>
            <p>
              Receive guidance in selecting universities aligned with your
              academic and career aspirations.
            </p>
            <div className="boxinner">
              <span className="read">READ MORE → </span>
              <span className="num">01</span>
            </div>
          </div>
          <div className="box box2">
            <h1>University Selection Assistance</h1>
            <p>
              Monitor the status of your applications in real-time, ensuring
              transparency and peace of mind.
            </p>
            <div className="boxinner">
              <span className="read">READ MORE → </span>
              <span className="num">02</span>
            </div>
          </div>
          <div className="box box3">
            <h1>Pre-Departure Preparation</h1>
            <p>
              Access resources and information to prepare for your study abroad
              journey seamlessly.
            </p>
            <div className="boxinner">
              <span className="read">READ MORE → </span>
              <span className="num">03</span>
            </div>
          </div>
          <div className="box box4">
            <h1>Post Arrival Support</h1>
            <p>
              Enjoy ongoing assistance and support, even post-admission, to
              address any queries or concerns.
            </p>
            <div className="boxinner">
              <span className="read">READ MORE → </span>
              <span className="num">04</span>
            </div>
          </div>
          <div className="box box5">
            <h1>University Selection Assistance</h1>
            <p>
              Receive guidance in selecting universities aligned with your
              academic and career aspirations.
            </p>
            <div className="boxinner">
              <span className="read">READ MORE → </span>
              <span className="num">05</span>
            </div>
          </div>
          <div className="box box6">
            <h1>Post Arrival Support</h1>
            <p>
              Access resources and information to prepare for your study abroad
              journey seamlessly.
            </p>
            <div className="boxinner">
              <span className="read">READ MORE → </span>
              <span className="num">06</span>
            </div>
          </div>
          <div className="box box7">
            <h1>Post Arrival Support</h1>
            <p>
              Enjoy ongoing assistance and support, even post-admission, to
              address any queries or concerns.
            </p>
            <div className="boxinner">
              <span className="read">READ MORE → </span>
              <span className="num">07</span>
            </div>
          </div>
        </div>
      </div>

      <div id="second-content">
        <h1 className="sec-hed">
          <span>Who w</span>e are?
        </h1>
        <div className="second-right">
          <p className="sec-par">
            Welcome to APPLYWIZE, your premier destination for comprehensive
            higher education admission services. At APPLYWIZE, we understand the
            complexities and challenges students face when planning to study
            abroad. Our mission is to simplify the application process and
            empower students to pursue their dreams of studying overseas.
            <br></br>
            With our innovative online platform, APPLYWIZE serves as your single
            point application handling portal. Gone are the days of tedious and
            time-consuming applications to multiple universities. Our
            streamlined system allows you to apply to multiple universities with
            just a few clicks, saving you valuable time and effort.<br></br>
            But our services don't stop there. APPLYWIZE offers a range of
            admission-related services, including personalized guidance,
            document assistance, and expert advice to ensure your application
            stands out among the rest. Whether you're exploring undergraduate,
            graduate, or postgraduate opportunities, our team is dedicated to
            helping you navigate the complexities of the admission process.
            <br></br>
            At APPLYWIZE, we believe that education knows no boundaries. Let us
            be your partner in your journey to academic excellence. Join us
            today and unlock a world of possibilities.
          </p>
          {/* <img src={rightImg}></img> */}
        </div>
      </div>

      {/* <div id="third-content">
        <div className="sideheader">
        <h1 className="th-hed"><span>What</span>  we do?</h1>
        </div> */}

      {/* <div className="third-content">
            <div className="first">
                <h1>Single-point application portal</h1>
                <p>Apply to multiple universities with ease<br></br> through our streamlined platform.                </p>
            </div>
            <div className="second">
                <h1>Document assistance</h1>
                <p>Get help with gathering and organizing required application documents.   </p>
            </div>
             <div className="third">
                <h1>Personalized guidance</h1>
                <p>Receive tailored advice and support throughout the application process.</p>
             </div>
             <div className="fourth">
                <h1>Expert advice</h1>
                <p>Benefit from the expertise of our team to ensure your application stands out.</p>
             </div>
        </div> */}

      {/* </div> */}
    </>
  );
};

export default Home;
