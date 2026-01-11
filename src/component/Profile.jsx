import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { secureLocalStorage } from "../localstorageData/localStorageUtils";
import { updateProfileData } from "../../src/actions/UserName";

import { editProfile } from "../../src/actions/UserName";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { updateProfile } from "../features/profileSlice";

const Profile = () => {
  const [imagePreview, setImagePreview] = useState("");
  const profile = useSelector((state) => state.profile);
  const [existingDetail, setExistingDetail] = useState("");

  // Validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().nullable(),
    mobile: Yup.string().required("Mobile is required"),
    gender: Yup.string().required("Gender is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    hobbies: Yup.array().min(1, "Select at least one hobby"),
    dob: Yup.date().nullable().required("Date of Birth is required"),
    event_time: Yup.date().nullable().required("Event Time is required"),
  });

  // React Hook Form
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
         resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      hobbies: [],
      gender: "",
      country: "",
      state: "",
      image: "",
      dob: null, // Add date field
      event_time: null,
    },
  });

const onSubmit = async (data) => {
  const payload = {
    ...data,
    dob: data.dob ? data.dob.toISOString().split("T")[0] : null,
    event_time: data.event_time
      ? data.event_time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
      : null,
  };

  // 🔹 Store fullName in localStorage again after submit
  const fullname = `${data.firstName} ${data.lastName}`.trim();
  localStorage.setItem("fullname", fullname);

  secureLocalStorage.setItem("profile", payload);

  const response = await updateProfileData(payload); // API call
  if (response) {
    toast.success("Profile updated successfully");
  }
};


  // Load profile data from API
  useEffect(() => {
    loadProfile();
  }, []);

 
  const loadProfile = useCallback(async () => {
    const data = await editProfile();
    setExistingDetail(data);
    if(data)
    {
    
   const fullname = `${data.firstName || ""} ${data.lastName || ""}`.trim();
  localStorage.setItem("fullname", fullname);
 
    console.warn("edit data", data);
    setValue("email", data.user.email);
    setValue("firstName", data.firstName);
    setValue("lastName", data.lastName);
    if (data?.hobbies) {
      const hobbiesData = data.hobbies.map((item) => item);
      setValue("hobbies", hobbiesData);
    }
    if (data?.mobile) {
      setValue("mobile", data.mobile);
    }

    setValue("gender", data.gender);

    setValue("country", data.country);

    setValue("state", data.state);
    if (data?.dob) {
      const dob = new Date(data.dob);
      setValue("dob", isNaN(dob) ? null : dob);
    }

    if (data?.event_time) {
      const timeDate = new Date(`1970-01-01T${data.event_time}:00`);
      setValue("event_time", timeDate);
    }

    }

    // Object.keys(data).forEach((key) => setValue(key, data[key]));
  }, [existingDetail]);

  const hobbies = ["reading", "traveling", "sports", "cooking"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const selectedHobbies = watch("hobbies") || [];

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" {...register("firstName")} />
            {errors.firstName && (
              <small className="text-danger">{errors.firstName.message}</small>
            )}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" {...register("lastName")} />
            {errors.lastName && (
              <small className="text-danger">{errors.lastName.message}</small>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" {...register("email")} disabled />
        {errors.email && (
          <small className="text-danger">{errors.email.message}</small>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mobile</Form.Label>
        <Form.Control type="text" {...register("mobile")} />
        {errors.mobile && (
          <small className="text-danger">{errors.mobile.message}</small>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Gender</Form.Label>
        {["Male", "Female"].map((g) => (
          <Form.Check
            inline
            key={g}
            label={g}
            type="radio"
            value={g}
            {...register("gender")}
          />
        ))}
        {errors.gender && (
          <small className="text-danger">{errors.gender.message}</small>
        )}
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Select {...register("country")}>
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </Form.Select>
            {errors.country && (
              <small className="text-danger">{errors.country.message}</small>
            )}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Select {...register("state")}>
              <option value="">Select State</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
            </Form.Select>
            {errors.state && (
              <small className="text-danger">{errors.state.message}</small>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Hobbies</Form.Label>
        {hobbies.map((hobby) => (
          <Form.Check
            key={hobby}
            label={hobby}
            type="checkbox"
            value={hobby}
            checked={(selectedHobbies || []).includes(hobby)}
            onChange={(e) => {
              const { checked, value } = e.target;
              setValue(
                "hobbies",
                checked
                  ? [...selectedHobbies, value]
                  : selectedHobbies.filter((h) => h !== value),
              );
            }}
          />
        ))}
        {errors.hobbies && (
          <small className="text-danger">{errors.hobbies.message}</small>
        )}
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Controller
              control={control}
              name="dob"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  className="form-control"
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                />
              )}
            />
            {errors.dob && (
              <small className="text-danger">{errors.dob.message}</small>
            )}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Event Time</Form.Label>
            <Controller
              control={control}
              name="event_time"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select time"
                  className="form-control"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="h:mm aa"
                />
              )}
            />
            {errors.event_time && (
              <small className="text-danger">{errors.event_time.message}</small>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Profile Image</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="preview" width={100} />}
      </Form.Group>

      <Button type="submit">Update Profile</Button>
    </Form>
  );
};

export default Profile;
