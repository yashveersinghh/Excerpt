export const Hero = () => {
    return (
        <div className="flex items-center flex-1 min-h-0 overflow-hidden">
            <div className="flex flex-col items-start justify-center gap-6 flex-1 min-w-0 px-20 pl-40">
                <div className="medium-heading-font flex flex-col text-9xl leading-none tracking-tighter font-semibold">
                    <span>Think.</span>
                    <span>Write. Share.</span>
                </div>
                <div className="text-xl text-black pt-8">A simple place to express ideas and explore new ones</div>
                <button className="bg-black text-white py-3 px-10 mt-8 rounded-full text-lg cursor-pointer">Start reading</button>
            </div>
            {/* <img className="w-1/3 max-h-full object-contain shrink-0" src="/Home.png" alt="" /> */}
            <video autoPlay loop muted playsInline className="w-1/3 scale-140 origin-right max-h-full object-contain shrink-0" src="/home.mp4"></video>
        </div>
    )
}