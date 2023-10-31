import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Box } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useId } from "@mantine/hooks";
import { format } from "date-fns";
import { alert } from "../../utils";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

interface RegisterProps { }

const Register: React.FunctionComponent<RegisterProps> = () => {
  const id = useId();
  const [gender, setGender] = useState<string | null>("");
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      fullName: "",
      password: "",
      email: "",
      dateOfBirth: "",
      phoneNumber: "",
    },
    validate: {
      fullName: (value) =>
        value.length < 2
          ? "Name must be at least 2 characters long and not blank"
          : null,
      password: (value) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(value)) {
          return "Password must have at least 8 characters, one uppercase letter, one lowercase letter, and one number";
        }
        return null;
      },
      email: (value) => {
        return /^\S+@\S+$/.test(value) ? null : "Invalid email";
      },
      dateOfBirth: (value) => {
        const parsedDate = new Date(value);
        if (isNaN(parsedDate.getTime())) {
          return "Invalid date";
        }
        return null;
      },
      phoneNumber: (value) => {
        return /^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(value) ? null : 'Invalid phone number format'
      },
    },
  });

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (form.isValid() && gender !== null) {
      setLoading(true);
      const formattedDateOfBirth = format(
        new Date(form.values.dateOfBirth),
        "dd.MM.yyyy"
      );

      const userData = {
        email: form.values.email,
        password: form.values.password,
        fullName: form.values.fullName,
        dateOfBirth: formattedDateOfBirth,
        phoneNumber: form.values.phoneNumber,
        gender: gender,
      };

      axios.post("http://164.92.206.217:8082/user/auth/sign-up", userData)
        .then((response) => {
          console.log("User signed up successfully:", response.data);
          navigate("auth/login");
        })
        .catch((error) => {
          if (error.response) {
            alert.error("❌" + error.response.data.message);
          }
          else if (error.request) {
            alert.error("Network error");
          }
          else {
            alert.error("❌" + error.response.data.message);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Box>
      <section className="background-radial-gradient overflow-hidden">
        <style>
          {`.background-radial-gradient {
                background-color: hsl(218, 41%, 15%);
                background-image: radial-gradient(650px circle at 0% 0%,
                    hsl(218, 41%, 35%) 15%,
                    hsl(218, 41%, 30%) 35%,
                    hsl(218, 41%, 20%) 75%,
                    hsl(218, 41%, 19%) 80%,
                    transparent 100%);
                height: 100vh;
              }

              #radius-shape-1 {
                height: 220px;
                width: 220px;
                top: -60px;
                left: -130px;
                background: radial-gradient(#44006b, #ad1fff);
                overflow: hidden;
              }

              #radius-shape-2 {
                border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
                bottom: -60px;
                right: -110px;
                width: 300px;
                height: 300px;
                background: radial-gradient(#44006b, #ad1fff);
                overflow: hidden;
              }

              .bg-glass {
                background-color: hsla(0, 0%, 100%, 0.9) !important;
                backdrop-filter: saturate(200%) blur(25px);
              }
            `}
        </style>

        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-start mb-10">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                Sign Up To <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>Hospital Menegemant</span>
              </h1>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            id="form3Example1"
                            className={`form-control`}
                            {...form.getInputProps("fullName")}
                            placeholder="Full Name"
                          />
                          <label className="form-label" htmlFor="form3Example1">Full Name</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="date"
                            id="form3Example2"
                            className={`form-control`}
                            {...form.getInputProps("dateOfBirth")}
                            placeholder="Date of Birth"
                          />
                          <label className="form-label" htmlFor="form3Example2">Date of Birth</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        className={`form-control`}
                        {...form.getInputProps("email")}
                        placeholder="Email Address"
                      />
                      <label className="form-label" htmlFor="form3Example3">Email address</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        className={`form-control`}
                        {...form.getInputProps("password")}
                        placeholder="Password"
                      />
                      <label className="form-label" htmlFor="form3Example4">Password</label>
                    </div>

                    <div className="form-outline" style={{ marginTop: 20 }}>
                      <input
                        type="tel"
                        id="form3Example2"
                        className={`form-control`}
                        {...form.getInputProps("phoneNumber")}
                        placeholder="Phone Number"
                      />
                      <label className="form-label" htmlFor="form3Example2">Phone Number</label>
                    </div>

                    <div className="gender">
                      <span>Gender:</span>
                      <label>
                        <small>MALE</small>
                        <input
                          type="radio"
                          name="gender"
                          value="MALE"
                          onChange={() => setGender("MALE")}
                        />
                      </label>
                      <label>
                        <small>FEMALE</small>
                        <input
                          name="gender"
                          value="FEMALE"
                          type="radio"
                          onChange={() => setGender("FEMALE")}
                        />
                      </label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4 justify-content-center" style={{ width: 497, marginTop: 20 }}>
                      Sign Up
                    </button>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><Link to='/auth/login'>Do you have an Account? </Link></span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Box>
  );
};

export default Register;