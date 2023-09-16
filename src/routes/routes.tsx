import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { Auth } from "../pages";
import { Settings } from "../pages";
import UserPanel from "../pages/userPanale/userPanel";

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
          <Route path="/userPanel" element={<UserPanel />} />
          <Route
            path="/userPanel/settings"
            element={<Settings.MainSettings />}
          />
          <Route
            path="/userPanel/settings/myProfile"
            element={<Settings.MyProfile />}
          />
          <Route
            path="/userPanel/settings/changePassword"
            element={<Settings.ChangePassword />}
          />
          <Route
            path="/userPanel/settings/changeEmail"
            element={<Settings.ChangeEmail />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
