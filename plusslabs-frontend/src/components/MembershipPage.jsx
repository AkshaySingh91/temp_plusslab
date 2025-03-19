import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const MembershipPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/profile', {
          withCredentials: true
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleCallSupport = () => {
    window.location.href = 'tel:8237006990';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {user?.membershipStatus === 'gold' ? (
          <div className="bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 p-8 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to Gold Membership!
            </h1>
            <p className="text-lg text-gray-700">
              Hi {user.name}, you're one of our valued gold members.
            </p>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Upgrade to Gold Membership
            </h1>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <i className="fas fa-check text-green-500"></i>
                <p>20% discount on all tests</p>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-check text-green-500"></i>
                <p>Priority processing</p>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-check text-green-500"></i>
                <p>Access to past consultancies</p>
              </div>
              <button
                onClick={handleCallSupport}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all"
              >
                <i className="fas fa-phone-alt mr-2"></i>
                Call to Activate Gold Membership
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MembershipPage;
