import React,{useState} from 'react'
// import supabase from '../../config/supabase.js'

const Register = () => {
  const [UserData,setUserData] = useState({
    email: "",
    password: "",
  })

  const handleFormSubmit = (e)=>{
    e.preventDefault();

  }
  return (
   <div className="">
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Sign Up</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={UserData.email}
              onChange={(e) => setUserData({ ...UserData, email: e.target.value })}
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-[#5B76F7]"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={UserData.password}
              onChange={(e) => setUserData({ ...UserData, password: e.target.value })}
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-[#5B76F7]"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#5B76F7] text-white py-3 rounded hover:bg-[#4a63d1] transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
   </div>
  )
}

export default Register