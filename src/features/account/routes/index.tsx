import { ROUTER } from '../../../config'
import Account from '../index'

const accountRouter = {
  path: ROUTER.account,
  element: <Account />,
}
export const accountRouters = [accountRouter]
