import { useNavigate } from "react-router-dom"
export const Hero = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col lg:flex-row items-center flex-1 min-h-0 overflow-hidden">
            <div className="flex flex-col items-start justify-center gap-4 md:gap-6 flex-1 min-w-0 px-4 sm:px-8 md:px-10 lg:px-20 xl:pl-40 py-6 md:py-0">
                <div className="medium-heading-font flex flex-col text-8xl sm:text-6xl md:text-7xl xl:text-8xl 2xl:text-9xl leading-none tracking-tighter font-semibold">
                    <span>Think.</span>
                    <span>Write. Share.</span>
                </div>
                <div className="max-w-md text-xl sm:text-lg md:text-xl text-black pt-2 md:pt-8">
                    A simple place to express ideas and explore new ones
                </div>
                <button className="bg-black text-white py-3 px-8 md:px-10 mt-4 md:mt-8 rounded-full text-xl sm:text-base md:text-lg cursor-pointer" onClick={() => navigate('/signup')}>
                    Start reading
                </button>
            </div>
            <video
                autoPlay
                loop
                muted
                playsInline
                className="hidden lg:block w-[38%] xl:w-1/3 scale-110 xl:scale-125 origin-right max-h-full object-contain shrink-0"
                src="/home.mp4"
            ></video>
        </div>
    )
}