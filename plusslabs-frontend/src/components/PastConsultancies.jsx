import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const PastConsultancies = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserConsultancies = async () => {
      try {
        // First get the user profile to get the email
        const userRes = await axios.get('http://localhost:3000/api/auth/profile', {
          withCredentials: true
        });

        // Then get the patient data using the email
        const patientRes = await axios.get(`http://localhost:3000/api/patients/user/${userRes.data.email}`);
        setPatientData(patientRes.data);
      } catch (err) {
        setError('Failed to fetch your consultancies');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserConsultancies();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-600 text-xl font-semibold p-4">Empty</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Past Consultancies</h1>
        {patientData?.pastTests?.length ? (
          <div className="space-y-6">
            {patientData.pastTests.map((test, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{test.testName}</h3>
                    <p className="text-gray-600">
                      Date: {new Date(test.testDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {test.reportImages?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-medium mb-2">Test Reports</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {test.reportImages.map((image, imgIndex) => (
                        <a
                          key={imgIndex}
                          href={image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img
                            src={image}
                            alt={`Report ${imgIndex + 1}`}
                            className="w-full h-40 object-cover rounded border hover:opacity-75 transition-opacity"
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No past consultancies found</div>
        )}
      </div>
    </>
  );
};

export default PastConsultancies;