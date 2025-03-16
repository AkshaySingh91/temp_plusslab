import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewPatients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/patients");
        setPatients(response.data);
        setFilteredPatients(response.data);
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
      const updatedPatients = patients.filter(patient => patient.patientId !== patientId);
      setPatients(updatedPatients);
      setFilteredPatients(updatedPatients);
      alert("Patient deleted successfully!");
    } catch (error) {
      alert("Failed to delete patient.");
    }
  };

  const handleViewTests = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  // Handle Search (Now includes ID)
  useEffect(() => {
    if (searchTerm) {
      setFilteredPatients(
        patients.filter(
          (patient) =>
            patient.patientId.toString().includes(searchTerm) || // Search by ID
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.phoneNumber.includes(searchTerm)
        )
      );
    } else {
      setFilteredPatients(patients);
    }
  }, [searchTerm, patients]);

  return (
    <div className="h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">All Patients</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by ID, Name, Email, or Phone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full p-2 border rounded mb-4"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">DOB</th>
              <th className="border border-gray-300 px-4 py-2">Gender</th>
              <th className="border border-gray-300 px-4 py-2">Blood Type</th>
              <th className="border border-gray-300 px-4 py-2">Medical History</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.patientId} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{patient.patientId}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.name}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.email}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.phoneNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(patient.dob).toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.gender}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.bloodType}</td>
                <td className="border border-gray-300 px-4 py-2">{patient.medicalHistory?.join(", ") || "None"}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button 
                    onClick={() => handleViewTests(patient)} 
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View Tests
                  </button>
                  <button 
                    onClick={() => handleDelete(patient.patientId)} 
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Test Details Modal */}
      {showModal && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                Test History for {selectedPatient.name}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              {selectedPatient.pastTests?.map((test, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">
                    Test: {test.testName}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Date: {new Date(test.testDate).toLocaleDateString()}
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {test.reportImages?.map((image, imgIndex) => (
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
                          className="w-full h-32 object-cover rounded border"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              {!selectedPatient.pastTests?.length && (
                <p className="text-gray-500 text-center">No tests found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPatients;
