import React, { useState } from "react";
import { Form, Link } from "react-router-dom";
import "./style.css";
import APIUrl from "./APIUrl";
import { LoginSchema } from "./ValidationScema.jsx";
import { useFormik } from "formik";
// import './ValidationScema.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";
import axiosRequest, { verifyToken } from "./axiosRequest";
import { ToastContainer, toast } from "react-toastify";
import editProfile from "../actions/UserName";

const initialValues = {
  email: "",
  password: "",
  deviceId: "9a00cac3-78ab-4207-ac32-2e376b7ef06c",
  browserName: "Google Chrome",
};

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation

  const dispatch = useDispatch();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginSchema,
      onSubmit: async (values, action) => {
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        // Validate user input against stored credentials
        // if (values.email === storedEmail && values.password === storedPassword) {

        const loginUrl = `${APIUrl}/login`;

        dispatch(login({ values }));

        try {
          console.warn("login try");
          const response = await axiosRequest({
            method: "POST",
            url: loginUrl,
            data: values,
          });

          toast.success("Login Successfully", {
            position: "top-center",
            autoClose: 1000,
          });

          localStorage.setItem("token", response.token);
          const userData = response.data.user;
          const fullname = `${userData.firstName} ${userData.lastName}`.trim();
          localStorage.setItem("fullname", fullname);
          console.warn("login try", userData);

          // const user = await editProfile();
          // localStorage.setItem('fullname', `${user.firstName} ${user.lastName}`.trim());
          // verifyToken();
          navigate("/notes");
        } catch (error) {
          if (error.response) {
            toast.warning(`Server Responded ${error.response.message}`, {
              autoClose: 1000,
            });
          } else if (error.request) {
            toast.warning(`No response received ${error.request.message}`, {
              autoClose: 1000,
            });
          } else {
            toast.error(`Error setting up request ${error.message}`, {
              autoClose: 1000,
            });
          }
        }
      },
    });
  return (
    <form onSubmit={handleSubmit} id="form">
      <div>
        <div className="login">
          <div className="login-content">
            <div className="login-hed">
              <h1>Hi, Welcome</h1>
              <p>Enter your credentials to continue</p>
            </div>

            <div className="input-control">
              <label htmlFor="email">Email Id</label>
              <input
                type="text"
                name="email"
                onBlur={handleBlur}
                value={values.email}
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
              <input
                type="passsword"
                name="password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                placeholder="Enter Password"
              ></input>
              {errors.password && touched.password ? (
                <p className="form-error">{errors.password}</p>
              ) : null}
              <br></br>
            </div>
            {/* <label>DeviceId</label>
        <input type='hidden' name='deviceid' onChange={(e)=>setDeviceId(e.target.value)} placeholder='Enter DeviceId'></input><br></br>

        <label>BrowserName</label>
        <input type='hidden' name='browsername' onChange={(e)=>setBrowserName(e.target.value)} placeholder='Enter Browser Name'></input><br></br> */}

            <button className="loginBtn" type="submit">
              Login
            </button>
            <Link to="/signup" className="account-create">
              Create your account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
