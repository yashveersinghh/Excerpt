import { BlogNav } from "../components/BlogNav"
import { useBlog } from "../hooks";
import BlogSkeleton from "../components/BlogSkeleton";
import { BlogContent } from "../components/BlogContent";
import { useParams } from "react-router-dom";
import { formatPublishedDate } from "../utils/date";


export const BlogDetails = () => {
    const { id = "" } = useParams();
    const { loading, blog } = useBlog({ id });
    if (loading || !blog) {
        return (
            <div>
                <BlogNav name={blog?.author?.name ?? "Unknown Author"} />
                <BlogSkeleton />
            </div>
        )
    }

    return (
        <div>
            <BlogNav name={blog.author?.name ?? "Unknown Author"} />
            <BlogContent 
                id={blog.id}
                title={blog.title ?? ''}
                content={blog.content ?? ''}
                summary={blog.summary ?? ''}
                author={blog.author ?? null}
                publishedAt={formatPublishedDate(blog.publishedAt)}
                imageUrl={blog.imageUrl ?? ''}
            />
        </div>
    )
}