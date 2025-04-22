import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { CalendarIcon, FileIcon, ChevronRightIcon } from "lucide-react";
const api_url = import.meta.env.VITE_API_URL;

const PastConsultancies = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedTest, setExpandedTest] = useState(null);
  const [user, setUser] = useState(null);
  const [membershipData, setMembershipData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First get the user profile
        const userRes = await axios.get(`${api_url}/api/auth/profile`, {
          withCredentials: true,
        });
        setUser(userRes.data);

        // Get membership status if user exists
        if (userRes.data) {
          const membershipRes = await axios.get(
            `${api_url}/api/membership/status`,
            { withCredentials: true }
          );
          setMembershipData(membershipRes.data);
        }

        // Then get patient data if user has email
        if (userRes.data.email) {
          const patientRes = await axios.get(
            `${api_url}/api/patients/user/${userRes.data.email}`
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
    window.location.href = 'tel:7276763563';
  };

  // Function to sort and format health metrics from test history
  const getHealthMetricsHistory = () => {
    if (!patientData?.pastTests) return [];
    
    return patientData.pastTests
      .filter(test => 
        test.weight || 
        test.height || 
        test.muscleMass || 
        test.fatPercentage ||
        test.bloodPressure ||
        test.sugarLevels ||
        test.haemoglobin ||
        test.calcium ||
        test.cholesterol
      )
      .map(test => ({
        date: new Date(test.testDate),
        metrics: {
          weight: test.weight,
          height: test.height,
          muscleMass: test.muscleMass,
          fatPercentage: test.fatPercentage,
          bloodPressure: test.bloodPressure,
          sugarLevels: test.sugarLevels,
          haemoglobin: test.haemoglobin,
          calcium: test.calcium,
          cholesterol: test.cholesterol
        }
      }))
      .sort((a, b) => b.date - a.date);
  };

  // Health Metrics Timeline Component
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
        fontawesome: <i className="fa-brands fa-web-awesome text-yellow-600"></i>
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
        fontawesome: <i className="fa-brands fa-web-awesome"></i>
      },
      { 
        id: 'fatPercentage', 
        title: 'Fat %', 
        value: latestMetrics.fatPercentage ? `${latestMetrics.fatPercentage}%` : '-',
        icon: '/assets/body-fat.png',
        color: 'bg-[#b1e4f9]',
        fontawesome: <i className="fa-brands fa-web-awesome"></i>
      },
      { 
        id: 'bmi', 
        title: 'BMI', 
        value: latestBmi,
        icon: '/assets/bmi.png',
        color: 'bg-red-200',
        fontawesome: <i className="fa-brands fa-web-awesome"></i>
      },
      { 
        id: 'bloodPressure', 
        title: 'Blood Pressure', 
        value: latestMetrics.bloodPressure || '-',
        icon: '/assets/blood-pressure.png',
        color: 'bg-purple-200'
      },
      { 
        id: 'sugarLevels', 
        title: 'Sugar Levels', 
        value: latestMetrics.sugarLevels || '-',
        icon: '/assets/high-blood-sugar.png',
        color: 'bg-orange-200'
      },
      { 
        id: 'haemoglobin', 
        title: 'Haemoglobin', 
        value: latestMetrics.haemoglobin || '-',
        icon: '/assets/haemoglobin.png',
        color: 'bg-red-200'
      },
      { 
        id: 'calcium', 
        title: 'Calcium', 
        value: latestMetrics.calcium || '-',
        icon: '/assets/calcium.png',
        color: 'bg-blue-200'
      },
      { 
        id: 'cholesterol', 
        title: 'Cholesterol', 
        value: latestMetrics.cholesterol || '-',
        icon: '/assets/high.png',
        color: 'bg-yellow-200'
      }
    ];
  
    const closeDetailView = () => {
      setSelectedMetric(null);
    };
  
    return (
      <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 text-center sm:text-left">
            Health Metrics History
          </h2>
          {user?.membershipStatus === 'gold' ? (
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium text-center whitespace-nowrap">
              <i className="fas fa-crown mr-2"></i>Gold Member
            </span>
          ) : (
            <button
              onClick={handleActivateMembership}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto"
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
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <h3 className="text-lg font-medium text-gray-800 text-center sm:text-left">
                    {metricCards.find(card => card.id === selectedMetric)?.title} History
                  </h3>
                  <button 
                    onClick={closeDetailView}
                    className="bg-red-500 px-2 py-1 text-white rounded-lg w-full sm:w-auto"
                  >
                    <i className="fas fa-times mr-1"></i> Close
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-yellow-200">
                      <tr>
                        <th className="px-4 sm:px-6 py-2 sm:py-3 text-center text-xs font-medium text-gray-800 uppercase border-r-2 border-gray-400">Date</th>
                        <th className="px-4 sm:px-6 py-2 sm:py-3 text-center text-xs font-medium text-gray-800 uppercase">
                          {metricCards.find(card => card.id === selectedMetric)?.title}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {metricsHistory.map((record, index) => {
                        let value = '-';
                        
                        if (selectedMetric === 'bmi' && record.metrics.weight && record.metrics.height) {
                          value = (record.metrics.weight / Math.pow(record.metrics.height/100, 2)).toFixed(1);
                        } else if (record.metrics[selectedMetric]) {
                          value = record.metrics[selectedMetric];
                          
                          // Add units
                          switch(selectedMetric) {
                            case 'weight':
                              value += ' kg';
                              break;
                            case 'height':
                              value += ' cm';
                              break;
                            case 'muscleMass':
                            case 'fatPercentage':
                              value += '%';
                              break;
                            case 'bloodPressure':
                            case 'sugarLevels':
                            case 'haemoglobin':
                            case 'calcium':
                            case 'cholesterol':
                              value = value; // No units needed
                              break;
                          }
                        }
                        
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm whitespace-nowrap border-r-2 border-gray-400 text-gray-900">
                              {record.date.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm whitespace-nowrap text-center text-gray-900">
                              {value}
                            </td>
                          </tr>
                        );
                      })}
                      {metricsHistory.length === 0 && (
                        <tr>
                          <td colSpan="2" className="px-4 sm:px-6 py-3 sm:py-4 text-center text-sm text-gray-500">
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {metricCards.map(card => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedMetric(card.id)}
                    className={`${card.color} rounded-lg p-3  sm:p-4 border border-gray-200 cursor-pointer transition-transform hover:shadow-lg hover:scale-105`}
                  >
                    <div className={`flex flex-col items-center text-center ${card.color}`}>
                      <h1 className="text-2xl md:text-3xl font-semibold bebas-neue-regular flex gap-2">
                        <span className="border-b-2 border-black">{card.title}</span>
                      </h1>
                      <div className="flex flex-row mt-5 sm:mt-3 gap-2 sm:gap-4 items-center justify-around w-full">
                        <div className="text-center">
                          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold bebas-neue-regular">{card.value}</h1>
                          <p className="text-xs mt-1 p-2 rounded-xl bg-[#191c1e] text-[wheat] font-semibold">
                           History
                          </p>
                        </div>
                        <img 
                          src={card.icon} 
                          alt={card.title} 
                          className="w-16 h-16 lg:w-20 lg:h-20"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="bg-gray-50 p-4 sm:p-6 rounded-lg text-center">
            <p className="text-gray-600 mb-4">
              Upgrade to Gold Membership to track your health metrics and access detailed reports
            </p>
            <button
              onClick={handleActivateMembership}
              className="bg-yellow-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-yellow-600 transition-all w-full sm:w-auto"
            >
              <i className="fas fa-phone-alt mr-2"></i>
              Call to Activate (7276763563)
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
          <div className="bg-[#fef8ec] py-8 sm:py-12 md:py-16 w-full flex items-center justify-center">
            <div className="container max-w-full px-4 relative">
              <span className="text-white rounded-2xl font-semibold p-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">PLUSSLABS PERKS</span>
              
              {/* Add membership expiry info */}
              {user?.membershipStatus === 'gold' && membershipData?.active && (
                <div className="mt-4 sm:mt-6 text-center">
                  <span className="bg-yellow-100 text-yellow-800 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 rounded-full inline-block">
                    <i className="fas fa-clock mr-2"></i>
                    Gold Membership expires on: {new Date(membershipData.endDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f4726] text-center mt-4">
                <i className="fa-regular fa-circle-check text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> 
                Your Medical History with PLUSS LABS
              </h1>
              <p className="text-[#0f4726] text-center mt-2 md:mt-4 opacity-90 text-base sm:text-lg">
                <i className="fa-regular fa-chart-bar"></i> Track all your past consultations and medical reports
              </p>
              
              <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mt-4 sm:mt-6 sm:w-full md:w-[80%] lg:w-[50%] mx-auto border-t-2 border-[#0f4726] pt-4">
                <h2 className="text-[10px] xs:text-xs sm:text-sm md:text-base font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-1 sm:p-2 rounded-lg">
                  <i className="fa-solid fa-tag text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> 
                   20% off on all tests
                </h2>
                <h2 className="text-[10px] xs:text-xs sm:text-sm md:text-base font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-1 sm:p-2 rounded-lg">
                  <i className="fa-solid fa-clipboard text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> 
                   View past Consultancies
                </h2>
                <h2 className="text-[10px] xs:text-xs sm:text-sm md:text-base font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-1 sm:p-2 rounded-lg">
                  <i className="fa-solid fa-clock text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> 
                   Get Reports in 2 hrs
                </h2>
              </div>
              
              {/* Hidden on small screens */}
              <img src="/assets/pharmacy.png" alt="pharmacy" className="absolute h-16 w-16 md:h-28 md:w-28 top-10 md:top-40 right-2 sm:right-10 hidden md:block"/>
              <img src="/assets/drugstore.png" alt="pharmacy" className="absolute md:h-24 md:w-24 lg:h-32 lg:w-32 bottom-0 left-2 sm:left-10 hidden md:block"/>
              <img src="/assets/medicine.png" alt="pharmacy" className="h-16 w-16 md:h-20 md:w-20 top-0 right-20 sm:right-32 hidden md:block absolute"/>
            </div>
          </div>
          
          {/* No records UI */}
          <div className="container mx-auto px-4 py-6 sm:py-10">
            <div className="flex flex-col items-center justify-center">
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-center">
                  <div className="bg-red-50 rounded-full p-4 sm:p-6 inline-block mb-4">
                    <i className="fas fa-clipboard-list text-3xl sm:text-4xl text-red-500"></i>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">No Records Found</h2>
                  <p className="text-gray-600">
                    We couldn't find any test records associated with your account. 
                    Book your first test to start tracking your health journey.
                  </p>
                  <button 
                    onClick={() => window.location.href = 'tel:7276763563'}
                    className="mt-4 sm:mt-6 bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-600 transition-colors w-full sm:w-auto"
                  >
                    <i className="fas fa-phone-alt mr-2"></i>
                    Book Now
                  </button>
                </div>
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
      <div className="bg-[#fef8ec] py-8 sm:py-12 md:py-16 w-full flex items-center justify-center">
        <div className="container max-w-full px-4 relative">
          <span className="text-white rounded-2xl font-semibold p-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">PLUSSLABS PERKS</span>
          
          {/* Add membership expiry info */}
          {user?.membershipStatus === 'gold' && membershipData?.active && (
            <div className="mt-4 sm:mt-6 text-center">
              <span className="bg-yellow-100 text-yellow-800 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 rounded-full inline-block">
                <i className="fas fa-clock mr-2"></i>
                Gold Membership expires on: {new Date(membershipData.endDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f4726] text-center mt-4">
            <i className="fa-regular fa-circle-check text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> 
            Your Medical History with PLUSSLABS
          </h1>
          <p className="text-[#0f4726] text-center mt-2 md:mt-4 opacity-90 text-base sm:text-lg">
            <i className="fa-regular fa-chart-bar"></i> Track all your past consultations and medical reports
          </p>
          
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mt-4 sm:mt-6 sm:w-full md:w-[80%] lg:w-[50%] mx-auto border-t-2 border-[#0f4726] pt-4">
            <h2 className="text-[10px] xs:text-xs sm:text-sm md:text-base font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-1 sm:p-2 rounded-lg">
              <i className="fa-solid fa-tag text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> 
              20% off on all tests
            </h2>
            <h2 className="text-[10px] xs:text-xs sm:text-sm md:text-base font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-1 sm:p-2 rounded-lg">
              <i className="fa-solid fa-clipboard text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> 
              View past Consultancies
            </h2>
            <h2 className="text-[10px] xs:text-xs sm:text-sm md:text-base font-semibold text-[#0f4726] border-[2px] border-[#0f4726] p-1 sm:p-2 rounded-lg">
              <i className="fa-solid fa-clock text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> 
              Get Reports in 2 hrs
            </h2>
          </div>
          
          {/* Hidden on small screens */}
          <img src="/assets/pharmacy.png" alt="pharmacy" className="absolute h-16 w-16 md:h-28 md:w-28 top-10 md:top-40 right-2 sm:right-10 hidden md:block"/>
          <img src="/assets/drugstore.png" alt="pharmacy" className="absolute md:h-24 md:w-24 lg:h-32 lg:w-32 bottom-0 left-2 sm:left-10 hidden md:block"/>
          <img src="/assets/medicine.png" alt="pharmacy" className="h-16 w-16 md:h-20 md:w-20 top-0 right-20 sm:right-32 hidden md:block absolute"/>
        </div>
      </div>

      <div className="container max-w-full mx-auto px-4 py-6 sm:py-8 -mt-4 sm:-mt-6 md:-mt-10">
        <HealthMetricsTimeline />
        
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Past Consultancies</h2>

          {patientData.pastTests?.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {patientData.pastTests.map((test, index) => (
                <div 
                  key={index} 
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <div 
                    className="flex flex-wrap items-center justify-between p-3 sm:p-4 cursor-pointer"
                    onClick={() => toggleExpandTest(index)}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto mb-2 sm:mb-0">
                      <div className="bg-green-100 rounded-full p-2 sm:p-3">
                        <FileIcon className="h-4 w-4 sm:h-6 sm:w-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-800">Tests: {test.testName}</h3>
                        <div className="flex items-center mt-1 text-xs sm:text-sm text-gray-500">
                          <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {new Date(test.testDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-xs sm:text-sm text-gray-500 mr-2">
                        {test.reportImages?.length || 0} Reports
                      </span>
                      <ChevronRightIcon 
                        className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform duration-300 ${expandedTest === index ? 'transform rotate-90' : ''}`} 
                      />
                    </div>
                  </div>

                  {expandedTest === index && test.reportImages?.length > 0 && (
                    <div className="border-t border-gray-100 p-3 sm:p-4 bg-gray-50">
                      <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">Medical Reports:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
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