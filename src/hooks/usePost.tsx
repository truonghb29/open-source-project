import { useState } from 'react'
import toast from 'react-hot-toast'

const usePost = () => {
  const [loading, setLoading] = useState(false)

  // Tạo bài viết mới
  const createPost = async ({
    title,
    image,
  }: {
    title: string
    image?: string
  }) => {
    try {
      setLoading(true)
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, image }),
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      toast.success('Post created successfully')
    } catch (error) {
      console.error('Error creating post:', error)
      toast.error('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  // Lấy tất cả các bài viết
  const getPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/posts')

      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }

      const posts = await response.json()
      return posts
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast.error('Failed to fetch posts')
      return []
    } finally {
      setLoading(false)
    }
  }

  // Xóa bài viết
  const deletePost = async (postId) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete post')
      }

      toast.success('Post deleted successfully')
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    } finally {
      setLoading(false)
    }
  }

  // Xóa bài viết
  const getUserById = async (userId) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/users/${userId}`, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('Failed to get user by id: ' + userId)
      }
      const user = await response.json()
      return user
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    } finally {
      setLoading(false)
    }
  }

  return { loading, createPost, getPosts, deletePost, getUserById }
}

export default usePost
