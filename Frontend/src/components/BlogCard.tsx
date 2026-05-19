interface BlogCardProps{
    authorName: string;
    title: string;
    publishedDate: string;
    content: string;
}

export const BlogCard = (props: BlogCardProps) => {
    return (
        <div className="flex flex-row items-start md:items-center justify-between py-4 mx-4 md:mx-60 border-b border-gray-200 mt-5 cursor-pointer">
            <div className="flex-1 flex flex-col gap-4 px-4 md:px-10">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="hover:underline flex items-center gap-2"><Avatar name={props.authorName}/>{props.authorName}</div>
                    <div>{props.publishedDate}</div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="font-bold text-lg md:text-2xl">{props.title}</div>
                    <div className="font-light text-gray-700 text-sm md:text-base">{props.content}</div>
                    <div className="text-sm text-neutral-500">{`${Math.ceil(props.content.length/100)} min read`}</div>
                </div>
            </div>
            <img src="icon.png" alt="blog thumbnail" className="flex shrink-0 mt-10 ml-4 h-16 w-28 md:h-24 md:w-36 lg:h-40 lg:w-40 object-cover rounded" />
        </div>
    )
}

function Avatar({name}: {name: string}){
    return (
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-neutral-500 text-zinc-50 border rounded-full">
            <span className="font-medium text-body">{name[0]}</span>
        </div>
    )
}