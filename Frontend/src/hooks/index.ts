import axios from 'axios'
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config'

export interface Blog {
    id: string
    title?: string
    content?: string
    summary?: string
    imageUrl?: string
    publishedAt?: string
    published?: boolean
    author?: { name?: string } | null
}

export const useBlog = ({ id }: { id: string }) => {
    const [blog, setBlog] = useState<Blog | undefined>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })

                const data = response?.data?.blog
                setBlog(data)
            } catch (err) {
                console.error('fetchBlog failed', err)
                setBlog(undefined)
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [id])

    return { blog, loading }
}

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })

                const data = response?.data?.blogs
                setBlogs(Array.isArray(data) ? data : [])
            } catch (err) {
                console.error('fetchBlogs failed', err)
                setBlogs([])
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    return { blogs, loading }
}