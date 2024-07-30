import { Navigate, Outlet } from 'react-router-dom'

import { useAuthContext } from '@/hooks'

export function PrivateRoutes() {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}
