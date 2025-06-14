import React, { useState } from 'react';
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../config/supabase.js';

const Register = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error("Sign up error:", error.message);
        setErrorMsg(error.message);
        return;
      }

      await supabase.from('users').insert({ email: formData.email }).select();
      navigate('/login');
    } catch (err) {
      console.error("Unexpected error:", err.message);
      setErrorMsg('Something went wrong. Please try again later.');
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
      setErrorMsg('Google sign-in failed. Please try again.');
    }
  };

  return (
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left */}
        <div className="lg:w-1/2 w-full bg-[#1E2939] flex items-center justify-center p-8">
          <div className="text-center text-white">
            <h1 className="text-2xl md:text-3xl font-bold">All Your Music.</h1>
            <p className="mt-2 text-base md:text-lg italic text-gray-300">Anytime, anywhere.</p>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-12">
          <div className="w-full max-w-md">
            <div className="flex justify-end mb-4">
              <p className="text-sm text-gray-600">
                Already have an account?
                <Link to="/login">
                  <button className="ml-2 px-4 py-1 border border-gray-400 text-sm rounded-full hover:bg-gray-100">
                    Login
                  </button>
                </Link>
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-[#101828] mb-1">Welcome to Musica.</h2>
            <p className="text-sm text-gray-500 mb-6">Sign up with your email address.</p>

            {errorMsg && <p className="text-red-500 text-sm mb-3">{errorMsg}</p>}

            <form className="space-y-4" onSubmit={handleRegister}>
              <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-full border text-center font-bold text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B76F7]"
              />
              <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="w-full px-4 py-3 text-black text-center font-bold rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5B76F7]"
                />
                <span
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={togglePassword}
                >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
              </div>

              <button
                  type="submit"
                  className="w-full cursor-pointer bg-[#5B76F7] text-white font-medium py-3 rounded-full hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
            </form>

            <p className="text-xs text-center text-gray-500 mt-4">
              By selecting 'Sign Up', you agree to Musica’s{" "}
              <a href="#" className="text-[#5B76F7] underline">Terms of Service</a> and{" "}
              <a href="#" className="text-[#5B76F7] underline">Privacy Policy</a>.
            </p>

            <div className="my-6 flex items-center">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-sm text-gray-500">OR CONTINUE WITH</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2 bg-[#1E2939] text-white py-2 rounded-full"
              >
                <FaGoogle size={19} />
                Google
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-[#5B76F7] text-white py-2 rounded-full">
                <FaFacebook size={19} />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Register;
