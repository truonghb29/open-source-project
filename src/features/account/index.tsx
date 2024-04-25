import { Link } from "react-router-dom";

interface UserData {
  avatar: string;
  full_name: string;
  nickname: string;
}
const Account = ({ data }: { data: UserData }) => {
  return (
    <div>
      <Link to={`/@$(data.nickname)`} className="flex flex-row gap-10 justify-start text-white bg-transparent outline-none hover:text-white">
        <img
          className="w-10 h-10 rounded-full"
          src={data.avatar}
          alt="Anh"
        />
        <h4 className=" flex flex-col items-start">
          <p className="flex font-bold">
            <span>{data.full_name}</span>
          </p>
          <span className="font-[400]">#{data.nickname}</span>
        </h4>
      </Link>
    </div>
  )
}

export default Account
