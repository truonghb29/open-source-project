import { ROUTER } from '../../../config'
import Message from '../index'

const messageRouter = {
  path: ROUTER.message,
  element: <Message />,
}
export const messageRouters = [messageRouter]
