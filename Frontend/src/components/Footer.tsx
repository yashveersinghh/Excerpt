import { FaXTwitter } from "react-icons/fa6";
import { FiGithub } from "react-icons/fi";
import { FiLinkedin } from "react-icons/fi";

export const Footer = () =>{
    return (
        <div className="h-15 bg-neutral-100 flex items-center justify-between border-t border-gray-300">
            <div className="flex items-center gap-3 md:gap-6 pl-6 md:pl-38">
                <a 
                    href="https://github.com/yashveersinghh" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center cursor-pointer gap-1">
                        <FiGithub />
                        <span className="hidden sm:inline">GitHub</span>
                </a>
                <a 
                    href="https://twitter.com/Yashveer_tw" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center cursor-pointer gap-1">
                        <FaXTwitter /> 
                        <span className="hidden sm:inline">Twitter</span>
                </a>
                <a 
                    href="https://www.linkedin.com/in/yashveer-singhh" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center cursor-pointer gap-1">
                        <FiLinkedin /> 
                        <span className="hidden sm:inline">LinkedIn</span>
                </a>
            </div>
            <div className="text-xs text-gray-500 hover:text-gray-700 pr-6 md:pr-30">© 2026 Excerpt. All rights reserved.</div>
        </div>
    )
}