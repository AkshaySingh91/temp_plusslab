import React, { useState, useEffect } from "react";
import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;

const AllPatients = () => {
  const [isExistingPatient, setIsExistingPatient] = useState(false);
  const [formData, setFormData] = useState({
    patientId: "",
    name: "",
    phoneNumber: "",
    email: "",
    dob: "",
    gender: "",
    bloodType: "",
    weight: "",
    height: "",
    muscleMass: "",
    fatPercentage: "",
    medicalHistory: "",
    testName: "",
    bloodPressure: "",
    sugarLevels: "",
    haemoglobin: "",
    calcium: "",
    cholesterol: "",
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showTestModal, setShowTestModal] = useState(false);
  const [availableTests, setAvailableTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [searchTestQuery, setSearchTestQuery] = useState("");
  const [filteredTests, setFilteredTests] = useState([]);
  const [user, setUser] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    originalTotal: 0,
    discountedTotal: 0,
    finalAmount: 0,
    finalGoldAmount: 0
  });
  const [paymentDetails, setPaymentDetails] = useState({
    method: 'cash',
    status: 'pending'
  });
  const [isGoldPrice, setIsGoldPrice] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  
  // Gold discount rate as a constant
  const GOLD_DISCOUNT_RATE = 0.8; // 20% off

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [testsResponse, userResponse] = await Promise.all([
          axios.get(`${api_url}/api/tests`, { withCredentials: true }),
          axios.get(`${api_url}/api/auth/profile`, { withCredentials: true })
        ]);
        
        setAvailableTests(testsResponse.data);
        setUser(userResponse.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (searchTestQuery) {
      setFilteredTests(
        availableTests.filter(test => 
          test.name.toLowerCase().includes(searchTestQuery.toLowerCase()) ||
          test.testCode.toLowerCase().includes(searchTestQuery.toLowerCase())
        )
      );
    } else {
      setFilteredTests(availableTests);
    }
  }, [searchTestQuery, availableTests]);

  const handleChange = (e) => {
    console.log(formData)
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePatientIdChange = async (e) => {
    const newPatientId = e.target.value;
    setFormData(prev => ({ ...prev, patientId: newPatientId }));
    
    if (newPatientId) {
      try {
        const response = await axios.get(`${api_url}/api/patients/${newPatientId}`);
        if (response.data) {
          setIsExistingPatient(true);
          setFormData(prev => ({
            ...prev,
            name: response.data.name,
            phoneNumber: response.data.phoneNumber,
            email: response.data.email,
            dob: new Date(response.data.dob).toISOString().split('T')[0],
            gender: response.data.gender,
            bloodType: response.data.bloodType,
            weight: response.data.weight,
            medicalHistory: response.data.medicalHistory.join(','),
          }));
        }
      } catch (error) {
        setIsExistingPatient(false);
        setFormData(prev => ({
          ...prev,
          name: "",
          phoneNumber: "",
          email: "",
          dob: "",
          gender: "",
          bloodType: "",
          weight: "",
          medicalHistory: "",
          testName: "",
        }));
      }
    }
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleTestSelect = (test) => {
    setSelectedTests(prev => {
      const newTests = prev.find(t => t._id === test._id)
        ? prev.filter(t => t._id !== test._id)
        : [...prev, test];
      
      // Calculate billing amounts
      let originalTotal = 0;
      let discountedTotal = 0;
      let finalGoldAmount = 0;

      newTests.forEach(test => {
        originalTotal += test.price;
        // Apply regular discount
        const afterDiscount = test.price * (1 - test.discount/100);
        discountedTotal += afterDiscount;
        // Apply gold discount
        finalGoldAmount += test.price * GOLD_DISCOUNT_RATE;
      });

      setBillingDetails({
        originalTotal,
        discountedTotal,
        finalAmount: discountedTotal,
        finalGoldAmount: finalGoldAmount
      });
      
      return newTests;
    });
  };

  const handleTestsSubmit = (isGold = false) => {
    setIsGoldPrice(isGold);
    setFormData(prev => ({
      ...prev,
      testName: selectedTests.map(t => t.name).join(", ")
    }));
    setShowTestModal(false);
  };

  const handleCloseModals = () => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
    setSuccessMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Required fields only - no test validation
    const requiredFields = {
      patientId: "Patient ID",
      name: "Name", 
      phoneNumber: "Phone Number",
      gender: "Gender"
    };
    
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field]) {
        const element = document.getElementById(field);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
        setError(`Please fill in the required field: ${label}`);
        setShowErrorModal(true);
        return;
      }
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add patient form data
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Only add selectedTests if there are any
      if (selectedTests.length > 0) {
        const testsWithPrice = selectedTests.map(test => ({
          ...test,
          finalPrice: isGoldPrice ? test.price * 0.8 : test.price * (1 - test.discount/100)
        }));
        formDataToSend.append('selectedTests', JSON.stringify(testsWithPrice));
      }

      // Add report images if any
      images.forEach(image => {
        formDataToSend.append('reportImages', image);
      });

      formDataToSend.append('paymentMethod', paymentDetails.method);
      formDataToSend.append('paymentStatus', paymentDetails.status);

      if (isExistingPatient) {
        await axios.put(
          `${api_url}/api/patients/addTest/${formData.patientId}`,
          formDataToSend,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
        
        setSuccessMessage("Test added to existing patient successfully!");
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          setSuccessMessage("");
        }, 5000); // Show for 5 seconds
      } else {
        try {
          await axios.post(
            `${api_url}/api/patients/add`,
            formDataToSend,
            {
              headers: { 'Content-Type': 'multipart/form-data' }
            }
          );
          setSuccessMessage("New patient added successfully!");
          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            setSuccessMessage("");
          }, 5000); // Show for 5 seconds
        } catch (error) {
          if (error.response?.data?.message.includes('email already exists')) {
            setError('A patient with this email already exists. Please use a different email.');
            setShowErrorModal(true);
            setTimeout(() => {
              setShowErrorModal(false);
              setError("");
            }, 5000); // Show for 5 seconds
            setLoading(false);
            return;
          }
          throw error;
        }
      }

      // Reset form
      setFormData({
        patientId: "",
        name: "",
        phoneNumber: "",
        email: "",
        dob: "",
        gender: "",
        bloodType: "",
        weight: "",
        height: "",
        muscleMass: "",
        fatPercentage: "",
        medicalHistory: "",
        testName: "",
        bloodPressure: "",
        sugarLevels: "",
        haemoglobin: "",
        calcium: "",
        cholesterol: "",
      });
      setImages([]);
      setSelectedTests([]);
      setIsExistingPatient(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to process request");
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
        setError("");
      }, 5000); // Show for 5 seconds
    } finally {
      setLoading(false);
    }
  };

  const BillingDetails = () => (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
      <div className="flex justify-between text-lg">
        <span>Original Amount:</span>
        <span>₹{billingDetails.originalTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-green-600">
        <span>Discounted Amount:</span>
        <span>-₹{(billingDetails.originalTotal - billingDetails.discountedTotal).toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between font-bold text-xl border-t pt-2">
        <span>Final Amount:</span>
        <span>₹{billingDetails.finalAmount.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between text-blue-600 border-t pt-2">
        <span>Gold Member Price:</span>
        <span>₹{billingDetails.finalGoldAmount.toFixed(2)}</span>
      </div>
    </div>
  );

  const PaymentSection = () => (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Billing Details</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Original Amount:</span>
          <span className="text-gray-600">₹{billingDetails.originalTotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>{isGoldPrice ? "Gold Member Discount" : "Regular Discount"}:</span>
          <span className="text-green-600">
            -₹{(billingDetails.originalTotal - (isGoldPrice ? billingDetails.finalGoldAmount : billingDetails.finalAmount)).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center font-bold text-xl border-t pt-2">
          <span>Final Amount:</span>
          <span>₹{(isGoldPrice ? billingDetails.finalGoldAmount : billingDetails.finalAmount).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );

  if (initialLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">
        {isExistingPatient ? "Add Test to Existing Patient" : "Add New Patient"}
      </h1>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="patientId" className="block text-sm font-medium mb-1">
            Patient ID <span className="text-red-500">*</span>
          </label>
          <input 
            id="patientId"
            type="text" 
            name="patientId" 
            value={formData.patientId} 
            onChange={handlePatientIdChange}
            required 
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input 
            id="name"
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            required 
            readOnly={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input 
            id="phoneNumber"
            type="tel" 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleChange}
            required 
            readOnly={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input 
            id="email"
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            readOnly={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium mb-1">
            Date of Birth
          </label>
          <input 
            id="dob"
            type="date" 
            name="dob" 
            value={formData.dob} 
            onChange={handleChange}
            readOnly={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <select 
            id="gender"
            name="gender" 
            value={formData.gender} 
            onChange={handleChange} 
            required 
            disabled={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="bloodType" className="block text-sm font-medium mb-1">
            Blood Type
          </label>
          <input 
            id="bloodType"
            type="text" 
            name="bloodType" 
            value={formData.bloodType} 
            onChange={handleChange}
            readOnly={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="medicalHistory" className="block text-sm font-medium mb-1">
            Medical History
          </label>
          <input 
            id="medicalHistory"
            type="text" 
            name="medicalHistory" 
            placeholder="Medical History (comma-separated)" 
            value={formData.medicalHistory} 
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="weight" className="block text-sm font-medium mb-1">Weight (kg)</label>
          <input 
            id="weight"
            type="number" 
            name="weight" 
            placeholder="Enter weight in kg (optional)" 
            value={formData.weight} 
            onChange={handleChange} 
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="height" className="block text-sm font-medium mb-1">Height (cm)</label>
          <input 
            id="height"
            type="number" 
            name="height" 
            placeholder="Enter height in cm (optional)" 
            value={formData.height} 
            onChange={handleChange} 
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="muscleMass" className="block text-sm font-medium mb-1">Muscle Mass (%)</label>
          <input 
            id="muscleMass"
            type="number" 
            name="muscleMass" 
            placeholder="Enter muscle mass % (optional)" 
            value={formData.muscleMass} 
            onChange={handleChange} 
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fatPercentage" className="block text-sm font-medium mb-1">Fat Percentage (%)</label>
          <input 
            id="fatPercentage"
            type="number" 
            name="fatPercentage" 
            placeholder="Enter fat percentage (optional)" 
            value={formData.fatPercentage} 
            onChange={handleChange} 
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bloodPressure" className="block text-sm font-medium mb-1">Blood Pressure</label>
          <input 
            id="bloodPressure"
            type="text" 
            name="bloodPressure" 
            placeholder="Enter blood pressure (optional)" 
            value={formData.bloodPressure} 
            onChange={handleChange} 
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="sugarLevels" className="block text-sm font-medium mb-1">Sugar Levels</label>
          <input 
            id="sugarLevels"
            type="text" 
            name="sugarLevels" 
            placeholder="Enter sugar levels (optional)" 
            value={formData.sugarLevels} 
            onChange={handleChange} 
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="haemoglobin" className="block text-sm font-medium mb-1">Haemoglobin</label>
          <input 
            id="haemoglobin"
            type="text" 
            name="haemoglobin" 
            placeholder="Enter haemoglobin (optional)" 
            value={formData.haemoglobin} 
            onChange={handleChange} 
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="calcium" className="block text-sm font-medium mb-1">Calcium</label>
          <input 
            id="calcium"
            type="text" 
            name="calcium" 
            placeholder="Enter calcium levels (optional)" 
            value={formData.calcium} 
            onChange={handleChange} 
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cholesterol" className="block text-sm font-medium mb-1">Cholesterol</label>
          <input 
            id="cholesterol"
            type="text" 
            name="cholesterol" 
            placeholder="Enter cholesterol levels (optional)" 
            value={formData.cholesterol} 
            onChange={handleChange} 
            className="block w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="testName" className="block text-sm font-medium mb-1">
            Selected Tests
          </label>
          <div className="flex gap-2 items-center">
            <input 
              id="testName"
              type="text"
              name="testName"
              value={formData.testName}
              readOnly
              className="block w-full p-2 border rounded bg-gray-50"
              placeholder="No tests selected"
            />
            <button
              type="button"
              onClick={() => setShowTestModal(true)}
              className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Tests
            </button>
          </div>
        </div>
        
        {showTestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-[95%] h-[90vh] max-w-7xl flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Select Tests</h3>
                <button 
                  onClick={() => setShowTestModal(false)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              {/* Search Input */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by test name or code..."
                  value={searchTestQuery}
                  onChange={(e) => setSearchTestQuery(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Table Container with both vertical and horizontal scroll */}
              <div className="flex-1 overflow-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="sticky top-0 bg-white">
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2 text-left">Name</th>
                          <th className="border px-4 py-2 text-left">Code</th>
                          <th className="border px-4 py-2 text-left">Price (₹)</th>
                          <th className="border px-4 py-2 text-left">Discount (%)</th>
                          <th className="border px-4 py-2 text-left">After Discount (₹)</th>
                          <th className="border px-4 py-2 text-center">Gold Price (₹)</th>
                          <th className="border px-4 py-2 text-center">Select</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredTests.length > 0 ? (
                          filteredTests.map(test => (
                            <tr key={test._id} className="hover:bg-gray-50">
                              <td className="border px-4 py-2">{test.name}</td>
                              <td className="border px-4 py-2">{test.testCode}</td>
                              <td className="border px-4 py-2">{test.price}</td>
                              <td className="border px-4 py-2">{test.discount}</td>
                              <td className="border px-4 py-2">
                                {(test.price * (1 - test.discount/100)).toFixed(2)}
                              </td>
                              <td className="border px-4 py-2 text-center">
                                {(test.price * GOLD_DISCOUNT_RATE).toFixed(2)}
                              </td>
                              <td className="border px-4 py-2 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleTestSelect(test)}
                                  className={`px-3 py-1 rounded ${
                                    selectedTests.find(t => t._id === test._id)
                                      ? "bg-red-500 text-white"
                                      : "bg-blue-500 text-white"
                                  }`}
                                >
                                  {selectedTests.find(t => t._id === test._id) ? "Remove" : "Add"}
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center text-gray-500 py-4">
                              No tests found matching your search
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {selectedTests.length > 0 && <BillingDetails />}

              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowTestModal(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleTestsSubmit(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Selected Tests (₹{billingDetails.finalAmount.toFixed(2)})
                </button>
                <button
                  type="button"
                  onClick={() => handleTestsSubmit(true)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Add as Gold Member (₹{billingDetails.finalGoldAmount.toFixed(2)})
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="reportImages" className="block text-sm font-medium mb-1">Report Images</label>
          <input
            id="reportImages"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full p-2 border rounded mb-2"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded"
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          {formData.testName && <PaymentSection />}
        </div>

        <button 
          type="submit" 
          className={`px-4 py-2 bg-blue-500 text-white rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : isExistingPatient ? 'Add Test to Patient' : 'Add New Patient'}
        </button>
      </form>
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg text-center max-w-sm mx-4 relative">
            <button 
              onClick={handleCloseModals}
              className="absolute top-2 right-2 text-white hover:text-gray-200"
            >
              ✕
            </button>
            {successMessage}
          </div>
        </div>
      )}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-red-500 text-white px-8 py-4 rounded-lg shadow-lg text-center max-w-sm mx-4 relative">
            <button 
              onClick={handleCloseModals}
              className="absolute top-2 right-2 text-white hover:text-gray-200"
            >
              ✕
            </button>
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPatients;