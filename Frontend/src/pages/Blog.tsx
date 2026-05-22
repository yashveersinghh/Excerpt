import { BlogCard } from "../components/BlogCard"
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import { BlogNav } from "../components/BlogNav"
import { Search } from "../components/Search"
import { useBlogs } from "../hooks";
import type { Blog as BlogType } from "../hooks";
import { formatPublishedDate } from "../utils/date";

export const Blog = () => {
    const { loading, blogs } = useBlogs();
    if(loading) {
        return (
            <div>
                <BlogNav />
                <div className="sm:hidden px-4 py-3 mt-3"><Search /></div>
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
            </div>
        )
    }
    return (
        <div className="bg-neutral-50 min-h-screen">
            <BlogNav />
            <div className="sm:hidden px-4 py-3 mt-3"><Search /></div>
            {(Array.isArray(blogs) ? blogs : []).map((blog: BlogType) => (
                <BlogCard 
                    id={blog.id}
                    key={blog.id}
                    authorName={blog.author?.name ?? "Unknown Author"}
                    publishedDate={formatPublishedDate(blog.publishedAt)}
                    title={blog.title ?? ''}
                    summary={blog.summary ?? blog.content ?? ''}
                    imageUrl={blog.imageUrl ?? ''}
                />

            ))}
        </div>
    )
}