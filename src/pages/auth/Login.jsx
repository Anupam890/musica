import React, {useState,useContext} from 'react';
import { FaGoogle, FaFacebook } from "react-icons/fa";
import {Link,useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";
import {AuthContext} from "../../context/AuthContext.jsx";

const Login = () => {
    const [LoginData, setLoginData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { login, loginWithGoogle, error, loading } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(LoginData.email, LoginData.password);

        if (!error) {
            toast.success("Login successful!");
            navigate("/music/search");
        } else {
            toast.error(error);
        }
    };

    const handleGoogleLogin = async () => {
        await loginWithGoogle();

    };
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">

            <div className="lg:w-1/2 w-full bg-[#1E2939] flex items-center justify-center p-8">
                <div className="text-center text-white">
                    {/*<img*/}
                    {/*    src="/your-avatar.png" // Replace with your avatar image path*/}
                    {/*    alt="music avatar"*/}
                    {/*    className="mx-auto mb-6 w-40 md:w-52"*/}
                    {/*/>*/}
                    <h1 className="text-2xl md:text-3xl font-bold">All Your Music.</h1>
                    <p className="mt-2 text-base md:text-lg italic text-gray-300">Anytime, anywhere.</p>
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-12">
                <div className="w-full max-w-md">

                    <div className="flex justify-end mb-4">
                        <p className="text-sm text-gray-600">
                            Don’t have an account?{" "}
                            <button className="ml-2 px-4 py-1 border cursor-pointer border-gray-400 text-sm rounded-full hover:bg-gray-100">
                              <Link to={"/sign-up"} >
                                  Sign Up
                              </Link>
                            </button>
                        </p>
                    </div>
                    <h2 className="text-2xl font-semibold text-[#101828] mb-1">Welcome Back.</h2>
                    <p className="text-sm text-gray-500 mb-6">Log in with your email address.</p>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={LoginData.email}
                            onChange={(e) => setLoginData({...LoginData, email: e.target.value})}
                            className="w-full px-4 py-3 text-black text-center font-bold rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B76F7]"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={LoginData.password}
                            onChange={(e) => setLoginData({...LoginData, password: e.target.value})}
                            className="w-full px-4 py-3 text-black text-center font-bold rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B76F7]"
                        />
                        <button
                            type="submit"
                            className="w-full  cursor-pointer bg-[#5B76F7] text-white font-medium py-3 rounded-full hover:bg-blue-600 transition"
                        >
                            Continue
                        </button>
                    </form>

                    <p className="text-xs text-center text-gray-500 mt-4">
                        By selecting 'Continue', you agree to Musica’s{" "}
                        <a href="#" className="text-[#5B76F7] underline">Terms of Service</a> and{" "}
                        <a href="#" className="text-[#5B76F7] underline">Privacy Policy</a>.
                    </p>

                    <div className="my-6 flex items-center">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-sm text-gray-500">OR CONTINUE WITH</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="w-full cursor-pointer flex items-center justify-center gap-2 bg-[#1E2939] text-white py-2 rounded-full" onClick={handleGoogleLogin}>
                            <FaGoogle size={19} color={"#fff"} />
                            Google
                        </button>
                        <button className="w-full cursor-pointer flex items-center justify-center gap-2 bg-[#5B76F7] text-white py-2 rounded-full">
                            <FaFacebook size={19} color={"#fff"} />
                            Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
