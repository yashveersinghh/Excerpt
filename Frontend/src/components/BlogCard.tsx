export const BlogCard = () => {
    return (
        <div className="flex flex-row items-start md:items-center justify-between py-4 mx-4 md:mx-60 border-b border-gray-200 mt-5 cursor-pointer">
            <div className="flex-1 flex flex-col gap-4 px-4 md:px-10">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="hover:underline">Yashveer</div>
                    <div>May 16</div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="font-bold text-lg md:text-2xl">How to CODE?</div>
                    <div className="font-light text-gray-700 text-sm md:text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae!</div>
                </div>
            </div>
            <img src="icon.png" alt="blog thumbnail" className="flex shrink-0 mt-10 ml-4 h-16 w-28 md:h-24 md:w-36 lg:h-40 lg:w-40 object-cover rounded" />
        </div>
    )
}