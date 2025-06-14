import React, { useState } from 'react';
import { FaGoogle,FaFacebook  } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {
  const [isLogin, setIsLogin] = useState(true);

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
                Already have an account?{" "}
                <button className="ml-2 px-4 py-1 border border-gray-400 text-sm rounded-full hover:bg-gray-100">
                 <Link to={"/login"}>
                    Login
                 </Link>
                </button>
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-[#101828] mb-1">Welcome to Musica.</h2>
            <p className="text-sm text-gray-500 mb-6">Sign up with your email address.</p>
            <form className="space-y-4">
              <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-full border text-center font-bold text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B76F7]"
              />
              <input
                  type="password"
                  placeholder="Password"
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
              <button className="w-full flex cursor-pointer items-center justify-center gap-2 bg-[#1E2939] text-white py-2 rounded-full">
                <FaGoogle size={19} color={"#fff"}/>
                Google</button>
              <button className="w-full flex cursor-pointer items-center justify-center gap-2 bg-[#5B76F7] text-white py-2 rounded-full">
                <FaFacebook size={19} color={"#fff"}/>
                Facebook</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Register;
