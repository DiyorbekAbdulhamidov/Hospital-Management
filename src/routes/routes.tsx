import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { Auth, HomePage, Settings, UserPanel } from "../pages";
import { useAuth } from "../modules/auth/context";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={user ? <Navigate to="/userPanel" /> : <Auth.Login />} />
        <Route path="/register" element={<Auth.Register />} />
        <Route path="/verification" element={<Auth.Verification />} />
        <Route path="/userPanel" element={user ? <UserPanel /> : <Navigate to="/login" />} />
        <Route path="/settings" element={user ? <Settings.MainSettings /> : <Navigate to="/login" />} />
        <Route path="/userPanel/settings/myProfile" element={user ? <Settings.MyProfile /> : <Navigate to="/login" />} />
        <Route path="/userPanel/settings/changePassword" element={user ? <Settings.ChangePassword /> : <Navigate to="/login" />} />
        <Route path="/userPanel/settings/changeEmail" element={user ? <Settings.ChangeEmail /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;