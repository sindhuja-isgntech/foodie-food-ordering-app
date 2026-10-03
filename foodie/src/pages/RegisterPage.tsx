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
    <div className="flex min-h-[60vh] w-full items-center justify-center bg-[#fbf8f4] px-3 py-10 sm:p-6">
      <div className="w-full max-w-md rounded-2xl border border-stone-200/80 bg-white p-5 shadow-lg shadow-stone-900/5 sm:p-8">
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-orange-700">Join Foodie</p>
        <h2 className="mb-6 text-center text-2xl font-bold tracking-tight text-stone-900">Create your account</h2>

        {error && <div className="mb-4 rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">Full name</label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-500/15"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">Email address</label>
            <input
              type="email"
              required
              className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-500/15"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">Mobile number</label>
            <input
              type="text"
              required
              maxLength={10}
              placeholder="10 digit mobile"
              className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-500/15"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">Password</label>
            <input
              type="password"
              required
              className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-500/15"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">Account role</label>
            <select
              className="w-full rounded-lg border border-stone-200 bg-stone-50/50 px-3 py-2.5 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-500/15"
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
            className="w-full rounded-lg bg-orange-600 py-3 font-semibold text-white shadow-sm shadow-orange-900/15 transition hover:bg-orange-700 disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-stone-600">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-orange-700 hover:text-orange-800 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}