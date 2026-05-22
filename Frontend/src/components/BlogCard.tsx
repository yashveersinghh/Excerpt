import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps{
    id: string;
    authorName: string;
    title: string;
    publishedDate: string;
    summary: string;
    imageUrl: string;
}

export const BlogCard = (props: BlogCardProps) => {
    return ( <Link to={`/blog/${props.id}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 mx-4 md:mx-60 border-b border-gray-200 mt-5 cursor-pointer">
            <div className="flex-1 flex flex-col gap-4 px-4 md:px-10 min-w-0">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="hover:underline flex items-center gap-2"><Avatar name={props.authorName}/>{props.authorName}</div>
                    <div>{props.publishedDate}</div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="font-bold text-lg md:text-2xl">{props.title}</div>
                    <div className="font-light text-gray-700 text-sm md:text-base">{props.summary}</div>
                    <div className="text-sm text-neutral-500">{`${Math.ceil(props.summary.length/100)} min read`}</div>
                </div>
            </div>
            <img
                src={props.imageUrl || "/404.png"}
                alt="blog thumbnail"
                className="flex shrink-0 w-full h-48 md:mt-10 md:ml-4 md:h-24 md:w-36 lg:h-40 lg:w-50 object-cover rounded px-4 md:px-0"
            />
        </div>
    </Link> 
    )
}
