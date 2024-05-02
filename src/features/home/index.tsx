import { useEffect, useState } from 'react'
import InputEmoji from 'react-input-emoji'
import { useAuthContext } from '../../context/AuthContext'
import ImageIcon from '../../assets/icons/ImageIcon'
import CloseIcon from '../../assets/icons/CloseIcon'
import usePost from '../../hooks/usePost'
import moment from 'moment'
import 'moment/dist/locale/vi'

const Home = () => {
  const { authUser } = useAuthContext()
  const { loading, createPost, getPosts, deletePost, getUserById } = usePost()
  const [input, setInput] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState({})

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0]
    const imageUrl = URL.createObjectURL(selectedFile)
    setImagePreview(imageUrl)
  }

  const handleEnter = async () => {
    await createPost({ title: input, image: imagePreview })
    setInput('')
    setImagePreview(null)
  }

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      const fetchedPosts = await getPosts()
      setPosts(fetchedPosts)

      const userIds = fetchedPosts.map((post) => post.author)
      const users = await Promise.all(
        userIds.map((userId) => getUserById(userId))
      )
      const usersMap = users.reduce((acc, user) => {
        acc[user._id] = user
        return acc
      }, {})
      setUsers(usersMap)
    }

    fetchPostsAndUsers()
  }, [])

  return (
    <div>
      <form className="w-full" onSubmit={handleEnter}>
        <div className="flex items-center">
          <div className="w-[40px] h-[40px]">
            <img
              src={`https://avatar.iran.liara.run/public/boy?username=${authUser.username}`}
              alt="user avatar"
            />
          </div>
          <div className="flex-1">
            <InputEmoji
              value={input}
              onChange={setInput}
              borderColor="#4b5563"
              shouldConvertEmojiToImage={false}
              shouldReturn={false}
              placeholder={`${authUser.fullName} ơi, bạn đang nghĩ gì thế?`}
              background="#374151"
              fontSize={14}
              borderRadius={8}
              color="#cccccc"
              onEnter={handleEnter}
              cleanOnEnter
              keepOpened
            />
          </div>
          <div>
            <label htmlFor="upload-photo" className="cursor-pointer">
              <ImageIcon className="text-[#999999]" />
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="upload-photo"
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className="relative flex justify-center items-center">
          <button
            className={`absolute top-0 right-0 bg-transparent ${imagePreview ? '' : 'hidden'}`}
            onClick={() => setImagePreview(null)}
          >
            <CloseIcon className="text-white w-8 h-8" />
          </button>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="rounded-[24px]" />
          )}
        </div>
        {input && (
          <div>
            <button
              className="btn btn-block btn-sm mt-2"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                'Đăng'
              )}
            </button>
          </div>
        )}
      </form>
      <div className="flex flex-col gap-6 mt-6">
        {posts.map((post) => {
          const date = new Date(post.createdAt)
          return (
            <div key={post._id} className="bg-[#333333] p-4 rounded-2xl">
              <div className="flex gap-2 items-center">
                <div className="w-[40px] h-[40px]">
                  {users[post.author] && (
                    <img
                      src={users[post.author].profilePic}
                      alt="user avatar"
                    />
                  )}
                </div>
                <div>
                  <p className="text-white font-bold">
                    {users[post.author]?.fullName || 'Jonh Doe'}
                  </p>
                  <p className="text-[#999999]">{moment(date).fromNow()}</p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-white">{post.title}</p>
                <p className="text-white">{post?.image}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
