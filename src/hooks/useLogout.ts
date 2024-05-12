import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'

const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (data.error) {
        throw new Error(data.error)
      }

      localStorage.removeItem('chat-user')
      setAuthUser(null)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        throw new Error('Failed to delete user')
      }
      toast.success('User deleted successfully')
      await logout()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return { loading, logout, deleteUser }
}
export default useLogout
