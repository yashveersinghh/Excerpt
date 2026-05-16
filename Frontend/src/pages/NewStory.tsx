import { HiOutlineUser } from "react-icons/hi2";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const NewStory = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="h-20 md:h-20 flex items-center justify-between px-4 sm:px-8 md:px-10 lg:px-24 xl:px-40 border-b">
                <div className="flex items-center gap-8">
                    <div onClick={() => {navigate('/blog')}} className="cursor-pointer medium-heading-font font-extrabold text-3xl sm:text-3xl flex">Excerpt</div>
                </div>
                <div className="font-sm flex items-center gap-3 md:gap-6 text-sm md:text-base">
                    <button className="bg-green-600 cursor-pointer text-white py-1.5 px-3 rounded-3xl text-sm sm:text-sm md:text-base" onClick={() => navigate('/blog')}>Publish</button>
                    <div><HiOutlineUser  className="border border-black rounded-full px-1 text-sm cursor-pointer w-9 h-9"/></div>
                </div>
            </div>
            <div className="bg-white h-screen w-full max-w-lg rounded-lg md:shadow-2xl flex flex-col gap-6 p-8 relative">
                <div className="relative flex items-center gap-1 cursor-pointer text-xl font-semibold" onClick={() => navigate('/blog')}>
                    <IoIosArrowRoundBack className="text-2xl"/> 
                    <h1>Back</h1>
                </div>
                <div className="p-4 flex flex-col gap-6">
                    <div>
                        <div className="text-2xl font-bold">Create New Post</div>
                        <div className="font-medium text-gray-400">What's in your mind today?</div>
                    </div>
                    <div className="font-medium">Title</div>
                    <textarea placeholder="Write your title here..." className="w-full h-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-grey-200"></textarea>
                    <div className="font-medium">Content</div>
                    <textarea placeholder="Write your story here..." className="w-full h-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-grey-200"></textarea>
                </div>
            </div>
        </div>
    )
}