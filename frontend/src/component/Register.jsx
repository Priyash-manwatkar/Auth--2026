import React, { useState } from 'react'
import API from '../../axiosInstance'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate();

  const [registerUser, setRegisteruser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handelOnChange = (e) => {
    setRegisteruser({
      ...registerUser,
      [e.target.name]: e.target.value
    })
  }

  const handelFromSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/user/register', registerUser);
      alert("User Registered Successfully");
      navigate('/login')
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }

    setRegisteruser({
      name: '',
      email: '',
      password: ''
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="bg-gray-900 shadow-2xl rounded-2xl p-10 w-[400px] border border-gray-700">

        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Create Account
        </h2>

        <form onSubmit={handelFromSubmit} className="space-y-6">

          <input
            type="text"
            name="name"
            value={registerUser.name}
            placeholder="Full Name"
            onChange={handelOnChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <input
            type="email"
            name="email"
            value={registerUser.email}
            placeholder="Email Address"
            onChange={handelOnChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <input
            type="password"
            name="password"
            value={registerUser.password}
            placeholder="Password"
            onChange={handelOnChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition duration-300"
          >
            Register
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Register