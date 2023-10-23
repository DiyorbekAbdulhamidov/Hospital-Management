import React, { FunctionComponent } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { Auth, DoctorPage, HomePage, Page404, Settings, SingleBooking, UserPanel } from "../pages";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../modules/auth/context";
import { SingleHospital } from "../pages/hospital";
import { VerificationEmail } from "../pages/auth";

const AppRoutes: FunctionComponent = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to="/userPanel" /> : <Auth.Login />} />
        <Route path="/forgot-password" element={<Auth.ForgotPassword />} />
        <Route path="/forgot-password/verify" element={<VerificationEmail />} />
        <Route path="/register" element={<Auth.Register />} />
        <Route path="/verification" element={<Auth.Verification />} />
        <Route path="/userPanel" element={user ? <UserPanel /> : <Navigate to="/login" />} />
        <Route path="/userPanel/settings" element={user ? <Settings.MainSettings /> : <Navigate to="/login" />} />
        <Route path="/userPanel/settings/myProfile" element={user ? <Settings.MyProfile /> : <Navigate to="/login" />} />
        <Route path="/userPanel/settings/change-password" element={user ? <Settings.ChangePassword /> : <Navigate to="/login" />} />
        <Route path="/userPanel/settings/changeEmail" element={user ? <Settings.ChangeEmail /> : <Navigate to="/login" />} />
        <Route path="/single-hospital/:hospitalId" element={<SingleHospital hospitalId="" />} />
        <Route path="/doctor/:doctorId" element={<DoctorPage />} />
        <Route path="/booking/:bookingId" element={<SingleBooking bookingId="" />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;