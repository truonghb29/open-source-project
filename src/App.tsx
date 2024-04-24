import MainLayout from './components/MainLayout'
import { useAuthContext } from './context/AuthContext.tsx'
import { Navigate, Route, Routes } from 'react-router'
import Home from './features/home'
import Login from './features/login'
import SignUp from './features/SignUp'
import { Toaster } from 'react-hot-toast'
import Message from './features/message'
import { ROUTER } from './config'

function App() {
  const { authUser } = useAuthContext()
  return (
    <MainLayout>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route
            path={ROUTER.index}
            element={authUser ? <Home /> : <Navigate to={ROUTER.login} />}
          />
          <Route
            path={ROUTER.message}
            element={authUser ? <Message /> : <Navigate to={ROUTER.login} />}
          />
          <Route
            path={ROUTER.login}
            element={authUser ? <Navigate to={ROUTER.index} /> : <Login />}
          />
          <Route
            path={ROUTER.signup}
            element={authUser ? <Navigate to={ROUTER.index} /> : <SignUp />}
          />
        </Routes>
        <Toaster />
      </div>
      );
    </MainLayout>
    // </Provider>
  )
}

export default App
