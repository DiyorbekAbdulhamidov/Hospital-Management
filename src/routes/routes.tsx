import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { Auth } from "../pages";

const AppRoutes = () => {
  const isUserAuthenticated = false;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth.Form />} />
          <Route path="/login" element={<Auth.Login />} />
          <Route path="/register" element={<Auth.Register />} />
          <Route path="/reset-password" element={<Auth.ResetPassword />} />
          <Route path="/verification/:email" element={<Auth.Verification />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;