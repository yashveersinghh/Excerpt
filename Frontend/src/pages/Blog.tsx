import { BlogCard } from "../components/BlogCard"
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import { BlogNav } from "../components/BlogNav"
import { useBlogs } from "../hooks";
import type { Blog as BlogType } from "../hooks";
import { formatPublishedDate } from "../utils/date";

export const Blog = () => {
    const { loading, blogs } = useBlogs();
    if(loading) {
        return (
            <div>
                <BlogNav name={blogs[0]?.author?.name} />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
            </div>
        )
    }
    return (
        <div className="bg-neutral-50 min-h-screen">
            <BlogNav name={blogs[0]?.author?.name} />
            {(Array.isArray(blogs) ? blogs : []).map((blog: BlogType) => (
                <BlogCard 
                    id={blog.id}
                    key={blog.id}
                    authorName={blog.author?.name ?? "Unknown Author"}
                    publishedDate={formatPublishedDate(blog.publishedAt)}
                    title={blog.title ?? ''}
                    content={blog.content ?? ''}
                    summary={blog.summary ?? ''}
                    imageUrl={blog.imageUrl ?? ''}
                />

            ))}
        </div>
    )
}