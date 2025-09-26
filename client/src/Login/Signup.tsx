import React, { useState } from 'react';
import axios, { type AxiosResponse } from 'axios';
import { useNavigate } from 'react-router';

interface SignupResponse {
  id: string;
  name: string;
  email: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    try {
      const res: AxiosResponse<SignupResponse>= await axios.post("https://localhost:3001/auth/signup",
        {name,
        email,
        password});
      
        console.log("User created:", res.data);
        setSuccess(`Account created for ${res.data.name}! Log in to access the dashboard.`)
        
        navigate('/dashboard')
    } catch (err:any) {
      console.error(err);
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create an Account ✨
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
      {error && <p style={{color: "red"}}>{error}</p>}
      {success && <p style={{color: "green"}}>{success}</p>}
    </div>
  );
};

export default Signup;
