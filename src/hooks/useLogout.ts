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

  const updateUser = async (userId, updateData) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('User updated successfully')
        // Update the auth user context if the updated user is the logged-in user
        if (data._id === userId) {
          setAuthUser(data)
        }
      } else {
        throw new Error(data.error || 'Failed to update user')
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, logout, deleteUser, updateUser }
}
export default useLogout
