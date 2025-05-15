import { useState } from 'react';
import useAuthStore from '../store/UseAuthStore';

const SignupPage = () => {
  const { register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(formData);
    if (success) {
      // Optional: reset form or redirect after successful registration
      setFormData({ name: '', email: '', password: '', role: 'user' });
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-gray-800 rounded-lg text-white">
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        type="email"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
      />
      <input
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        type="password"
        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-700 border border-gray-600"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 rounded font-semibold ${
          isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isLoading ? 'Registering...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignupPage;
