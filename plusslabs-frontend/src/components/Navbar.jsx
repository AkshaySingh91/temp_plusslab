import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
const api_url = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const defaultAvatar = "https://ui-avatars.com/api/?name=" + (user?.name || "User");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${api_url}/api/auth/profile`, { withCredentials: true });
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
      await axios.get(`${api_url}/api/auth/logout`, { withCredentials: true });
      setUser(null);
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleNavigation = (path, section) => {
    if (location.pathname !== '/') {
      // If not on home page, first navigate to home
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        scrollToSection(section);
      }, 100);
    } else {
      // If already on home page, just scroll
      scrollToSection(section);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='h-[70px] flex justify-between items-center px-4 md:px-8 bg-[#191c1e] text-white relative'>
      {/* Logo */}
      {/* <div className='text-lg font-bold cursor-pointer' onClick={() => navigate('/')}>
        <img src="/assets/logo.jpeg" alt="logo" />
        PLUSSLABS
      </div> */}
      <div className="text-lg font-bold cursor-pointer flex items-center gap-3" onClick={() => navigate('/')}>
          <img
            src="/assets/logo.jpeg"
            alt="Logo"
            className="w-10 h-10 rounded-full"
          />

          <div className="text-lg font-bold font-sans">PlussLabs</div>
        </div>

      {/* Hamburger Button (Visible on Small Screens) */}
     

      {/* Navigation Links (Desktop) */}
      <div className='gap-10 font-semibold justify-between hidden lg:flex'>
        <button 
          onClick={() => handleNavigation('/', 'services')} 
          className='hover:text-gray-300 cursor-pointer'
        >
          Services
        </button>
        <button 
          onClick={() => handleNavigation('/', 'featured-health-packages')} 
          className='hover:text-gray-300 cursor-pointer'
        >
          Packages
        </button>
        <button 
          onClick={() => handleNavigation('/', 'concern-health-checkups')} 
          className='hover:text-gray-300 cursor-pointer'
        >
          HealthCare Services
        </button>
        <button 
          onClick={() => handleNavigation('/', 'why-choose-us')} 
          className='hover:text-gray-300 cursor-pointer'
        >
          Why Us
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='absolute top-16 left-0 w-full bg-[#191c1e] p-4 flex z-[9999] flex-col items-center gap-4 lg:hidden'>
          <button onClick={() => handleNavigation('/', 'services')}>Services</button>
          <button onClick={() => handleNavigation('/', 'featured-health-packages')}>Packages</button>
          <button onClick={() => handleNavigation('/', 'concern-health-checkups')}>HealthCare Services</button>
          <button onClick={() => handleNavigation('/', 'why-choose-us')}>Why Us</button>
        </div>
      )}

      {/* User Profile & Authentication Links */}
      <div className='relative' ref={dropdownRef}>
        {user ? (
          <>
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className='flex items-center gap-2 hover:opacity-80'
            >
              <img 
                src={user.avatar || defaultAvatar} 
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = defaultAvatar;
                }}
              />
              <span className='hidden md:block'>{user.name}</span>
              <i className="fa-solid fa-circle-chevron-down mt-1"></i>
            </button>
            
            {showDropdown && (
              <div className='absolute -right-4 mt-2 w-48 bg-[#fff1ee] rounded-md shadow-lg py-1 z-50'>
                {/* Remove membership button and only show dashboard buttons */}
                {(user.role === 'admin' || user.role === 'superadmin') && (
                  <button 
                    onClick={() => {
                      navigate('/dashboard');
                      setShowDropdown(false);
                    }}
                    className='block w-full text-center px-4 py-2 text-gray-700 font-semibold hover:bg-gray-200'
                  >
                    <i className="fa-solid fa-gauge mr-2"></i> Dashboard
                  </button>
                )}

                {/* Super Admin only section */}
                {user.role === 'superadmin' && (
                  <button 
                    onClick={() => {
                      navigate('/super-admin');
                      setShowDropdown(false);
                    }}
                    className='block w-full text-center px-4 py-2 text-gray-700 font-semibold hover:bg-gray-200'
                  >
                    <i className="fa-solid fa-user-shield mr-2"></i> User Management
                  </button>
                )}

                {/* Logout Button */}
                <button 
                  onClick={handleLogout}
                  className='block w-full text-center px-4 py-2 text-gray-700 font-semibold hover:bg-gray-200 border-t'
                >
                  <i className="fa-solid fa-right-from-bracket mr-2"></i> Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <div className='hidden md:flex gap-4'>
            <Link to="/signup" className='hover:bg-gray-300 md:w-[100px] text-center border-2 p-2 rounded-md bg-white text-black font-semibold'>
              Signup <i className="fa-solid fa-user-plus ml-1"></i>
            </Link>
            <Link to="/login" className='hover:bg-gray-300 border-2 p-2 md:w-[100px] text-center rounded-md bg-white text-black font-semibold'>
              Login <i className="fa-solid fa-right-to-bracket ml-1"></i>
            </Link>
          </div>
        )}
      </div>
      <button 
        className='lg:hidden text-white text-2xl' 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </button>
    </div>
  );
};

export default Navbar;
