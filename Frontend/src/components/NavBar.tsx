export const NavBar = () => {
    return (
        <div className="h-20 flex items-center justify-between px-40 border-b">
            <div className="medium-heading-font text-3xl font-semibold">Excerpt</div>
            <div className="font-sm flex justify-between items-center gap-8">
                <div className="text-md cursor-pointer">Github</div>
                <div className="text-md cursor-pointer">Sign in</div>
                <button className="bg-black cursor-pointer text-white py-1.5 px-3 rounded-3xl">Get Started</button>
            </div>
        </div>
    )
}