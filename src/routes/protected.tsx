import { Navigate, Outlet } from 'react-router-dom'
import { IEntity } from '../modules/auth/types'

interface ProtectedProps {
  allow: IEntity.User | null | boolean;
  navigate: string
}

const Protected = ({ allow, navigate }: ProtectedProps) => {
  if (!allow) return <Navigate to={navigate} />

  return <Outlet />
}

export default Protected;