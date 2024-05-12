import { ChatIcon, FriendIcon, ProfileIcon } from '../../assets/icons'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ROUTER } from '../../config'
import HomeIcon from '../../assets/icons/HomeIcon'

const Layout = () => {
  const location = useLocation()

  return (
    <div className="w-full">
      <div className="flex justify-between mb-4">
        <Link
          to={ROUTER.profile}
          className={`flex gap-2 py-2 px-4 rounded-full bg-[#333333]   ${location.pathname === ROUTER.profile ? 'text-[#EAA72A] pointer-events-none' : 'text-white hover:text-[#EAA72A]'}`}
        >
          <ProfileIcon />
          <p className="font-[400]">Hồ sơ</p>
        </Link>
        <Link
          to={ROUTER.listfriend}
          className={`flex gap-2 py-2 px-4 rounded-full bg-[#333333]   ${location.pathname === ROUTER.listfriend ? 'text-[#EAA72A] pointer-events-none' : 'text-white hover:text-[#EAA72A]'}`}
        >
          <FriendIcon />
          <p className="font-[400]">Bạn bè</p>
        </Link>
        <Link
          to={ROUTER.index}
          className={`flex gap-2 py-2 px-4 rounded-full bg-[#333333]   ${location.pathname === ROUTER.index ? 'text-[#EAA72A] pointer-events-none' : 'text-white hover:text-[#EAA72A]'}`}
        >
          <HomeIcon />
          <p className="font-[400]">Trang chủ</p>
        </Link>
        <Link
          to={ROUTER.message}
          className={`flex gap-2 py-2 px-4 rounded-full bg-[#333333]   ${location.pathname === ROUTER.message ? 'text-[#EAA72A] pointer-events-none' : 'text-white hover:text-[#EAA72A]'}`}
        >
          <ChatIcon />
          <p className="font-[400]">Tin nhắn</p>
        </Link>
      </div>
      <Outlet />
    </div>
  )
}

export default Layout
