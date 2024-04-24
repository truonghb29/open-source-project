import {
  ChatIcon,
  ChevronDownIcon,
  FriendIcon,
  ProfileIcon,
} from '../../assets/icons'
import Camera from '../../components/Camera'
import useScrollSnap from 'react-use-scroll-snap'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ROUTER } from '../../config'

const Home = () => {
  const scrollRef = useRef(null)

  const [url, setUrl] = React.useState<string[]>([])

  useScrollSnap({ ref: scrollRef, duration: 100 })
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Link
          to={'#'}
          className="p-2 rounded-full bg-[#333333] text-white hover:text-[#EAA72A]"
        >
          <ProfileIcon />
        </Link>
        <Link
          to={'#'}
          className="flex gap-2 py-2 px-4 rounded-full bg-[#333333] text-white hover:text-[#EAA72A]"
        >
          <FriendIcon />
          <p>Bạn bè</p>
        </Link>
        <Link
          to={ROUTER.message}
          className="text-white p-2 rounded-full bg-[#333333] hover:text-[#EAA72A]"
        >
          <ChatIcon />
        </Link>
      </div>
      <div className="flex justify-center my-10">
        <Camera setUrl={setUrl} />
      </div>
      <div className="flex flex-col items-center cursor-pointer justify-end">
        <p>Lịch sử</p>
        <ChevronDownIcon />
      </div>

      <div
        className="flex flex-col justify-center items-center gap-10"
        ref={scrollRef}
      >
        {url &&
          url.map((item) => {
            return (
              <div key={item}>
                <img src={item} alt="Screenshot" className="rounded-3xl" />
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Home
