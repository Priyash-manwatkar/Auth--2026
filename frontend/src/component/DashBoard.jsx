import React, { useEffect, useState } from "react";
import API from "../../axiosInstance";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await API.get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(res.data);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-6">
      {/* Header */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Dashboard</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition duration-300"
        >
          Logout
        </button>
      </div>

      {/* User List Card */}
      <div className="w-full max-w-4xl bg-gray-900 shadow-xl rounded-2xl p-6 border border-gray-700">
        {userData.length === 0 ? (
          <p className="text-gray-400 text-center">No users found.</p>
        ) : (
          <ul className="space-y-4">
            {userData.map((user, index) => (
              <li
                key={index}
                className="flex justify-between bg-gray-800 text-white p-4 rounded-lg border border-gray-700 hover:bg-gray-700 transition duration-300"
              >
                <span>{user.name}</span>
                <span className="text-gray-300">{user.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashBoard;