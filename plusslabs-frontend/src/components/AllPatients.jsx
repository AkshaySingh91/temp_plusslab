import React, { useState, useEffect } from "react";
import axios from "axios";

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
  
  // Gold discount rate as a constant
  const GOLD_DISCOUNT_RATE = 0.8; // 20% off

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [testsResponse, userResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/tests", { withCredentials: true }),
          axios.get('http://localhost:3000/api/auth/profile', { withCredentials: true })
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
        const response = await axios.get(`http://localhost:3000/api/patients/${newPatientId}`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add patient form data
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Add selected tests array with correct price
      const testsWithPrice = selectedTests.map(test => ({
        ...test,
        finalPrice: isGoldPrice ? test.price * 0.8 : test.price * (1 - test.discount/100)
      }));
      formDataToSend.append('selectedTests', JSON.stringify(testsWithPrice));
      
      // Add report images if any
      images.forEach(image => {
        formDataToSend.append('reportImages', image);
      });

      formDataToSend.append('paymentMethod', paymentDetails.method);
      formDataToSend.append('paymentStatus', paymentDetails.status);

      if (isExistingPatient) {
        await axios.put(
          `http://localhost:3000/api/patients/addTest/${formData.patientId}`,
          formDataToSend,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
        
        // Replace alert with more sophisticated notification if needed
        alert("Test added to existing patient successfully!");
      } else {
        // Create new patient
        await axios.post(
          "http://localhost:3000/api/patients/add",
          formDataToSend,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
        
        // Replace alert with more sophisticated notification if needed
        alert("New patient added successfully!");
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
      });
      setImages([]);
      setSelectedTests([]);
      setIsExistingPatient(false);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to process request");
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
            disabled={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100' : ''}`}
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
            disabled={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100' : ''}`}
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
            disabled={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100' : ''}`}
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
            disabled={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100' : ''}`}
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
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100' : ''}`}
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
            disabled={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100' : ''}`}
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
            disabled={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100' : ''}`}
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
          <label htmlFor="testName" className="block text-sm font-medium mb-1">
            Selected Tests <span className="text-red-500">*</span>
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Select Tests</h3>
                <button 
                  onClick={() => setShowTestModal(false)} 
                  className="text-gray-500"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Search Input */}
              <div className="mb-4">
                <label htmlFor="searchTest" className="sr-only">Search Tests</label>
                <input
                  id="searchTest"
                  type="text"
                  placeholder="Search by test name or code..."
                  value={searchTestQuery}
                  onChange={(e) => setSearchTestQuery(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Table for displaying tests */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border rounded">
                  <thead>
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
                  <tbody>
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

              {selectedTests.length > 0 && <BillingDetails />}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowTestModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleTestsSubmit(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add Selected Tests (₹{billingDetails.finalAmount.toFixed(2)})
                </button>
                <button
                  type="button"
                  onClick={() => handleTestsSubmit(true)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
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
    </div>
  );
};

export default AllPatients;