import { HiOutlineUser } from "react-icons/hi2";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export const NewStory = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen">
            <div className="h-20 flex items-center justify-between px-4 sm:px-8 md:px-40 border-b border-slate-800">
                <div className="flex items-center gap-8">
                    <div onClick={() => {navigate('/blog')}} className="cursor-pointer medium-heading-font font-extrabold text-3xl sm:text-3xl flex">Excerpt</div>
                </div>
                <div className="font-sm flex items-center gap-3 md:gap-6 text-sm md:text-base">
                    <a href="https://github.com/yashveersinghh/Excerpt.git" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-zinc-400 bg-white text-black rounded-[14px] text-sm cursor-pointer px-4 py-2 hover:opacity-85 transition-all duration-200"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 496 512" className="text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>GitHub</a>
                    <div><HiOutlineUser  className="border border-black rounded-full px-1 text-sm cursor-pointer w-9 h-9"/></div>
                </div>
            </div>
            <div className="bg-white w-full flex items-start justify-center py-12 px-4">
                <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-6 md:p-8">
                    <div className="flex items-center gap-3 cursor-pointer text-base font-semibold text-gray-800" onClick={() => navigate('/blog')}>
                        <IoIosArrowRoundBack className="text-2xl"/>
                        <h1 className="m-0">Back</h1>
                    </div>

                    <div className="mt-6">
                        <div className="text-2xl font-bold">Create New Post</div>
                        <div className="font-medium text-gray-500">What's in your mind today?</div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Title</label>
                            <input placeholder="Write your title here..." className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300" />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Summary</label>
                            <textarea placeholder="Write your summary here..." className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 resize-y" />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Cover Image</label>
                            <input type="file" accept="image/*" className="hidden" />
                            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 flex items-center justify-center text-center text-gray-500 hover:border-gray-400 cursor-pointer">
                                <div>
                                    <div className="font-semibold">Drop image here or click to upload</div>
                                    <div className="text-sm mt-1 text-gray-400">Recommended: 1600×900 • PNG / JPG • &lt; 3MB</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Content</label>
                            <textarea placeholder="Write your content here..." rows={10} className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 min-h-65 resize-y" />
                        </div>

                        <div className="flex justify-center pt-2">
                            <button className="bg-black text-white hover:bg-gray-200 hover:text-black hover:border cursor-pointer py-2 px-6 rounded-3xl hover:opacity-95 transition">Create Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}