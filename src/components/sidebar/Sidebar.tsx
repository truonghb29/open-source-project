import Conversations from './Conversations.js'
import LogoutButton from './LogoutButton.js'
import SearchInput from './SearchInput.js'

const Sidebar = () => {
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  )
}
export default Sidebar
