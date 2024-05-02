import { ROUTER } from '../../../config'
import ListFriend from '../index'

const friendsRouter = {
  path: ROUTER.message,
  element: <ListFriend />,
}
export const friendsRouters = [friendsRouter]
