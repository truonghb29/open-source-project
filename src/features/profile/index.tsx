import { useAuthContext } from '../../context/AuthContext'
import LogoutButton from '../../components/sidebar/LogoutButton'

const Profile = () => {
  const { authUser } = useAuthContext()

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[100px] h-[100px]">
        <img
          src={`https://avatar.iran.liara.run/public/boy?username=${authUser.username}`}
          alt="user avatar"
        />
      </div>
      <p className="text-white font-sans font-semibold text-[24px] mt-2">
        {authUser.fullName}
      </p>
      <LogoutButton />
    </div>
  )
}

export default Profile
