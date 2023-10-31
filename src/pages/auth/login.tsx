import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Box } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/auth/context";
import { alert, setSession } from "../../utils";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: { password: "", email: "", subscribe: false },
    validate: {
      password: (value) =>
        value.length < 5 ? "Password must have at least 5 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSignIn = () => {
    if (form.isValid()) {
      setLoading(true);
      axios
        .post("http://164.92.206.217:8082/user/auth/sign-in", {
          email: form.values.email,
          password: form.values.password,
        })
        .then((response) => {
          login(response.data.data.accessToken);
          setSession(response.data.data.accessToken);
          navigate("/userPanel");
          setLoading(false);
        })
        .catch((error: any) => {
          alert.error("❌" + error.response.data.message);
          setLoading(false);
        });
    }
    else {
      alert.error("Password must have at least 5 letters or Invalid email");
      setLoading(false);
    }
  };

  return (
    <Box>
      <section className="background-radial-gradient overflow-hidden">
        <style>
          {`
            .background-radial-gradient {
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
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                Sign In To <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>Hospital Menegemant</span>
              </h1>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        className={`form-control ${form.errors.email ? 'is-invalid' : ''}`}
                        value={form.values.email}
                        onChange={(e) => form.setFieldValue('email', e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example3">Email address</label>
                      {form.errors.email && <div className="invalid-feedback">{form.errors.email}</div>}
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        className={`form-control ${form.errors.password ? 'is-invalid' : ''}`}
                        value={form.values.password}
                        onChange={(e) => form.setFieldValue('password', e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example4">Password</label>
                      {form.errors.password && <div className="invalid-feedback">{form.errors.password}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4 justify-content-center" style={{ width: 497 }}>
                      Sign In
                    </button>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><Link to='/auth/forgot-password'>Forgot the Passowrd ?</Link></span>
                      <span><Link to='/auth/register'>Don`t you have an Account? </Link></span>
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

export default Login;