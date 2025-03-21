import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewPatients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState(null);

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

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/profile', {
          withCredentials: true
        });
        setUserRole(res.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };
    fetchUserRole();
  }, []);

  const handleDelete = async (patientId) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/patients/${patientId}`, {
        withCredentials: true,  // Add this to send cookies
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      const updatedPatients = patients.filter((p) => p.patientId !== patientId);
      setPatients(updatedPatients);
      setFilteredPatients(updatedPatients);
      alert("Patient deleted successfully!");
    } catch (error) {
      if (error.response?.status === 401) {
        alert("You are not authorized to delete patients");
      } else {
        alert("Failed to delete patient");
      }
    }
  };

  const handleViewTests = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleDeleteTest = async (patientId, testId) => {
    if (!window.confirm("Are you sure you want to delete this test history?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:3000/api/patients/${patientId}/test/${testId}`,
        { withCredentials: true }
      );
      
      // Update the local state to remove the deleted test
      setSelectedPatient(prev => ({
        ...prev,
        pastTests: prev.pastTests.filter(test => test._id !== testId)
      }));
      
      alert("Test history deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete test history");
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setFilteredPatients(
        patients.filter(
          (patient) =>
            patient.patientId.toString().includes(searchTerm) ||
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
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">DOB</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Blood Type</th>
              <th className="border px-4 py-2">Medical History</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.patientId} className="text-center">
                <td className="border px-4 py-2">{patient.patientId}</td>
                <td className="border px-4 py-2">{patient.name}</td>
                <td className="border px-4 py-2">{patient.email}</td>
                <td className="border px-4 py-2">{patient.phoneNumber}</td>
                <td className="border px-4 py-2">{new Date(patient.dob).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{patient.gender}</td>
                <td className="border px-4 py-2">{patient.bloodType}</td>
                <td className="border px-4 py-2">{patient.medicalHistory?.join(", ") || "None"}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleViewTests(patient)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View Tests
                  </button>
                  {userRole === 'superadmin' && (
                    <button
                      onClick={() => handleDelete(patient.patientId)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Test History */}
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

            {/* Test Details Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Test Name</th>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Weight</th>
                    <th className="border px-4 py-2">Height</th>
                    <th className="border px-4 py-2">Muscle Mass</th>
                    <th className="border px-4 py-2">Fat %</th>
                    <th className="border px-4 py-2">Bill Amount</th>
                    <th className="border px-4 py-2">Reports</th>
                    {userRole === 'superadmin' && (
                      <th className="border px-4 py-2">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {selectedPatient.pastTests?.map((test, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{test.testName}</td>
                      <td className="border px-4 py-2">
                        {new Date(test.testDate).toLocaleDateString()}
                      </td>
                      <td className="border px-4 py-2">
                        {test.weight || '-'}
                      </td>
                      <td className="border px-4 py-2">
                        {test.height ? `${test.height} cm` : '-'}
                      </td>
                      <td className="border px-4 py-2">
                        {test.muscleMass ? `${test.muscleMass}%` : '-'}
                      </td>
                      <td className="border px-4 py-2">
                        {test.fatPercentage ? `${test.fatPercentage}%` : '-'}
                      </td>
                      <td className="border px-4 py-2">
                        {test.billing ? (
                          <div className="flex flex-col text-sm">
                            <span className="font-bold text-green-600">
                               ₹{test.billing.finalAmount}
                            </span>
                          </div>
                        ) : '-'}
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex flex-wrap gap-2">
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
                                className="w-16 h-16 object-cover rounded border"
                              />
                            </a>
                          ))}
                        </div>
                      </td>
                      {userRole === 'superadmin' && (
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => handleDeleteTest(selectedPatient.patientId, test._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                          >
                            <i className="fas fa-trash mr-1"></i>
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                  {(!selectedPatient.pastTests || selectedPatient.pastTests.length === 0) && (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-gray-500">
                        No tests found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPatients;
