import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegFileImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ModernRichTextEditor from "../components/ModernRichTextEditor";
import { Avatar } from "../components/Avatar";
import axios from 'axios';
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

export const NewStory = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        }
    }, [previewUrl])

    const handleCreate = async () => {
        try {
            let imageUrl = "";
            if (selectedFile) {
                const cloudName = (import.meta).env.VITE_CLOUDINARY_CLOUD_NAME
                const uploadPreset = (import.meta).env.VITE_CLOUDINARY_UPLOAD_PRESET
                const fd = new FormData();
                fd.append('file', selectedFile);
                fd.append('upload_preset', uploadPreset);
                const uploadRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, fd);
                imageUrl = uploadRes?.data?.secure_url ?? '';
            }

            const body = {
                title,
                content,
                summary,
                imageUrl,
                publishedAt: new Date().toISOString()
            }

            await axios.post(`${BACKEND_URL}/api/v1/blog`, body, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            navigate('/blog');
        } catch (err) {
            console.error('Create post failed', err);
            toast.error('Failed to create post. Please try again.');
        }
    }

    return (
        <div className="min-h-screen">
            <div className="bg-neutral-50 h-20 flex items-center justify-between px-4 sm:px-8 md:px-40 border-b border-slate-800">
                <div className="flex items-center gap-8">
                    <div onClick={() => {navigate('/blog')}} className="cursor-pointer medium-heading-font font-extrabold text-3xl sm:text-3xl flex">Excerpt</div>
                </div>
                <div className="font-sm flex items-center gap-3 md:gap-6 text-sm md:text-base">
                    <a href="https://github.com/yashveersinghh/Excerpt.git" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-zinc-400 bg-white text-black rounded-[14px] text-sm cursor-pointer px-4 py-2 hover:opacity-85 transition-all duration-200">GitHub</a>
                    <div><Avatar name="Yashveer" /></div>
                </div>
            </div>
            <div className="bg-neutral-50 w-full flex items-start justify-center md:py-6 px-4">
                <div className="w-full max-w-3xl bg-neutral-50 rounded-2xl md:shadow-md p-6 md:p-8">
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
                            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Write your title here..." className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300" />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Summary</label>
                            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Write your summary here..." className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 resize-y" />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Cover Image</label>
                            <input ref={fileInputRef} onChange={(e) => {
                                const f = e.target.files?.[0] ?? null;
                                setSelectedFile(f);
                                if (f) setPreviewUrl(URL.createObjectURL(f));
                                else setPreviewUrl("");
                            }} type="file" accept="image/*" className="hidden" />

                            {previewUrl ? (
                                <img src={previewUrl} alt="preview" className="w-full h-48 object-cover rounded mb-3" />
                            ) : null}

                            <div onClick={() => fileInputRef.current?.click()} className="rounded-lg border-2 border-dashed border-gray-300 p-6 flex items-center justify-center text-center text-gray-500 hover:border-gray-400 cursor-pointer">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="font-semibold">Drop image here or click to upload</div>
                                    <FaRegFileImage className="text-2xl" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Content</label>
                            <ModernRichTextEditor content={content} onChange={setContent} placeholder="Write your content here..." />
                        </div>

                        <div className="flex justify-center pt-2">
                            <button
                                type="button"
                                onClick={handleCreate}
                                className="flex items-center gap-2 rounded-full border border-gray-900 px-6 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-green-600 hover:text-white cursor-pointer"
                            >
                                Create Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
