import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useState } from "react";
import { toast } from "react-hot-toast/headless";
import { BACKEND_URL } from "../config";
import axios, { AxiosError } from "axios";

export const Signin = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [inputData, setInputData] = useState({
        email: "",
        password: ""
    });
    const [validationErrors, setValidationErrors] = useState({
        email: false,
        password: false
    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const missingEmail = !inputData.email.trim();
        const missingPassword = !inputData.password.trim();
        setValidationErrors({
            email: missingEmail,
            password: missingPassword
        });
        if (missingEmail || missingPassword) {
            toast.error("Please fill in all fields.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                email: inputData.email,
                password: inputData.password
            });
            const jwt = response.data.jwt;
            localStorage.setItem("token", jwt);
            toast.success("Signed in successfully!");
            navigate("/");
        } catch (err) {
            const axiosError = err as AxiosError<{ error: string }>;
            const errMsg = axiosError.response?.data?.error || "Sign-in failed. Please try again.";
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
};
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
                            toast.error("Google sign-in failed. Please try again.")
                            return
                        }
                        try {
                            const decoded = jwtDecode(token)
                            console.log(decoded)
                            toast.success("Signed in successfully!")
                        } catch (err) {
                            console.error('Failed to decode credential', err)
                            toast.error("Google sign-in failed. Please try again.")
                        }
                        navigate('/')
                    }}
                    onError={() => {
                        console.log('Login Failed');
                        toast.error("Google sign-in failed. Please try again.")
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
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Your email</label>
                            <input 
                                className="bg-white border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition" 
                                type="text" 
                                placeholder="Enter your email address"
                                value={inputData.email}
                                onChange={(e) => {
                                    setInputData({ ...inputData, email: e.target.value });
                                    if (validationErrors.email) setValidationErrors({ ...validationErrors, email: false });
                                }}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <input 
                                className="bg-white border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition" 
                                type="password" 
                                placeholder="Enter your password" 
                                value={inputData.password}
                                onChange={(e) => {
                                    setInputData({ ...inputData, password: e.target.value });
                                    if (validationErrors.password) setValidationErrors({ ...validationErrors, password: false });
                                }}
                                required
                            />
                        </div>
                        <button className="bg-black hover:bg-gray-900 cursor-pointer text-white py-3 px-4 rounded-lg text-base font-medium transition mt-2 w-full"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Log in"}
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm text-gray-600">
                    No account? <span className="text-black font-medium cursor-pointer hover:underline" onClick={() => navigate('/signup')}>Sign up</span>
                </div>
            </div>
        </div>
    )
}