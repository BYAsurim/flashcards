import { useOutletContext } from 'react-router-dom'

export type AuthContext = {
  isAuthenticated: boolean
}

export const useAuthContext = () => {
  return useOutletContext<AuthContext>()
}
