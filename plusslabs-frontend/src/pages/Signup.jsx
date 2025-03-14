import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signup', 
        formData
      );
      
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Signup</h1>
      
      {success && (
        <div className='mb-4 p-3 bg-green-100 text-green-700 rounded-md max-w-sm w-full text-center'>
          Signup successful! Redirecting to login...
        </div>
      )}
      
      {error && (
        <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md max-w-sm w-full text-center'>
          {error}
        </div>
      )}

      <form className='bg-white p-6 rounded shadow-md w-full max-w-sm' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Name</label>
          <input
            type='text'
            name='name'
            className='w-full p-2 border border-gray-300 rounded mt-1'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input
            type='email'
            name='email'
            className='w-full p-2 border border-gray-300 rounded mt-1'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Password</label>
          <input
            type='password'
            name='password'
            className='w-full p-2 border border-gray-300 rounded mt-1'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded mb-4'>
          Signup
        </button>
        <button 
          type='button' 
          onClick={handleGoogleSignup}
          className='w-full bg-white text-gray-700 border border-gray-300 p-2 rounded flex items-center justify-center gap-2'
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign up with Google
        </button>
      </form>
      <p className='mt-4'>
        Already have an account? <Link to='/login' className='text-blue-500'>Login</Link>
      </p>
    </div>
  );
};

export default Signup;