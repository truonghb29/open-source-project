import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'

import { ROUTER } from '../config'
import { homeRouters } from '../features/home/routes'
import Home from '../features/home'
import { messageRouters } from '../features/message/routes'

const router = createBrowserRouter([
  {
    path: ROUTER.index,
    element: <Home />,
    errorElement: <div>404</div>,
    children: [...homeRouters, ...messageRouters],
  },
])

export function MyRouterProvider() {
  return <RouterProvider router={router} />
}
