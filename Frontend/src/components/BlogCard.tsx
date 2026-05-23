import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps{
    id: string;
    authorName: string;
    title: string;
    publishedDate: string;
    content: string;
    summary: string;
    imageUrl: string;
}

export const BlogCard = (props: BlogCardProps) => {
    return ( <Link to={`/blog/${props.id}`}>
        <div className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-5 py-5 mx-4 md:mx-60 mt-5 cursor-pointer rounded-3xl border border-transparent bg-white/80 px-2 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-100 hover:shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
            <div className="flex-1 flex flex-col gap-4 px-4 md:px-8 min-w-0">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="hover:underline flex items-center gap-2"><Avatar name={props.authorName}/>{props.authorName}</div>
                    <div>{props.publishedDate}</div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="medium-heading-font font-semibold text-xl leading-snug tracking-tight text-gray-950 md:text-3xl">
                        {props.title}
                    </div>
                    <div className="medium-heading-font text-sm leading-7 text-gray-700 md:text-base">
                        {props.summary}
                    </div>
                    <div className="text-sm font-medium text-black">{`${Math.ceil(props.content.length/100)} min read`}</div>
                </div>
            </div>
            <img
                src={props.imageUrl || "/404.png"}
                alt="blog thumbnail"
                className="flex shrink-0 w-full rounded-2xl border border-gray-200 object-cover shadow-[0_10px_24px_rgba(15,23,42,0.12)] aspect-16/10 md:mt-2 md:h-36 md:w-48 lg:h-44 lg:w-56"
            />
        </div>
    </Link> 
    )
}
