import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', 
        { email, password },
        { withCredentials: true }
      );
      
      if (response.data.success) {
        navigate('/');
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setError('User does not exist. Please signup first.');
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
      {error && (
        <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md max-w-sm w-full text-center'>
          {error}
          {error.includes('Please signup') && (
            <Link to="/signup" className='block mt-2 text-blue-600 hover:underline'>
              Go to Signup
            </Link>
          )}
        </div>
      )}
      <form className='bg-white p-6 rounded shadow-md w-full max-w-sm' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input
            type='email'
            className='w-full p-2 border border-gray-300 rounded mt-1'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Password</label>
          <input
            type='password'
            className='w-full p-2 border border-gray-300 rounded mt-1'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded mb-4'>Login</button>
        <button 
          type='button' 
          onClick={handleGoogleLogin}
          className='w-full bg-white text-gray-700 border border-gray-300 p-2 rounded flex items-center justify-center gap-2'
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
      </form>
      <p className='mt-4'>
        Don't have an account? <Link to='/signup' className='text-blue-500'>Signup</Link>
      </p>
    </div>
  );
};

export default Login;