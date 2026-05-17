export const BlogCard = () => {
    return (
        <div className="flex items-center justify-between py-4 mx-10 border-b border-gray-300 mt-5 cursor-pointer">
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-5 text-sm text-gray-600">
                    <div className="hover:underline">Yashveer</div>
                    <div>May 16</div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="font-bold text-2xl">How to CODE?</div>
                    <div className="font-light text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae!</div>
                </div>
            </div>
            <img src="icon.png" alt="" className="h-35 w-40 object-contain justify-between" />
        </div>
    )
}