import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Box, LoadingOverlay } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/auth/context";
import { alert, setSession } from "../../utils";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


const Login: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
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
      {loading && <LoadingOverlay visible />}
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-start mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                Sign In To <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>Hospital Management</span>
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
                        placeholder="Enter your email address"
                      />
                      <label className="form-label" htmlFor="form3Example3">Email address</label>
                      {form.errors.email && <div className="invalid-feedback">{form.errors.email}</div>}
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4"
                        placeholder="Enter your password"
                        className={`form-control ${form.errors.password ? 'is-invalid' : ''}`}
                        value={form.values.password}
                        onChange={(e) => form.setFieldValue('password', e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example4">Password</label>
                      {form.errors.password && <div className="invalid-feedback">{form.errors.password}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4 justify-content-center" style={{ width: '100%' }}>
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