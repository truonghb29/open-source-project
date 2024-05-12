import { useEffect, useState } from 'react'
import InputEmoji from 'react-input-emoji'
import { useAuthContext } from '../../context/AuthContext'
import ImageIcon from '../../assets/icons/ImageIcon'
import CloseIcon from '../../assets/icons/CloseIcon'
import usePost from '../../hooks/usePost'
import moment from 'moment'
import 'moment/dist/locale/vi'
import EllipsisVerticalIcon from '../../assets/icons/EllipsisVerticalIcon'
import LikeIcon from '../../assets/icons/LikeIcon'
import CommentIcon from '../../assets/icons/CommentIcon'
import ShareIcon from '../../assets/icons/ShareIcon'

const Home = () => {
  const { authUser } = useAuthContext()
  const {
    loading,
    createPost,
    getPosts,
    deletePost,
    getUserById,
    updateLikes,
  } = usePost()
  const [input, setInput] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState({})
  const [showModal, setShowModal] = useState(-1)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    transformFile(file)
  }

  const transformFile = (file) => {
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
    } else {
      setImagePreview('')
    }
  }

  const handleEnter = async () => {
    await createPost({ title: input, image: imagePreview })
    setInput('')
    setImagePreview('')
  }

  const handleLike = async (postId, index) => {
    const updatedPosts = [...posts]
    const updatedPost = { ...updatedPosts[index] }

    if (updatedPost.likes.includes(authUser._id)) {
      updatedPost.likes = updatedPost.likes.filter(
        (userId) => userId !== authUser._id
      )
    } else {
      updatedPost.likes.push(authUser._id)
    }
    updatedPosts[index] = updatedPost
    setPosts(updatedPosts)
    await updateLikes(postId)
  }

  const handleShowModal = (index) => {
    if (showModal === index) {
      setShowModal(-1)
    } else {
      setShowModal(index)
    }
  }

  const handleDelete = async (postId, index) => {
    const updatedPosts = [...posts]
    updatedPosts.splice(index, 1)
    setPosts(updatedPosts)
    await deletePost(postId)
  }

  useEffect(() => {
    const fetchPostsAndUsers = async () => {
      const fetchedPosts = await getPosts()
      setPosts(fetchedPosts.reverse())

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
            onClick={() => setImagePreview('')}
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
        {posts.map((post, index) => {
          const date = new Date(post.createdAt)

          return (
            <div key={post._id} className="bg-[#333333] p-4 rounded-2xl">
              <div className="flex justify-between items-center">
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
                <div
                  className="relative cursor-pointer"
                  onClick={() => handleShowModal(index)}
                >
                  <EllipsisVerticalIcon className="text-white" />
                  {showModal === index && post.author === authUser._id && (
                    <div
                      className="absolute top-8 left-[-80px] text-white bg-[#666666] p-2 rounded-xl"
                      onClick={() => handleDelete(post._id, index)}
                    >
                      Xóa bài viết
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <p className="text-white">{post.title}</p>
                {post?.image?.url && (
                  <div className="flex justify-center items-center mt-4">
                    <img src={post?.image?.url} alt="post image" />
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-4 items-end">
                <div>
                  <span className="text-white">
                    {post.likes.length} lượt thích
                  </span>
                  <div
                    className="flex gap-2 cursor-pointer"
                    onClick={() => handleLike(post._id, index)}
                  >
                    <LikeIcon
                      className={`${post.likes?.includes(authUser._id) ? 'text-[#0866ff]' : 'text-white'}`}
                    />
                    <span
                      className={`${post.likes?.includes(authUser._id) ? 'text-[#0866ff]' : 'text-white'}`}
                    >
                      Thích
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 cursor-pointer">
                  <CommentIcon className="text-white" />
                  <span className="text-white">Bình luận</span>
                </div>
                <div className="flex gap-2 cursor-pointer">
                  <ShareIcon className="text-white" />
                  <span className="text-white">Chia sẻ</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
