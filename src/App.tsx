import MainLayout from './components/MainLayout'
import { useAuthContext } from './context/AuthContext.tsx'
import { Navigate, Route, Routes } from 'react-router'
import Layout from './features/layout'
import Login from './features/login'
import SignUp from './features/SignUp'
import { Toaster } from 'react-hot-toast'
import Message from './features/message'
import { ROUTER } from './config'
import Profile from './features/profile'
import ListFriend from './features/listfriend'
import Home from './features/home'

function App() {
  const { authUser } = useAuthContext()
  return (
    <MainLayout>
      <div className="p-4 flex items-start justify-center">
        <Routes>
          <Route
            path={ROUTER.index}
            element={authUser ? <Layout /> : <Navigate to={ROUTER.login} />}
          >
            <Route
              path={ROUTER.index}
              element={authUser ? <Home /> : <Navigate to={ROUTER.login} />}
            />
            <Route
              path={ROUTER.message}
              element={authUser ? <Message /> : <Navigate to={ROUTER.login} />}
            />
            <Route
              path={ROUTER.profile}
              element={authUser ? <Profile /> : <Navigate to={ROUTER.login} />}
            />
            <Route
              path={ROUTER.listfriend}
              element={
                authUser ? <ListFriend /> : <Navigate to={ROUTER.login} />
              }
            />
          </Route>

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
    </MainLayout>
    // </Provider>
  )
}

export default App
