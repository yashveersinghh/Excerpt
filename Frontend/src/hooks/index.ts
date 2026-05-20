import axios from "axios";
import { useEffect, useState } from "react";

export const useBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBlogs() {
            const response = await axios.get(`{BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            setBlogs(response.data);
            setLoading(false);
        }
        fetchBlogs();
    }, []);
    return { blogs, loading };
}