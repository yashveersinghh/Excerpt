export const NavBar = () => {
    return (
        <div className="h-20 md:h-20 flex items-center justify-between px-4 sm:px-8 md:px-10 lg:px-24 xl:px-40 border-b">
            <div className="medium-heading-font text-3xl sm:text-3xl font-semibold">Excerpt</div>
            <div className="font-sm flex items-center gap-3 md:gap-8 text-sm md:text-base">
                <a className="hidden sm:block cursor-pointer" href="https://github.com/yashveersinghh/Excerpt.git">Github</a>
                <div className="hidden sm:block cursor-pointer">Sign in</div>
                <button className="bg-black cursor-pointer text-white py-1.5 px-3 rounded-3xl text-sm sm:text-sm md:text-base">Get Started</button>
            </div>
        </div>
    )
}