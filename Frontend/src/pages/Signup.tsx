import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";
import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [validationErrors, setValidationErrors] = useState({
        name: false,
        email: false,
        password: false
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const missingName = !inputData.name.trim();
        const missingEmail = !inputData.email.trim();
        const missingPassword = !inputData.password.trim();
        setValidationErrors({
            name: missingName,
            email: missingEmail,
            password: missingPassword
        });
        if (missingName || missingEmail || missingPassword) {
            toast.error("Please fill in all fields.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                name: inputData.name,
                email: inputData.email,
                password: inputData.password
            });
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            toast.success("Account created successfully!");
            navigate("/blog");
        } catch (err) {
            const axiosError = err as AxiosError<{ error: string }>;
            const errMsg = axiosError.response?.data?.error || "Signup failed. Please try again.";
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
};
    return (
        <div className="bg-neutral-50 md:bg-neutral-300 min-h-screen w-screen flex justify-center items-center px-4 py-8">
            <div className="bg-neutral-50 w-full max-w-md rounded-lg md:shadow-2xl flex flex-col gap-6 p-8 relative">
                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        aria-label="Close and go home"
                        onClick={() => navigate('/')}
                        className="absolute top-4 right-4 max-sm:hidden inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800 hover:bg-gray-100 focus:outline-none"
                    >
                        <AiOutlineClose className="w-4 h-4" />
                    </button>
                    <h1 className="text-4xl sm:text-4xl md:text-5xl font-semibold">Join Excerpt.</h1>
                    <p className="text-gray-600 text-sm md:text-base">Start sharing your thoughts with the world</p>
                </div>

                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(credentialResponse);
                        const token = credentialResponse?.credential
                        if (!token) {
                            console.error('No credential returned in response', credentialResponse)
                            toast.error("Google signup failed. Please try again.");
                            return
                        }
                        try {
                            const decoded = jwtDecode(token)
                            console.log(decoded)
                            toast.success("Google signup successful!");
                        } catch (err) {
                            console.error('Failed to decode credential', err)
                            toast.error("Google signup failed. Please try again.");
                        }
                        navigate('/blog')
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    auto_select={false}
                    text="signup_with"
                    shape="pill"
                />

                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-gray-500 text-sm font-medium">Or continue with email</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input 
                                className={`bg-white border ${validationErrors.name ? 'border-red-500' : 'border-gray-300'} p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition`}
                                type="text" 
                                placeholder="Enter your full name" 
                                value={inputData.name}
                                onChange={(e) => {
                                    setInputData({ ...inputData, name: e.target.value });
                                    if (validationErrors.name) setValidationErrors({ ...validationErrors, name: false });
                                }}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input 
                                className={`bg-white border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition`}
                                type="email" 
                                placeholder="Enter your email address" 
                                value={inputData.email}
                                onChange={(e) => {
                                    setInputData({...inputData, email: e.target.value});
                                    if (validationErrors.email) setValidationErrors({ ...validationErrors, email: false });
                                }}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input 
                                    className={`bg-white border ${validationErrors.password ? 'border-red-500' : 'border-gray-300'} p-3 pr-12 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition`}
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter your password" 
                                    value={inputData.password}
                                    onChange={(e) => {
                                    setInputData({ ...inputData, password: e.target.value });
                                        if (validationErrors.password) setValidationErrors({ ...validationErrors, password: false });
                                    }}
                                    required
                                />
                                <button 
                                    type="button" 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible className="w-5 h-5" />
                                    ) : (
                                        <AiOutlineEye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button className="bg-black hover:bg-gray-900 disabled:opacity-60 cursor-pointer text-white py-3 px-4 rounded-lg text-base font-medium transition mt-2 w-full"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm text-gray-600">
                    Already have an account? <span className="text-black font-medium cursor-pointer hover:underline" onClick={() => navigate('/signin')}>Sign in</span>
                </div>
            </div>
        </div>
    )
}