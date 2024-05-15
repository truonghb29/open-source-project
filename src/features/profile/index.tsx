import { useAuthContext } from '../../context/AuthContext'
import useLogout from '../../hooks/useLogout'
import { BiLogOut } from 'react-icons/bi'
import { ChevronRightIcon, ProfileIcon } from '../../assets/icons'
import { useState } from 'react'
import Modal from 'react-modal'
import PlaneIcon from '../../assets/icons/PlaneIcon'
import WarningIcon from '../../assets/icons/WarningIcon'
import ShareIcon from '../../assets/icons/ShareIcon'
import StarIcon from '../../assets/icons/StarIcon'
import SignIcon from '../../assets/icons/SignIcon'
import LockIcon from '../../assets/icons/LockIcon'
import FaceSadIcon from '../../assets/icons/FaceSadIcon'
import { EditIcon } from '../../assets/icons/EditIcon'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '600px',
  },
}

const Profile = () => {
  const { authUser } = useAuthContext()
  const { loading, logout, deleteUser, updateUser } = useLogout()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [modalProfileOpen, setModalProfileOpen] = useState(false)
  const [modalComingSoon, setModalComingSoon] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [userState, setUserState] = useState({
    fullName: authUser.fullName,
    username: authUser.username,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModalProfile() {
    setModalProfileOpen(true)
  }

  function closeModalProfile() {
    setModalProfileOpen(false)
    setIsEdit(false)
  }

  function openModalComingSoon() {
    setModalComingSoon(true)
  }

  function closeModalComingSoon() {
    setModalComingSoon(false)
  }

  const handleDelete = async (userId) => {
    await deleteUser(userId)
  }

  const handleUpdate = (userId, userData) => {
    updateUser(userId, userData)
    closeModalProfile()
  }

  return (
    <div className="p-6">
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
      </div>
      <div
        className="flex justify-between items-center w-full bg-[#333333] p-4 rounded-2xl mt-6 cursor-pointer"
        onClick={openModalProfile}
      >
        <div className="flex gap-4">
          <ProfileIcon className="text-white" />
          <p className="font-bold text-white">Xem thông tin người dùng</p>
        </div>
        <ChevronRightIcon className="text-white" />
      </div>
      <div
        className="flex justify-between items-center w-full bg-[#333333] p-4 rounded-2xl mt-6 cursor-pointer"
        onClick={openModalComingSoon}
      >
        <div className="flex gap-4">
          <PlaneIcon className="text-white" />
          <p className="font-bold text-white">Chia sẻ phản hồi</p>
        </div>
        <ChevronRightIcon className="text-white" />
      </div>
      <div
        className="flex justify-between items-center w-full bg-[#333333] p-4 rounded-2xl mt-6 cursor-pointer"
        onClick={openModalComingSoon}
      >
        <div className="flex gap-4">
          <WarningIcon className="text-white" />
          <p className="font-bold text-white">Báo cáo sự cố</p>
        </div>
        <ChevronRightIcon className="text-white" />
      </div>
      <div
        className="flex justify-between items-center w-full bg-[#333333] p-4 rounded-2xl mt-6 cursor-pointer"
        onClick={openModalComingSoon}
      >
        <div className="flex gap-4">
          <ShareIcon className="text-white" />
          <p className="font-bold text-white">Chia sẻ Unlocket</p>
        </div>
        <ChevronRightIcon className="text-white" />
      </div>
      <div
        className="flex justify-between items-center w-full bg-[#333333] p-4 rounded-2xl mt-6 cursor-pointer"
        onClick={openModalComingSoon}
      >
        <div className="flex gap-4">
          <StarIcon className="text-white" />
          <p className="font-bold text-white">Đánh giá Unlocket</p>
        </div>
        <ChevronRightIcon className="text-white" />
      </div>
      <div
        className="flex justify-between items-center w-full bg-[#333333] p-4 rounded-2xl mt-6 cursor-pointer"
        onClick={openModalComingSoon}
      >
        <div className="flex gap-4">
          <SignIcon className="text-white" />
          <p className="font-bold text-white">Điều khoản dịch vụ</p>
        </div>
        <ChevronRightIcon className="text-white" />
      </div>
      <div
        className="flex justify-between items-center w-full bg-[#333333] p-4 rounded-2xl mt-6 cursor-pointer"
        onClick={openModalComingSoon}
      >
        <div className="flex gap-4">
          <LockIcon className="text-white" />
          <p className="font-bold text-white">Chính sách quyền riêng tư</p>
        </div>
        <ChevronRightIcon className="text-white" />
      </div>
      <div
        className="flex justify-between items-center w-full bg-[#333333] p-4 rounded-2xl mt-6 cursor-pointer"
        onClick={openModal}
      >
        <div className="flex gap-4">
          <FaceSadIcon className="text-white" />
          <p className="font-bold text-white">Xóa tài khoản</p>
        </div>
        <ChevronRightIcon className="text-white" />
      </div>
      <div
        className="flex gap-4 w-full bg-[#333333] p-4 rounded-2xl mt-6 cursor-pointer"
        onClick={logout}
      >
        {!loading ? (
          <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
        ) : (
          <span className="loading loading-spinner"></span>
        )}
        <p className="font-bold text-white">Đăng xuất</p>
      </div>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="flex justify-center items-center">
            <h2 className="font-bold text-[24px]">
              Bạn có chắc chắn muốn xóa tài khoản này
            </h2>
          </div>

          <div>
            <button
              className="btn btn-block btn-sm mt-2"
              onClick={() => handleDelete(authUser._id)}
            >
              <span className="">Có</span>
            </button>
            <button
              className="btn btn-block btn-sm mt-2 bg-[#EAA72A]"
              onClick={closeModal}
            >
              <span className="">Không</span>
            </button>
          </div>
        </Modal>
      </div>

      <div>
        <Modal
          isOpen={modalProfileOpen}
          onRequestClose={closeModalProfile}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="flex justify-center items-center">
            <h2 className="font-bold text-[24px]">Thông tin người dùng</h2>
          </div>

          <div className="flex justify-between my-6">
            {isEdit ? (
              <div>
                <div className="flex gap-8 items-center">
                  <p className="w-[150px]">Họ tên người dùng: </p>
                  <div className="border-[1px] rounded-sm px-2 border-black">
                    <input
                      name="fullName"
                      className="border-none outline-none"
                      value={userState.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex gap-8 items-center">
                  <p className="w-[150px]">Username: </p>
                  <div className="border-[1px] rounded-sm px-2 border-black">
                    <input
                      name="username"
                      className="border-none outline-none"
                      value={userState.username}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-8 items-center">
                  <p className="w-[150px]">Họ tên người dùng: </p>
                  <p>{authUser.fullName}</p>
                </div>
                <div className="flex gap-8 items-center">
                  <p className="w-[150px]">Username: </p>
                  <p>{authUser.username}</p>
                </div>
              </div>
            )}
            <div className="cursor-pointer" onClick={() => setIsEdit(!isEdit)}>
              <EditIcon className="text-black" />
            </div>
          </div>

          <div>
            <button
              className="btn btn-block btn-sm mt-2"
              onClick={() => handleUpdate(authUser._id, userState)}
              disabled={!isEdit}
            >
              <span className="">Cập nhật</span>
            </button>
            <button
              className="btn btn-block btn-sm mt-2 bg-[#EAA72A]"
              onClick={closeModalProfile}
            >
              <span className="">Thoát</span>
            </button>
          </div>
        </Modal>
      </div>

      <div>
        <Modal
          isOpen={modalComingSoon}
          onRequestClose={closeModalComingSoon}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="flex justify-center items-center">
            <h2 className="font-bold text-[24px]">Sắp ra mắt</h2>
          </div>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 bg-[#EAA72A]"
              onClick={closeModalComingSoon}
            >
              <span className="">Thoát</span>
            </button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Profile
