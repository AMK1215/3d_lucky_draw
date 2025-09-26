import { useApp } from '../context/AppContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useApp()

  return isLoggedIn ? children : <Navigate to="/" replace />
}

export default ProtectedRoute
