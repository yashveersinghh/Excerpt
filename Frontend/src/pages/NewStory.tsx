import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegFileImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ModernRichTextEditor from "../components/ModernRichTextEditor";
import { Avatar } from "../components/Avatar";
import axios from 'axios';
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { textFromHtml } from "../utils/html";

export const NewStory = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        }
    }, [previewUrl])

    const handleCreate = async () => {
        if (submitting) return;

        if (!title.trim() || !summary.trim() || !textFromHtml(content)) {
            toast.error("Title, summary and content are required");
            return;
        }
        if (summary.trim().length > 280) {
            toast.error("Summary must be 280 characters or less");
            return;
        }
        if (!selectedFile) {
            toast.error("Cover image is required");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please sign in first");
            navigate("/signin");
            return;
        }

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
        if (!cloudName || !uploadPreset) {
            toast.error("Image upload is not configured");
            return;
        }

        setSubmitting(true);
        try {
            const fd = new FormData();
            fd.append("file", selectedFile);
            fd.append("upload_preset", uploadPreset);
            const uploadRes = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                fd,
                { timeout: 120_000 }
            );
            const imageUrl = uploadRes?.data?.secure_url as string | undefined;
            if (!imageUrl) {
                toast.error("Image upload failed — please try again");
                return;
            }

            await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                    title: title.trim(),
                    content,
                    summary: summary.trim(),
                    imageUrl,
                    publishedAt: new Date().toISOString(),
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Post created");
            navigate("/blog");
        } catch (err) {
            console.error("Create post failed", err);
            if (axios.isAxiosError(err)) {
                const status = err.response?.status;
                const data = err.response?.data as { error?: string; details?: string };
                if (status === 401) {
                    toast.error("Session expired — please sign in again");
                    navigate("/signin");
                    return;
                }
                const message = data?.error ?? "Failed to create post";
                toast.error(message);
                if (data?.details) console.error("Server details:", data.details);
                return;
            }
            toast.error("Failed to create post. Please try again.");
        } finally {
            setSubmitting(false);
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
                                <div className="w-full h-56 overflow-hidden rounded-lg border border-gray-200 bg-white mb-3 flex items-center justify-center">
                                    <img src={previewUrl} alt="preview" className="w-full h-full object-contain" />
                                </div>
                            ) : (
                                <div onClick={() => fileInputRef.current?.click()} className="rounded-lg border-2 border-dashed border-gray-300 p-6 flex items-center justify-center text-center text-gray-500 hover:border-gray-400 cursor-pointer">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="font-semibold">Drop image here or click to upload</div>
                                        <FaRegFileImage className="text-2xl" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Content</label>
                            <ModernRichTextEditor content={content} onChange={setContent} placeholder="Write your content here..." />
                        </div>

                        <div className="flex justify-center pt-2">
                            <button
                                type="button"
                                onClick={handleCreate}
                                disabled={submitting}
                                className="flex items-center gap-2 rounded-full border border-gray-900 px-6 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-green-600 hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? "Creating…" : "Create Post"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
