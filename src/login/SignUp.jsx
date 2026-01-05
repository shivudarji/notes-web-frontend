import React, { useEffect, useState } from "react";
import { Form, Link } from "react-router";
import "./style.css";
import axios from "axios";
import { SignUpSchema } from "./validationScema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import APIUrl from "./APIUrl";
import axiosRequest from "./axiosRequest";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../features/profileSlice";
import { secureLocalStorage } from "../localstorageData/localStorageUtils";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  cpswd: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const [isVisible, setIsVisible] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUpSchema,
      onSubmit: async (values, action) => {
        // const storedEmail = localStorage.getItem("userEmail");
        // const storedPassword = localStorage.getItem("userPassword");

        // Validate user input against stored credentials
        //  if (values.email !== storedEmail && values.password !== storedPassword) {
        // localStorage.setItem("username", `${values.firstName} ${values.lastName}`);

        secureLocalStorage.setItem("signup", values);

        const signupUrl = `${APIUrl}/signup`;

        // const { cpswd:cpswd1,password, ...formValues2 } = values;

        const { cpswd, ...formValues } = values;

        const { password, ...formValues2 } = formValues;

        dispatch(updateProfile(formValues2));

        try {
          const response = await axiosRequest({
            method: "POST",
            url: signupUrl,
            data: values,
          });

          toast.success("Signup Successfully", {
            position: "top-center",
            autoClose: 1000,
          });

          navigate("/login");
        } catch (error) {
          if (error.response) {
            // console.error('Server responded:', error.response.status, error.response.data);
            toast.warning(`Server Responded : ${error.response.data.message}`, {
              autoClose: 2000,
            });
          } else if (error.request) {
            // console.error('No response received:', error.request);
            toast.warning(`No response received : ${error.request.message}`, {
              autoClose: 2000,
            });
          } else {
            // console.error('Error setting up request:', error.message);
            toast.error(`Error setting up request : ${error.message}`, {
              autoClose: 5000,
            });
          }
        }
        // action.resetForm();
      },
    });

  useEffect(() => {
    secureLocalStorage.getItem("signup");
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="signup">
        <div className="signup-content">
          <div className="input-control">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
            ></input>
            {errors.firstName && touched.firstName ? (
              <p className="form-error">{errors.firstName}</p>
            ) : null}
            <br></br>
          </div>

          <div className="input-control">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
            ></input>
            {errors.lastName && touched.lastName ? (
              <p className="form-error">{errors.lastName}</p>
            ) : null}
            <br></br>
          </div>

          <div className="input-control">
            <label htmlFor="email">Email Id</label>
            <input
              type="text"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter Email Id"
            ></input>
            {errors.email && touched.email ? (
              <p className="form-error">{errors.email}</p>
            ) : null}
            <br></br>
          </div>

          <div className="input-control">
            <label htmlFor="password">Password</label>
            <div className="input-eyeicon">
              <input
                type={isVisible ? "text" : "password"}
                name="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter Password"
              ></input>
              <span onClick={toggleVisibility} className="eye-icon">
                {!isVisible ? <PiEyeLight /> : <PiEyeSlash />}{" "}
                {/* Eye icon (emoji) */}
              </span>
            </div>
            {errors.password && touched.password ? (
              <p className="form-error">{errors.password}</p>
            ) : null}
            <br></br>
          </div>

          <div className="input-control">
            <label htmlFor="cpswd">Confirm Password</label>
            <div className="input-eyeicon">
              <input
                type={isVisible ? "text" : "password"}
                name="cpswd"
                value={values.cpswd}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Enter Confirm Password"
              ></input>
              <span onClick={toggleVisibility} className="eye-icon">
                {!isVisible ? <PiEyeLight /> : <PiEyeSlash />}{" "}
                {/* Eye icon (emoji) */}
              </span>
            </div>
            {errors.cpswd && touched.cpswd ? (
              <p className="form-error">{errors.cpswd}</p>
            ) : null}
            <br></br>
          </div>

          <button className="signupBtn" type="submit">
            Sign Up
            {/* <Link to="/login" style={{color:'white',textDecoration:'none'}}>Sign UP</Link>  */}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
