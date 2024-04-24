import { ROUTER } from '../../../config'
import ListFriend from '../index'

const messageRouter = {
  path: ROUTER.message,
  element: <ListFriend />,
}
export const messageRouters = [messageRouter]
