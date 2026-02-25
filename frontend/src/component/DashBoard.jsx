import React, { useEffect, useState } from 'react'
import API from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {

  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  // 🔐 Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  useEffect(() => {

    const token = localStorage.getItem("token");

    // 🚫 If no token → redirect to login
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await API.get('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData(res.data);
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };

    fetchUsers();

  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* Top Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Welcome Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-gray-800 hover:bg-red-600 transition duration-300 rounded-lg border border-gray-600"
        >
          Logout
        </button>
      </div>

      {/* Table Card */}
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6">

        <table className="w-full text-left border-collapse">

          <thead>
            <tr className="border-b border-gray-700 text-gray-400 uppercase text-sm">
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Name</th>
            </tr>
          </thead>

          <tbody>
            {userData.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-800 hover:bg-gray-800 transition duration-200"
              >
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.name}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  )
}

export default DashBoard;