import { AiOutlineSearch } from "react-icons/ai"

export const Search = ({ className = "" }: { className?: string }) => {
    const containerClass = `w-full ${className}`.trim();
    return (
        <div className={containerClass}>
            <div className="relative">
                <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none" />
                <input
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    className="pl-9 pr-4 py-2 h-9 w-full bg-gray-100 rounded-full border border-gray-200 text-sm text-black focus:outline-none"
                />
            </div>
        </div>
    )
}