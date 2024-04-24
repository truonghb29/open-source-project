import { ROUTER } from '../../../config'
import Account from '../index'

const messageRouter = {
  path: ROUTER.account,
  element: <Account />,
}
export const messageRouters = [messageRouter]