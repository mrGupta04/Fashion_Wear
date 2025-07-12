import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';



const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
            if (response.data.success) {
                setToken(response.data.token);
                toast.success('Welcome back! Redirecting...');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-fuchsia-50 to-rose-50">
            <div className="relative w-full max-w-md px-6 py-8">
                {/* Fashion-themed decorative elements */}
                <div className="absolute -top-16 -left-16 w-32 h-32 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/4 right-12 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                    {/* Fashion header with logo */}
                    <div className="bg-gradient-to-r from-fuchsia-600 to-rose-600 p-6 text-center">
                       
                        
                        {/* Option 2: Text Logo with stylish typography */}
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl font-bold text-white font-serif tracking-wider">
                                FASHION WEAR
                            </h1>
                            <div className="w-16 h-1 bg-rose-200 my-2"></div>
                            <p className="text-rose-100 text-sm font-light">Admin Portal</p>
                        </div>
                    </div>
                    
                    <div className="px-8 py-8">
                        <form onSubmit={onSubmitHandler}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <FiMail className="mr-2" />
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all"
                                        type="email"
                                        placeholder="your@email.com"
                                        required
                                    />
                                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                    <FiLock className="mr-2" />
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent outline-none transition-all"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                            </div>
                            
                            <button
                                className={`w-full py-3 px-4 rounded-lg text-white bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-700 hover:to-rose-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 transition-all flex items-center justify-center ${isLoading ? 'opacity-75' : ''}`}
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : 'Login'}
                            </button>
                        </form>
                        
                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>Elevating style, empowering admins</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;