import { BlogCard } from "../components/BlogCard"
import { BlogNav } from "../components/BlogNav"
import { Search } from "../components/Search"

export const Blog = () => {
    return (
        <div>
            <BlogNav />
            <div className="sm:hidden px-4 py-3 mt-3"><Search /></div>
            <BlogCard 
                authorName="Yashveer"
                publishedDate="May 16"
                title="How to CODE?"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae!"
            />
        </div>
    )
}