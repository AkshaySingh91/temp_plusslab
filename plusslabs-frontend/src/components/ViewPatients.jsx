import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewPatients = () => {
  const [patients, setPatients] = useState([]);

  // Fetch all patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  // Handle Delete
  const handleDelete = async (patientId) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    
    try {
      await axios.delete(`http://localhost:3000/api/patients/${patientId}`);
      setPatients(patients.filter(patient => patient.patientId !== patientId));
      alert("Patient deleted successfully!");
    } catch (error) {
      alert("Failed to delete patient.");
    }
  };

  return (
    <div className="h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">All Patients</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">DOB</th>
              <th className="border border-gray-300 px-4 py-2">Gender</th>
              <th className="border border-gray-300 px-4 py-2">Blood Type</th>
              <th className="border border-gray-300 px-4 py-2">Weight</th>
              <th className="border border-gray-300 px-4 py-2">Medical History</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patientId} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{patient.patientId}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(patient.dob).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.gender}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.bloodType}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.weight} kg</td>
                <td className="border border-gray-300 px-4 py-2">{patient.medicalHistory?.join(", ") || "None"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button onClick={() => handleDelete(patient.patientId)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewPatients;
