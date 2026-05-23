import { IoIosArrowRoundBack } from "react-icons/io"
import { BiUser } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

interface BlogDetailsProps {
    id: string;
    title: string;
    content: string;
    summary?: string;
    author: { name?: string } | null;
    publishedAt: string;
    imageUrl?: string;
}
export const BlogContent = (props: BlogDetailsProps) => {
    const navigate = useNavigate();
    return (
        <div className="blog-article bg-linear-to-b from-neutral-50 to-stone-100 w-full flex items-start justify-center px-4 md:py-8">
                <div className="w-full max-w-4xl rounded-4xl border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm md:p-10">
                    <div className="flex items-center gap-3 cursor-pointer text-base font-semibold text-gray-800" onClick={() => navigate('/blog')}>
                        <IoIosArrowRoundBack className="text-2xl"/>
                        <h1 className="m-0">Back</h1>
                    </div>
                    <div className="mt-5 overflow-hidden rounded-[1.75rem] border border-stone-200 bg-stone-50 shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                        <img src={props.imageUrl || "/404.png"} alt="" className="w-full aspect-video object-contain" />
                    </div>
                    <div className="mt-8">
                        <div className="medium-heading-font max-w-3xl text-4xl font-semibold tracking-tight text-gray-950 md:text-5xl">
                            {props.title}
                        </div>
                        {props.summary ? (
                            <p className="medium-heading-font mt-4 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
                                {props.summary}
                            </p>
                        ) : null}
                        <div className="flex items-center gap-4 text-sm mt-6 mb-4 text-gray-600">
                            <div className="flex items-center gap-1">
                                <BiUser className="text-xl font-extrabold text-black" />
                                <div className="hover:underline medium-heading-font text-base font-light">{props.author?.name}</div>
                            </div>
                            <div className="flex items-center gap-1">
                                <SlCalender className="text-xl font-extrabold text-black" />
                                <div className="medium-heading-font text-base font-light">{props.publishedAt}</div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="rich-text-editor blog-content-body mt-8 space-y-4 text-gray-800 prose prose-stone max-w-none"
                        dangerouslySetInnerHTML={{ __html: props.content }}
                    />
                </div>
            </div>
    )
}