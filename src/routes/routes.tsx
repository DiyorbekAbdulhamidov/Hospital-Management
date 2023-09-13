import { BrowserRouter, Route, Routes as BaseRoutes, Navigate } from 'react-router-dom'
import { Auth } from '../pages'

const Routes = () => {
  const isUserAuthenticated = false

  return (
    <>
      <BrowserRouter>
        <BaseRoutes>
          <Route path="/">{/* <Route index element={<Home />} /> */}</Route>

          <Route path="auth" element={isUserAuthenticated ? <Navigate to="/" /> : <Navigate to="/auth/login" />}>
            <Route path="login" element={<Auth.Login />} />
            <Route path="register" element={<Auth.Register />} />
            <Route path="reset-password" element={<Auth.ResetPassword />} />
            <Route path="verification" element={<Auth.Verification />} />
          </Route>

          {/* <Route path="404" element={<Page404 />} /> */}
        </BaseRoutes>
      </BrowserRouter>
    </>
  )
}

export default Routes
