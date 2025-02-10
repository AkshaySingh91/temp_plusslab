import React from 'react'

const Navbar = () => {
  return (
    <div className='h-[50px] flex justify-between items-center px-4 bg-gray-800 text-white'>
      <div className='text-lg font-bold'>CALL ME</div>
      <div>
        <a href="/signup" className='mr-4'>Signup</a>
        <a href="/login">Login</a>
      </div>
    </div>
  )
}

export default Navbar