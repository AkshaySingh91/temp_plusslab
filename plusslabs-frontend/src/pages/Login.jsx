import React from 'react';

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
      <form className='bg-white p-6 rounded shadow-md w-full max-w-sm'>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input type='email' className='w-full p-2 border border-gray-300 rounded mt-1' />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Password</label>
          <input type='password' className='w-full p-2 border border-gray-300 rounded mt-1' />
        </div>
        <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded'>Login</button>
      </form>
    </div>
  );
}

export default Login;