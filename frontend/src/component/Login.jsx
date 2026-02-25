import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import API from '../../axiosInstance';

const Login = () => {

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handelLoginForm = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/api/user/login', userLogin);
      localStorage.setItem("token", res.data.token);
      alert("Login Successfully");
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }

    setUserLogin({
      email: '',
      password: ''
    });
  };

  const handelOnChange = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">

      <div className="bg-gray-900 shadow-2xl rounded-2xl p-10 w-[400px] border border-gray-700">

        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handelLoginForm} className="space-y-6">

          <input
            type="email"
            name="email"
            value={userLogin.email}
            placeholder="Email Address"
            onChange={handelOnChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={userLogin.password}
              placeholder="Password"
              onChange={handelOnChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-400 cursor-pointer text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition duration-300"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link to="/" className="text-white hover:underline">
            Register
          </Link>
        </p>

      </div>

    </div>
  )
}

export default Login