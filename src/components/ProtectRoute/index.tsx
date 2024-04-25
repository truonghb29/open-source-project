import { ROUTER } from '../../config'
import { Navigate, Outlet } from 'react-router'
import { useAuthContext } from '../../context/AuthContext'

export const ProtectRoute = () => {
  const { authUser } = useAuthContext()

  if (authUser) {
    return <Navigate to={ROUTER.index} />
  }

  return <>{<Outlet />}</>
}
