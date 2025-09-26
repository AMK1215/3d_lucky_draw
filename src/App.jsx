import { Routes, Route } from 'react-router-dom'
import AppWrapper from './components/AppWrapper'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import SelectedTickets from './pages/SelectedTickets'
import AvailableTickets from './pages/AvailableTickets'
import Payment from './pages/Payment'
import Confirmation from './pages/Confirmation'
import Profile from './pages/Profile'
import MyTickets from './pages/MyTickets'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/selected" 
        element={
          <ProtectedRoute>
            <SelectedTickets />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/available" 
        element={
          <ProtectedRoute>
            <AvailableTickets />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payment" 
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/confirmation" 
        element={
          <ProtectedRoute>
            <Confirmation />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/my-tickets" 
        element={
          <ProtectedRoute>
            <MyTickets />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

function App() {
  return (
    <AppWrapper>
      <AppRoutes />
    </AppWrapper>
  )
}

export default App
