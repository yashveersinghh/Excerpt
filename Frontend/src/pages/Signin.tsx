import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

export const Signin = () => {
    const navigate = useNavigate()
    return (
        <div className="bg-white md:bg-neutral-300 min-h-screen w-screen flex justify-center items-center px-4 py-8">
            <div className="bg-white w-full max-w-md rounded-lg md:shadow-2xl flex flex-col gap-6 p-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl sm:text-4xl md:text-5xl font-semibold">Welcome back.</h1>
                    <p className="text-gray-600 text-sm md:text-base">Sign in to continue sharing your thoughts with the world</p>
                </div>

                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        const token = credentialResponse?.credential
                        if (!token) {
                            console.error('No credential returned in response', credentialResponse)
                            return
                        }
                        try {
                            const decoded = jwtDecode(token)
                            console.log(decoded)
                        } catch (err) {
                            console.error('Failed to decode credential', err)
                        }
                        navigate('/')
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    auto_select={false}
                    text="signin_with"
                    shape="pill"
                />

                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 text-sm font-medium">Or continue with email</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700">Your email</label>
                        <input 
                            className="bg-white border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition" 
                            type="text" 
                            placeholder="Enter your email address" 
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <input 
                            className="bg-white border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition" 
                            type="password" 
                            placeholder="Enter your password" 
                        />
                    </div>
                    <button className="bg-black hover:bg-gray-900 cursor-pointer text-white py-3 px-4 rounded-lg text-base font-medium transition mt-2 w-full">
                        Continue
                    </button>
                </div>

                <div className="text-center text-sm text-gray-600">
                    No account? <span className="text-black font-medium cursor-pointer hover:underline" onClick={() => navigate('/signup')}>Sign up</span>
                </div>
            </div>
        </div>
    )
}