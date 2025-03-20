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
  const [showTestModal, setShowTestModal] = useState(false);
  const [availableTests, setAvailableTests] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);
  const [searchTestQuery, setSearchTestQuery] = useState("");
  const [filteredTests, setFilteredTests] = useState([]);
  const [user, setUser] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    originalTotal: 0,
    discountedTotal: 0,
    finalAmount: 0
  });

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/tests", {
          withCredentials: true,
        });
        setAvailableTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
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

      newTests.forEach(test => {
        originalTotal += test.price;
        // Apply regular discount
        const afterDiscount = test.price * (1 - test.discount/100);
        // Apply gold membership discount if applicable
        discountedTotal += user?.membershipStatus === 'gold' ? afterDiscount * 0.8 : afterDiscount;
      });

      setBillingDetails({
        originalTotal,
        discountedTotal,
        finalAmount: discountedTotal
      });
      
      return newTests;
    });
  };

  const handleTestsSubmit = () => {
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
      
      // Add selected tests data
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Add selected tests array with price information
      formDataToSend.append('selectedTests', JSON.stringify(selectedTests));
      
      images.forEach(image => {
        formDataToSend.append('reportImages', image);
      });

      if (isExistingPatient) {
        await axios.put(
          `http://localhost:3000/api/patients/addTest/${formData.patientId}`,
          formDataToSend,
          {
            headers: { 'Content-Type': 'multipart/form-data' }
          }
        );
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
      {user?.membershipStatus === 'gold' && (
        <div className="flex justify-between text-blue-600">
          <span>Gold Member Discount (20%):</span>
          <span>Extra 20% off</span>
        </div>
      )}
      <div className="flex justify-between font-bold text-xl border-t pt-2">
        <span>Final Amount:</span>
        <span>₹{billingDetails.finalAmount.toFixed(2)}</span>
      </div>
    </div>
  );

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
          <label className="block text-sm font-medium mb-1">
            Patient ID <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="patientId" 
            value={formData.patientId} 
            onChange={handlePatientIdChange}
            required 
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input 
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
          <label className="block text-sm font-medium mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input 
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
          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Date of Birth
          </label>
          <input 
            type="date" 
            name="dob" 
            value={formData.dob} 
            onChange={handleChange}
            disabled={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100' : ''}`}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <select 
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
          <label className="block text-sm font-medium mb-1">
            Blood Type
          </label>
          <input 
            type="text" 
            name="bloodType" 
            value={formData.bloodType} 
            onChange={handleChange}
            disabled={isExistingPatient}
            className={`block w-full p-2 border rounded ${isExistingPatient ? 'bg-gray-100' : ''}`}
          />
        </div>

        <input 
          type="text" 
          name="medicalHistory" 
          placeholder="Medical History (comma-separated)" 
          value={formData.medicalHistory} 
          onChange={handleChange} 
          disabled={isExistingPatient}
          className={`block w-full p-2 border rounded mb-2 ${isExistingPatient ? 'bg-gray-100' : ''}`}
        />
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Weight (kg)</label>
          <input 
            type="number" 
            name="weight" 
            placeholder="Enter weight in kg (optional)" 
            value={formData.weight} 
            onChange={handleChange} 
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Height (cm)</label>
          <input 
            type="number" 
            name="height" 
            placeholder="Enter height in cm (optional)" 
            value={formData.height} 
            onChange={handleChange} 
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Muscle Mass (%)</label>
          <input 
            type="number" 
            name="muscleMass" 
            placeholder="Enter muscle mass % (optional)" 
            value={formData.muscleMass} 
            onChange={handleChange} 
            className="block w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Fat Percentage (%)</label>
          <input 
            type="number" 
            name="fatPercentage" 
            placeholder="Enter fat percentage (optional)" 
            value={formData.fatPercentage} 
            onChange={handleChange} 
            className="block w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Selected Tests <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 items-center">
            <input 
              type="text"
              value={formData.testName}
              readOnly
              className="block w-full p-2 border rounded bg-gray-50"
              placeholder="No tests selected"
            />
            <button
              type="button"
              onClick={() => setShowTestModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Select Tests
            </button>
          </div>
        </div>

        {showTestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Select Tests</h3>
                <button onClick={() => setShowTestModal(false)} className="text-gray-500">✕</button>
              </div>

              {/* Add Search Input */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by test name or code..."
                    value={searchTestQuery}
                    onChange={(e) => setSearchTestQuery(e.target.value)}
                    className="w-full p-2 pr-10 border rounded focus:outline-none focus:border-blue-500"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {filteredTests.map(test => (
                  <div
                    key={test._id}
                    onClick={() => handleTestSelect(test)}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedTests.find(t => t._id === test._id)
                        ? 'bg-blue-50 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTests.find(t => t._id === test._id)}
                        onChange={() => {}}
                        className="h-4 w-4"
                      />
                      <div>
                        <p className="font-medium">{test.name}</p>
                        <p className="text-sm text-gray-500">Code: {test.testCode}</p>
                        <p className="text-sm text-gray-500">Price: ₹{test.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredTests.length === 0 && (
                  <div className="col-span-2 text-center py-4 text-gray-500">
                    No tests found matching your search
                  </div>
                )}
              </div>

              {selectedTests.length > 0 && <BillingDetails />}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setShowTestModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTestsSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Add Selected Tests (₹{billingDetails.finalAmount.toFixed(2)})
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Report Images</label>
          <input
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

        <button 
          type="submit" 
          className={`px-4 py-2 bg-blue-500 text-white rounded w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : isExistingPatient ? 'Add Patient' : 'Add Patient'}
        </button>
      </form>
    </div>
  );
};

export default AllPatients;
