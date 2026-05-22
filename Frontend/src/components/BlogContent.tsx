import { IoIosArrowRoundBack } from "react-icons/io"
import { BiUser } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

interface BlogDetailsProps {
    id: string;
    title: string;
    content: string;
    author: { name?: string } | null;
    publishedAt: string;
    imageUrl?: string;
}
export const BlogContent = (props: BlogDetailsProps) => {
    const navigate = useNavigate();
    return (
        <div className="bg-neutral-50 w-full flex items-start justify-center md:py-6 px-4">
                <div className="w-full max-w-3xl bg-neutral-50 rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-3 cursor-pointer text-base font-semibold text-gray-800" onClick={() => navigate('/blog')}>
                        <IoIosArrowRoundBack className="text-2xl"/>
                        <h1 className="m-0">Back</h1>
                    </div>
                    <div>
                        <img src={props.imageUrl || "/404.png"} alt="" className="w-full h-100 object-cover mt-4" />
                    </div>
                    <div className="mt-6">
                        <div className="text-3xl font-bold">{props.title}</div>
                        <div className="flex items-center gap-4 text-sm mt-4 mb-4 text-gray-600">
                            <div className="flex items-center gap-1">
                                <BiUser />
                                <div className="hover:underline">{props.author?.name}</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <SlCalender />
                                <div>{props.publishedAt}</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 space-y-4 text-gray-700">
                        {props.content}
                    </div>
                </div>
            </div>
    )
}