import React, { FunctionComponent } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { Auth, DoctorPage, HomePage, Page404, Settings, SingleBooking, SingleSpetialization, UserPanel } from "../pages";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../modules/auth/context";
import { SingleHospital } from "../pages/hospital";
import { EmailProvider } from "../modules/home/context";
import Protected from "./protected";

const AppRoutes: FunctionComponent = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <EmailProvider>
        <ToastContainer position="top-right" autoClose={5000} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="userPanel" element={<Protected allow={user} navigate="/auth/login" />}>
            <Route index element={<UserPanel />} />
            <Route path="settings" element={<Protected allow={user} navigate="/auth/login" />}>
              <Route index element={<Settings.MainSettings />} />
              <Route path="my-profile" element={<Settings.MyProfile />} />
              <Route path="change-password" element={<Settings.ChangePassword />} />
              <Route path="send-verification" element={<Settings.SendVerification />} />
              <Route path="change-email" element={<Settings.ChangeEmail />} />
            </Route>
            <Route path="single-hospital/:hospitalId" element={<SingleHospital hospitalId="" />} />
            <Route path="doctor/:doctorId" element={<DoctorPage />} />
            <Route path="booking/:bookingId" element={<SingleBooking bookingId="" />} />
            <Route path="single-spetialization/:spetializationId" element={<SingleSpetialization spetializationId="" />} />
          </Route>

          <Route path="auth" element={<Protected allow={!user} navigate="/userPanel" />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<Auth.Login />} />
            <Route path="register" element={<Auth.Register />} />
            <Route path="forgot-password" element={<Protected allow={!user} navigate="/userPanel" />}>
              <Route index element={<Navigate to="email" />} />
              <Route path="email" element={<Auth.ForgotPassword.ForgotPassword />} />
              <Route path="verify" element={<Auth.ForgotPassword.ForgotPasswordVerification />} />
              <Route path="code" element={<Auth.ForgotPassword.ForgotPasswordCode />} />
            </Route>
            <Route path="verification" element={<Auth.Verification />} />
            <Route path="*" index element={<Navigate to="login" />} />
          </Route>

          <Route path="*" element={<Page404 />} />
        </Routes>
      </EmailProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;