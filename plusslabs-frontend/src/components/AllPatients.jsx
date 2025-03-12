import React, { useState } from "react";
import axios from "axios";

const AllPatients = () => {
  const [formData, setFormData] = useState({
    patientId: "",
    dob: "",
    gender: "",
    bloodType: "",
    weight: "",
    medicalHistory: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/patients/add", formData);
      alert("Patient added successfully!");
      setFormData({ patientId: "", dob: "", gender: "", bloodType: "", weight: "", medicalHistory: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add patient.");
    }
  };

  return (
    <div className="h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">Add Patient</h1>
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg shadow">
        <input type="text" name="patientId" placeholder="Patient ID" value={formData.patientId} onChange={handleChange} required className="block w-full p-2 border rounded mb-2" />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="block w-full p-2 border rounded mb-2" />
        <select name="gender" value={formData.gender} onChange={handleChange} required className="block w-full p-2 border rounded mb-2">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="bloodType" placeholder="Blood Type" value={formData.bloodType} onChange={handleChange} required className="block w-full p-2 border rounded mb-2" />
        <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} required className="block w-full p-2 border rounded mb-2" />
        <input type="text" name="medicalHistory" placeholder="Medical History (comma-separated)" value={formData.medicalHistory} onChange={handleChange} className="block w-full p-2 border rounded mb-2" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Patient</button>
      </form>
    </div>
  );
};

export default AllPatients;
