import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/profile', { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/api/auth/logout', { withCredentials: true });
      setUser(null);
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='h-[50px] flex justify-between items-center px-4 bg-gray-800 text-white'>
      <div className='text-lg font-bold cursor-pointer' onClick={() => navigate('/')}>PLUSSLABS</div>
      <div className='relative' ref={dropdownRef}>
        {user ? (
          <>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className='flex items-center gap-2 hover:opacity-80'
            >
              <img 
                src={user.avatar || 'https://via.placeholder.com/32'} 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
              <span>{user.name}</span>
            </button>
            {showDropdown && (
              <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50'>
                {/* Show Dashboard only for admin */}
                {user.role === 'admin' && (
                  <button 
                    onClick={() => {
                      navigate('/dashboard');
                      setShowDropdown(false);
                    }}
                    className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                  >
                    Dashboard
                  </button>
                )}
                <button 
                  onClick={handleLogout}
                  className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <div>
            <Link to="/signup" className='mr-4 hover:text-gray-300'>Signup</Link>
            <Link to="/login" className='hover:text-gray-300'>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;