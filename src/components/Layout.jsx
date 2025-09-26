import { useApp } from '../context/AppContext'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import LoginModal from './LoginModal'

const Layout = ({ children }) => {
  const { isLoggedIn } = useApp()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navbar />
      <LoginModal />
      <div className="flex">
        <Sidebar />
        <main className={`flex-1 ${isLoggedIn ? 'lg:ml-64 xl:ml-72' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
