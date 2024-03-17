import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'

import { ROUTER } from '../config'
import Home from '../features/home'
import Message from '../features/message'

const router = createBrowserRouter([
  {
    path: ROUTER.index,
    element: <Home />,
    errorElement: <div>404</div>,
  },
  {
    path: ROUTER.message,
    element: <Message />,
  },
])

export function MyRouterProvider() {
  return <RouterProvider router={router} />
}
