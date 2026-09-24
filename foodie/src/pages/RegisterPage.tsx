import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types/auth';

export default function RegisterPage(): React.JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('CUSTOMER');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await registerApi({ name, email, mobile, password, role });
      login(data);
      if (data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create your Account</h2>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
              type="text"
              required
              maxLength={10}
              placeholder="10 digit mobile"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Role</label>
            <select
              className="w-full border p-2 rounded focus:ring-2 focus:ring-orange-500 outline-none bg-white"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
            >
              <option value="CUSTOMER">Customer (Order Food)</option>
              <option value="ADMIN">Admin (Manage Portal)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded font-semibold hover:bg-orange-700 transition"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already registered?{' '}
          <Link to="/login" className="text-orange-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}