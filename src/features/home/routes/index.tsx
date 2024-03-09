import { ROUTER } from '../../../config'
import Home from '../index.tsx'

const homeRouter = {
  path: ROUTER.index,
  element: <Home />,
}
export const homeRouters = [homeRouter]
