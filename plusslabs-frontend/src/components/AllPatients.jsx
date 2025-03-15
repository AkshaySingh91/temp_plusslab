import React, { useState } from "react";
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
    medicalHistory: "",
    testName: "",
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      images.forEach(image => {
        formDataToSend.append('reportImages', image);
      });

      if (isExistingPatient) {
        // Add new test to existing patient
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
        <input 
          type="text" 
          name="patientId" 
          placeholder="Patient ID" 
          value={formData.patientId} 
          onChange={handlePatientIdChange}
          required 
          className="block w-full p-2 border rounded mb-2" 
        />
        
        <input 
          type="text" 
          name="name" 
          placeholder="Patient Name" 
          value={formData.name} 
          onChange={handleChange}
          required 
          disabled={isExistingPatient}
          className={`block w-full p-2 border rounded mb-2 ${isExistingPatient ? 'bg-gray-100' : ''}`}
        />
        
        <input 
          type="tel" 
          name="phoneNumber" 
          placeholder="Phone Number" 
          value={formData.phoneNumber} 
          onChange={handleChange}
          required 
          disabled={isExistingPatient}
          className={`block w-full p-2 border rounded mb-2 ${isExistingPatient ? 'bg-gray-100' : ''}`}
        />
        
        <input 
          type="email" 
          name="email" 
          placeholder="Patient Email" 
          value={formData.email} 
          onChange={handleChange}
          required 
          className="block w-full p-2 border rounded mb-2" 
        />
        
        <input 
          type="date" 
          name="dob" 
          value={formData.dob} 
          onChange={handleChange} 
          required 
          disabled={isExistingPatient}
          className={`block w-full p-2 border rounded mb-2 ${isExistingPatient ? 'bg-gray-100' : ''}`}
        />
        
        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleChange} 
          required 
          disabled={isExistingPatient}
          className={`block w-full p-2 border rounded mb-2 ${isExistingPatient ? 'bg-gray-100' : ''}`}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        
        <input 
          type="text" 
          name="bloodType" 
          placeholder="Blood Type" 
          value={formData.bloodType} 
          onChange={handleChange} 
          required 
          disabled={isExistingPatient}
          className={`block w-full p-2 border rounded mb-2 ${isExistingPatient ? 'bg-gray-100' : ''}`}
        />
        
        <input 
          type="number" 
          name="weight" 
          placeholder="Weight (kg)" 
          value={formData.weight} 
          onChange={handleChange} 
          required 
          disabled={isExistingPatient}
          className={`block w-full p-2 border rounded mb-2 ${isExistingPatient ? 'bg-gray-100' : ''}`}
        />
        
        <input 
          type="text" 
          name="medicalHistory" 
          placeholder="Medical History (comma-separated)" 
          value={formData.medicalHistory} 
          onChange={handleChange} 
          disabled={isExistingPatient}
          className={`block w-full p-2 border rounded mb-2 ${isExistingPatient ? 'bg-gray-100' : ''}`}
        />
        
        <input 
          type="text" 
          name="testName" 
          placeholder="Test Name" 
          value={formData.testName} 
          onChange={handleChange} 
          required 
          className="block w-full p-2 border rounded mb-2" 
        />
        
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
          {loading ? 'Processing...' : isExistingPatient ? 'Add Test' : 'Add Patient'}
        </button>
      </form>
    </div>
  );
};

export default AllPatients;
