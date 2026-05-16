import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlinePencilAlt, HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom"

export const BlogNav = ()=>{
    const navigate = useNavigate();
    return (
        <div className="h-20 md:h-20 flex items-center justify-between px-4 sm:px-8 md:px-10 lg:px-24 xl:px-40 border-b">
            <div className="flex items-center gap-8">
                <div onClick={() => {navigate('/blog')}} className="cursor-pointer medium-heading-font font-extrabold text-3xl sm:text-3xl">Excerpt</div>
                <div className="hidden sm:block">
                    <div className="relative">
                        <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            className="pl-9 pr-4 py-5 h-9 w-54 bg-gray-100 rounded-full border border-gray-200 text-sm text-black focus:outline-none"
                        />
                    </div>
                </div>

            </div>
            <div className="font-sm flex items-center gap-3 md:gap-6 text-sm md:text-base">
                <button onClick={() => navigate('/new-story')} className="cursor-pointer flex items-center text-gray-500 hover:text-black transition">
                    <HiOutlinePencilAlt className="inline-block text-xl mr-2" />
                    <div className="hidden sm:block text-lg">Write</div>
                </button>
                <button className="bg-black cursor-pointer text-white py-2 px-4 rounded-3xl text-sm sm:text-sm md:text-base" onClick={() => window.location.href = "https://github.com/yashveersinghh/Excerpt.git"}>Github</button>
                <div><HiOutlineUser  className="border border-black rounded-full px-1 text-sm cursor-pointer w-9 h-9"/></div>
            </div>
        </div>
    )
}