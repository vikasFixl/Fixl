import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '../store/UseAuthStore';
import useAttendanceStore from '../store/UseAttendenceStore';

export default function AdminUsersPage() {
  const { users,isloading } = useAuthStore();
  const {error}=useAttendanceStore();
  
  console.log(users);
  const navigate = useNavigate();



 

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">👥 All Users</h2>

        {isloading&& (
          <div className="text-center py-4">
            <svg
              className="animate-spin h-8 w-8 text-white mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          </div>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {!isloading && !error && users?.length === 0 && (
          <p className="text-gray-400">No users found.</p>
        )}

        {!isloading && !error && (
          <ul className="space-y-3">
            {users.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center bg-gray-700 hover:bg-gray-600 p-3 rounded cursor-pointer transition"
                onClick={() => navigate(`/admin/user/${user._id}`)}
              >
                <span>{user.name}</span>
                <span className="text-gray-400 text-sm">{user.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
