import Conversations from '../../components/sidebar/Conversations'

const ListFriend = () => {
  return (
    <div>
      <div className="flex flex-col gap-10 justify-between font-sans ">
        <Conversations />
        <div className="flex justify-center">
          <button className="w-32 rouned-full transition ease-in-out delay-150 bg-[#fff] hover:-translate-y-1 hover:scale-110 border-separate">
            See more
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListFriend
