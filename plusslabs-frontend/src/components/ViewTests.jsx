import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const ViewTests = () => {
  const [tests, setTests] = useState([]);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const isAdminView = location.pathname.includes('/dashboard');

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tests', {
          withCredentials: true
        });
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/profile', {
          withCredentials: true
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, []);

  const handleDelete = async (testId) => {
    if (!window.confirm('Are you sure you want to delete this test?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/tests/${testId}`, {
        withCredentials: true
      });
      setTests(tests.filter(test => test._id !== testId));
      alert('Test deleted successfully!');
    } catch (error) {
      console.error('Error deleting test:', error);
      alert('Failed to delete test');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Available Lab Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div key={test._id} className="bg-white p-6 rounded-lg shadow-md">
              {isAdminView && user?.role === 'admin' && (
                <div className="text-sm text-gray-500 mb-2">
                  Test Code: {test.testCode}
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{test.name}</h3>
              <p className="text-gray-600 mb-4">{test.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">₹{test.price}</span>
                {test.discount > 0 && (
                  <span className="text-green-600">-{test.discount}% off</span>
                )}
              </div>
              {isAdminView && user?.role === 'admin' && (
                <button
                  onClick={() => handleDelete(test._id)}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
                >
                  Delete Test
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewTests;
