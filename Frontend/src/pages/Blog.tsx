import { BlogCard } from "../components/BlogCard"
import BlogCardSkeleton from "../components/BlogCardSkeleton";
import { BlogNav } from "../components/BlogNav"
import { Search } from "../components/Search"
import { useBlog } from "../hooks";
import type { Blog as BlogType } from "../hooks";

export const Blog = () => {
    const { loading, blogs } = useBlog();
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
        <div>
            <BlogNav />
            <div className="sm:hidden px-4 py-3 mt-3"><Search /></div>
            {(Array.isArray(blogs) ? blogs : []).map((blog: BlogType) => (
                <BlogCard 
                    key={blog.id}
                    authorName={blog.author?.name ?? "Unknown Author"}
                    publishedDate={blog.publishedAt ?? (blog.published ? 'Published' : '')}
                    title={blog.title ?? ''}
                    summary={blog.content ?? ''}
                />

            ))}
        </div>
    )
}