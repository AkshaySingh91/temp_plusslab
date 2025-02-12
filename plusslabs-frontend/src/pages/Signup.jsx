import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', { name, email, password });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Signup</h1>
      <form className='bg-white p-6 rounded shadow-md w-full max-w-sm' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Name</label>
          <input
            type='text'
            className='w-full p-2 border border-gray-300 rounded mt-1'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded'>Signup</button>
      </form>
      <p className='mt-4'>
        Already have an account? <Link to='/login' className='text-blue-500'>Login</Link>
      </p>
    </div>
  );
};

export default Signup;