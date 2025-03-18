import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { CalendarIcon, FileIcon, ChevronRightIcon } from "lucide-react";

const PastConsultancies = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedTest, setExpandedTest] = useState(null);

  useEffect(() => {
    const fetchUserConsultancies = async () => {
      try {
        const userRes = await axios.get("http://localhost:3000/api/auth/profile", {
          withCredentials: true,
        });
        const patientRes = await axios.get(
          `http://localhost:3000/api/patients/user/${userRes.data.email}`
        );
        setPatientData(patientRes.data || { pastTests: [] });
      } catch (err) {
        setPatientData(null);
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserConsultancies();
  }, []);

  const toggleExpandTest = (index) => {
    if (expandedTest === index) {
      setExpandedTest(null);
    } else {
      setExpandedTest(index);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!patientData) {
    return (
      <>
        <Navbar />
        <div className="bg-[#f9f0dd] h-[400px] w-[95%] mx-auto rounded-2xl mt-4 flex items-center justify-center ">
        <div className="container mx-auto px-4 relative">
          <span className="text-white rounded-2xl font-semibold  p-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 ">MEMBERSHIP PERKS</span>
          <h1 className="text-3xl mt-4 md:text-4xl lg:text-5xl font-bold text-[#0f4726] text-center"><i className="fa-regular fa-circle-check text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> Your Medical History with PLUSSLABS</h1>
          <p className="text-[#0f4726] text-center mt-2 md:mt-4 opacity-90 text-lg "><i className="fa-regular fa-chart-bar"></i> Track all your past consultations and medical reports</p>
          <div className="flex gap-4 justify-center mt-6 md:w-[50%] mx-auto border-t-2 border-[#0f4726] pt-4">
          <h2 className=" text-[12px] mt-5 md:text-[18px] font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-2 rounded-lg"><i className="fa-solid fa-tag text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 "></i> 20% off on all tests</h2>
                  <h2 className=" text-[12px] mt-5 md:text-[18px] font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-2 rounded-lg"><i className="fa-solid fa-clipboard text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> View past Consultancies</h2>
                  <h2 className=" text-[12px] mt-5 md:text-[18px] font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-2 rounded-lg"><i className="fa-solid fa-clock text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> Get Reports in 2 hrs</h2>
          </div>
        </div>
        
      </div>
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[20vh] mt-10">
          <div className="bg-red-50 rounded-full p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">No Data Found</h2>
          <p className="text-gray-500 mt-2">We couldn't find any consultancy records for your account.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#fef8ec] h-[350px] md:h-[400px] w-full flex items-center  justify-center">
      <div className="container mx-auto px-4 relative">
          <span className="text-white rounded-2xl font-semibold  p-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 ">MEMBERSHIP PERKS</span>
          <h1 className="text-3xl mt-4 md:text-4xl lg:text-5xl font-bold text-[#0f4726] text-center"><i className="fa-regular fa-circle-check text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> Your Medical History with PLUSSLABS</h1>
          <p className="text-[#0f4726] text-center mt-2 md:mt-4 opacity-90 text-lg "><i className="fa-regular fa-chart-bar"></i> Track all your past consultations and medical reports</p>
          <div className="flex gap-4 justify-center mt-6 md:w-[50%] mx-auto border-t-2 border-[#0f4726] pt-4">
          <h2 className=" text-[12px] mt-5 md:text-[18px] font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-2 rounded-lg"><i className="fa-solid fa-tag text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 "></i> 20% off on all tests</h2>
                  <h2 className=" text-[12px] mt-5 md:text-[18px] font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-2 rounded-lg"><i className="fa-solid fa-clipboard text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> View past Consultancies</h2>
                  <h2 className=" text-[12px] mt-5 md:text-[18px] font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-2 rounded-lg"><i className="fa-solid fa-clock text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> Get Reports in 2 hrs</h2>
          </div>
        </div>
        
      </div>

      <div className="container mx-auto px-4 py-8 -mt-10">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 ">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Past Consultancies</h2>

          {patientData.pastTests?.length > 0 ? (
            <div className="space-y-4">
              {patientData.pastTests.map((test, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <div 
                    className="flex flex-wrap items-center justify-between p-4 cursor-pointer"
                    onClick={() => toggleExpandTest(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 rounded-full p-3">
                        <FileIcon className="h-6 w-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">Tests : {test.testName}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {new Date(test.testDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mt-2 sm:mt-0">
                      <span className="text-sm text-gray-500 mr-2">
                        {test.reportImages?.length || 0} Reports
                      </span>
                      <ChevronRightIcon 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${expandedTest === index ? 'transform rotate-90' : ''}`} 
                      />
                    </div>
                  </div>

                  {expandedTest === index && test.reportImages?.length > 0 && (
                    <div className="border-t border-gray-100 p-4 bg-gray-50">
                      <p className="text-sm text-gray-500 mb-3">Medical Reports:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {test.reportImages.map((image, imgIndex) => (
                          <a 
                            key={imgIndex} 
                            href={image} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group relative"
                          >
                            <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-md">
                              <img 
                                src={image} 
                                alt={`Report ${imgIndex + 1}`} 
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-semibold transition-opacity duration-300">
                                  View
                                </span>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-1">No Consultancies Yet</h3>
              <p className="text-gray-500 text-center max-w-md">
                Your past medical consultations and test reports will appear here once you've had your first appointment.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PastConsultancies;