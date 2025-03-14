import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const ViewTests = () => {
  const [tests, setTests] = useState([]);

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

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Available Lab Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div key={test._id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{test.name}</h3>
              <p className="text-gray-600 mb-4">{test.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">₹{test.price}</span>
                {test.discount > 0 && (
                  <span className="text-green-600">-{test.discount}% off</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewTests;
