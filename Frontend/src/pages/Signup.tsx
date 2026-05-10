import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";

export const Signup = () => {
    const [loading, setLoading] = useState(false);
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
            navigate("/");
        } catch (err) {
            const axiosError = err as AxiosError<{ error: string }>;
            const errMsg = axiosError.response?.data?.error || "Signup failed. Please try again.";
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
};
    return (
        <div className="bg-white md:bg-neutral-300 min-h-screen w-screen flex justify-center items-center px-4 py-8">
            <div className="bg-white w-full max-w-md rounded-lg md:shadow-2xl flex flex-col gap-6 p-8">
                <div className="flex flex-col gap-2">
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
                        navigate('/')
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
                            <input 
                                className={`bg-white border ${validationErrors.password ? 'border-red-500' : 'border-gray-300'} p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition`}
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