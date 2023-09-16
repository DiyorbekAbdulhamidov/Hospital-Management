import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { Auth } from "../pages";
import { Settings } from "../pages";
import UserPanel from "../pages/userPanale/userPanel";
import { useAuth } from "../modules/auth/context";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth.Form />} />
        <Route path="/login" element={user ? <Navigate to="/userPanel" /> : <Auth.Login />} />
        <Route path="/register" element={<Auth.Register />} />
        <Route path="/reset-password" element={<Auth.ResetPassword />} />
        <Route path="/verification/:email" element={<Auth.Verification />} />
        <Route path="/userPanel" element={user ? <UserPanel /> : <Navigate to="/login" />} />
        <Route path="/settings" element={user ? <Settings.MainSettings /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
