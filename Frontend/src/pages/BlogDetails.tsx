import { IoIosArrowRoundBack } from "react-icons/io"
import { BlogNav } from "../components/BlogNav"
import { useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";

export const BlogDetails = () => {
    const navigate = useNavigate();
    return (
        <div>
            <BlogNav />
            <div className="bg-white w-full flex items-start justify-center md:py-6 px-4">
                <div className="w-full max-w-3xl bg-white rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-3 cursor-pointer text-base font-semibold text-gray-800" onClick={() => navigate('/blog')}>
                        <IoIosArrowRoundBack className="text-2xl"/>
                        <h1 className="m-0">Back</h1>
                    </div>
                    <div>
                        <img src="icon.png" alt="" className="w-full h-100 object-cover mt-4" />
                    </div>
                    <div className="mt-6">
                        <div className="text-3xl font-bold">How to CODE?</div>
                        <div className="flex items-center gap-4 text-sm mt-4 mb-4 text-gray-600">
                            <div className="flex items-center gap-1">
                                <BiUser />
                                <div className="hover:underline">Yashveer</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <SlCalender />
                                <div>May 16</div>
                            </div>
                        </div>
                        <div className="font-medium text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae!</div>
                    </div>
                    <div className="mt-6 space-y-4 text-gray-700">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae!Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae!Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae!Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae!Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae!</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae!Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae!Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, molestiae!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}