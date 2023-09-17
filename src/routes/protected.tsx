import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedProps {
  allow: boolean
  navigate: string
}

const Protected = ({ allow, navigate }: ProtectedProps) => {
  if (!allow) return <Navigate to={navigate} />

  return <Outlet />
}

export default Protected;