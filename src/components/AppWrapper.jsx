import { AppProvider } from '../context/AppContext'
import Layout from './Layout'

const AppWrapper = ({ children }) => {
  return (
    <AppProvider>
      <Layout>
        {children}
      </Layout>
    </AppProvider>
  )
}

export default AppWrapper
