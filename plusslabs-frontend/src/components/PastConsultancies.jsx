import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { CalendarIcon, FileIcon, ChevronRightIcon } from "lucide-react";

const PastConsultancies = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedTest, setExpandedTest] = useState(null);
  const [user, setUser] = useState(null);
  const [membershipData, setMembershipData] = useState(null); // Add this state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First get the user profile
        const userRes = await axios.get("http://localhost:3000/api/auth/profile", {
          withCredentials: true,
        });
        setUser(userRes.data);

        // Get membership status if user exists
        if (userRes.data) {
          const membershipRes = await axios.get(
            "http://localhost:3000/api/membership/status",
            { withCredentials: true }
          );
          setMembershipData(membershipRes.data);
        }

        // Then get patient data if user has email
        if (userRes.data.email) {
          const patientRes = await axios.get(
            `http://localhost:3000/api/patients/user/${userRes.data.email}`
          );
          setPatientData(patientRes.data);
        }
      } catch (err) {
        console.error("Error:", err);
        setPatientData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleExpandTest = (index) => {
    if (expandedTest === index) {
      setExpandedTest(null);
    } else {
      setExpandedTest(index);
    }
  };

  const handleActivateMembership = () => {
    window.location.href = 'tel:8237006990';
  };

  // Function to sort and format health metrics from test history
  const getHealthMetricsHistory = () => {
    if (!patientData?.pastTests) return [];
    
    return patientData.pastTests
      .filter(test => test.weight || test.height || test.muscleMass || test.fatPercentage)
      .map(test => ({
        date: new Date(test.testDate),
        metrics: {
          weight: test.weight,
          height: test.height,
          muscleMass: test.muscleMass,
          fatPercentage: test.fatPercentage
        }
      }))
      .sort((a, b) => b.date - a.date);
  };

  // Health Metrics History Component
  // Health Metrics History Component
  const HealthMetricsTimeline = () => {
    const [selectedMetric, setSelectedMetric] = useState(null);
    const metricsHistory = getHealthMetricsHistory();
    const latestMetrics = metricsHistory.length > 0 ? metricsHistory[0].metrics : {};
    
    // Calculate latest BMI
    const latestBmi = latestMetrics.weight && latestMetrics.height 
      ? (latestMetrics.weight / Math.pow(latestMetrics.height/100, 2)).toFixed(1)
      : '-';
    
    const metricCards = [
      { 
        id: 'weight', 
        title: 'Weight', 
        value: latestMetrics.weight ? `${latestMetrics.weight} kg` : '-',
        icon: '/assets/weight-scale.png',
        color: 'bg-[#fcd470]',
        fontawesome: <i className="fa-brands fa-web-awesome  text-yellow-600"></i>
      },
      { 
        id: 'height', 
        title: 'Height', 
        value: latestMetrics.height ? `${latestMetrics.height} cm` : '-',
        icon: '/assets/height.png',
        color: 'bg-[#a7e9a6]',
        fontawesome: <i className="fa-brands fa-web-awesome"></i>

      },
      { 
        id: 'muscleMass', 
        title: 'Muscle Mass', 
        value: latestMetrics.muscleMass ? `${latestMetrics.muscleMass}%` : '-',
        icon: '/assets/muscle.png',
        color: 'bg-pink-300',
        fontawesome: <i className="fa-brands fa-web-awesome "></i>

      },
      { 
        id: 'fatPercentage', 
        title: 'Fat %', 
        value: latestMetrics.fatPercentage ? `${latestMetrics.fatPercentage}%` : '-',
        icon: '/assets/body-fat.png',
        color: 'bg-[#b1e4f9]',
        fontawesome:<i className="fa-brands fa-web-awesome"></i>

      },
      { 
        id: 'bmi', 
        title: 'BMI', 
        value: latestBmi,
        icon: '/assets/bmi.png',
        color: 'bg-red-200',
        fontawesome:<i className="fa-brands fa-web-awesome"></i>

      }
    ];
  
    const closeDetailView = () => {
      setSelectedMetric(null);
    };
  
    return (
      <div className="bg-white rounded-xl  p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-3xl font-semibold text-gray-800">
            Health Metrics History
          </h2>
          {user?.membershipStatus === 'gold' ? (
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium text-center">
              <i className="fas fa-crown mr-2"></i>Gold Member
            </span>
          ) : (
            <button
              onClick={handleActivateMembership}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              <i className="fas fa-crown mr-2"></i>
              Activate Gold Membership
            </button>
          )}
        </div>
  
        {user?.membershipStatus === 'gold' ? (
          <>
            {selectedMetric ? (
              // Detail view (table format)
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    {metricCards.find(card => card.id === selectedMetric)?.title} History
                  </h3>
                  <button 
                    onClick={closeDetailView}
                    className="bg-red-500 px-2 py-1 text-white rounded-lg"
                  >
                    <i className="fas fa-times "></i> Close
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-yellow-200">
                      <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase border-r-2 border-gray-400">Date</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-800 uppercase">
                          {metricCards.find(card => card.id === selectedMetric)?.title}
                        </th>
                      </tr>
                    </thead>
                    <tbody className=" divide-y divide-gray-200">
                      {metricsHistory.map((record, index) => {
                        let value = '-';
                        
                        if (selectedMetric === 'bmi' && record.metrics.weight && record.metrics.height) {
                          value = (record.metrics.weight / Math.pow(record.metrics.height/100, 2)).toFixed(1);
                        } else if (record.metrics[selectedMetric]) {
                          value = record.metrics[selectedMetric];
                          
                          // Add units
                          if (selectedMetric === 'weight') value += ' kg';
                          else if (selectedMetric === 'height') value += ' cm';
                          else if (selectedMetric === 'muscleMass' || selectedMetric === 'fatPercentage') value += '%';
                        }
                        
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-center text-sm md:text-md whitespace-nowrap border-r-2 border-gray-400 text-gray-900">
                              {record.date.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </td>
                            <td className="px-6 py-4 text-sm md:text-md whitespace-nowrap text-center text-gray-900">
                              {value}
                            </td>
                          </tr>
                        );
                      })}
                      {metricsHistory.length === 0 && (
                        <tr>
                          <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500">
                            No data recorded yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              // Cards view
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {metricCards.map(card => (
                  <div 
                    key={card.id}
                    onClick={() => setSelectedMetric(card.id)}
                    className={`${card.color} rounded-lg  p-4 border border-gray-200 cursor-pointer`}
                  >
                    <div className={`flex flex-col items-center text-center ${card.color}`}>
                      {/* <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center text-white text-2xl mb-3`}>
                        {card.icon}
                      </div>
                      <h3 className="text-gray-700 font-medium">{card.title}</h3>
                      <p className="text-2xl font-bold mt-2">{card.value}</p>
                      <p className="text-xs text-gray-500 mt-2">Click for history</p> */}
                      <h1 className="text-4xl mt-2 font-semibold bebas-neue-regular  flex gap-4"><span className="border-b-4 border-black">{card.title}</span></h1>
                      <div className="flex mt-7 gap-10">
                       <div className="text-center">
                       <h1 className="text-5xl mt-2 font-semibold bebas-neue-regular">{card.value}</h1>
                       <p className="text-sm  mt-2 px-3 py-2 rounded-xl bg-[#191c1e] text-[wheat] font-semibold"><i className="fa-solid fa-clock-rotate-left mr-1"></i> History</p>
                       </div>
                      <img src={card.icon} alt={card.title} height={100} width={100}/>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600 mb-4">
              Upgrade to Gold Membership to track your health metrics and access detailed reports
            </p>
            <button
              onClick={handleActivateMembership}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-all"
            >
              <i className="fas fa-phone-alt mr-2"></i>
              Call to Activate (8237006990)
            </button>
          </div>
        )}
      </div>
    );
  };

  // Show loading spinner
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </>
    );
  }

  // Show no data message if no patient data
  if (!patientData || !patientData.pastTests || patientData.pastTests.length === 0) {
    return (
      <>
        <Navbar />
        <div className="bg-[#f9f0dd] min-h-screen">
          {/* ...existing membership perks UI... */}
          <div className="container mx-auto px-4 flex flex-col items-center justify-center py-10">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <div className="text-center">
                <div className="bg-red-50 rounded-full p-6 inline-block mb-4">
                  <i className="fas fa-clipboard-list text-4xl text-red-500"></i>
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Records Found</h2>
                <p className="text-gray-600">
                  We couldn't find any test records associated with your account. 
                  Book your first test to start tracking your health journey.
                </p>
                <button 
                  onClick={() => window.location.href = 'tel:8237006990'}
                  className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <i className="fas fa-phone-alt mr-2"></i>
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#fef8ec] h-[400px] md:h-[400px] w-full flex items-center  justify-center">
      <div className="container max-w-full px-4 relative">
          <span className="text-white rounded-2xl font-semibold  p-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 ">PLUSSLABS PERKS</span>
          
          {/* Add membership expiry info */}
          {user?.membershipStatus === 'gold' && membershipData?.active && (
            <div className="mt-6 text-center">
              <span className="bg-yellow-100 text-yellow-800  text-sm font-medium px-4 py-1 rounded-full">
                <i className="fas fa-clock mr-2"></i>
                Gold Membership expires on: {new Date(membershipData.endDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}

          <h1 className="text-3xl mt-4 md:text-4xl lg:text-5xl font-bold text-[#0f4726] text-center"><i className="fa-regular fa-circle-check text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> Your Medical History with PLUSSLABS</h1>
          <p className="text-[#0f4726] text-center mt-2 md:mt-4 opacity-90 text-lg "><i className="fa-regular fa-chart-bar"></i> Track all your past consultations and medical reports</p>
          <div className="flex gap-4 justify-center mt-6 md:w-[50%] mx-auto border-t-2 border-[#0f4726] pt-4">
          <h2 className=" text-[12px] mt-5 md:text-[18px] font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-2 rounded-lg"><i className="fa-solid fa-tag text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 "></i> 20% off on all tests</h2>
                  <h2 className=" text-[12px] mt-5 md:text-[18px] font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-2 rounded-lg"><i className="fa-solid fa-clipboard text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> View past Consultancies</h2>
                  <h2 className=" text-[12px] mt-5 md:text-[18px] font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-2 rounded-lg"><i className="fa-solid fa-clock text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> Get Reports in 2 hrs</h2>
          </div>
          <img src="/assets/pharmacy.png" alt="pharmacy" className="absolute h-28 w-28 md:top-40 right-10 hidden md:block"/>
          <img src="/assets/drugstore.png" alt="pharmacy" className="absolute md:h-32 md:w-32 lg:h-40 lg:w-40 bottom-0 left-10 hidden md:block"/>
          <img src="/assets/medicine.png" alt="pharmacy" className=" h-20 w-20 top-0 right-32 hidden md:block absolute"/>

        </div>
        
      </div>

      <div className="container max-w-full mx-auto px-4 py-8 -mt-10">
        <HealthMetricsTimeline />
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
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