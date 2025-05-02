import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
const api_url = import.meta.env.VITE_API_URL;

const ViewTests = () => {
  const [tests, setTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 100; // ✅ Display 100 tests per page

  const location = useLocation();
  const isAdminView = location.pathname.includes("/dashboard") && (user?.role === "admin" || user?.role === "superadmin");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${api_url}/api/tests`, {
          withCredentials: true,
        });
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${api_url}/api/auth/profile`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const res = await axios.get(`${api_url}/api/auth/profile`, { 
          withCredentials: true 
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error checking role:', error);
      }
    };
    checkUserRole();
  }, []);

  const handleDelete = async (testId) => {
    if (!window.confirm("Are you sure you want to delete this test?")) {
      return;
    }

    try {
      await axios.delete(`${api_url}/api/tests/${testId}`, {
        withCredentials: true,
      });
      setTests(tests.filter((test) => test._id !== testId));
      alert("Test deleted successfully!");
    } catch (error) {
      console.error("Error deleting test:", error);
      alert("Failed to delete test");
    }
  };

  // ✅ Search by Test Code, Name, or Category
  const filteredTests = tests.filter(
    (test) =>
      test.testCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ Pagination Logic
  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);

  const totalPages = Math.ceil(filteredTests.length / testsPerPage);

  const handleBook = () => {
    window.location.href = 'tel:7276763563';
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Available Lab Tests</h1>

        {/* ✅ Search Input */}
        <input
          type="text"
          placeholder="Search by Test Code, Name, or Category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full p-2 mb-4 border rounded"
        />

        {/* ✅ Admin View: Show as Table */}
        {isAdminView ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border">Test Code</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Description</th>
                  <th className="py-2 px-4 border">Category</th>
                  <th className="py-2 px-4 border">Price</th>
                  <th className="py-2 px-4 border">Discount</th>
                  <th className="py-2 px-4 border">Final Price</th>
                  <th className="py-2 px-4 border">Gold Membership Price</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTests.map((test) => {
                  const finalPrice = test.price * (1 - test.discount/100);
                  const goldPrice = test.price * 0.8; // 20% off original price, not discounted price
                  return (
                    <tr key={test._id} className="text-center border-t">
                      <td className="py-2 px-4 border">{test.testCode}</td>
                      <td className="py-2 px-4 border">{test.name}</td>
                      <td className="py-2 px-4 border">{test.description}</td>
                      <td className="py-2 px-4 border">{test.category}</td>
                      <td className="py-2 px-4 border">₹{test.price}</td>
                      <td className="py-2 px-4 border">{test.discount}%</td>
                      <td className="py-2 px-4 border text-green-600 font-bold">
                        ₹{finalPrice.toFixed(2)}
                      </td>
                      <td className="py-2 px-4 border text-blue-600 font-bold">
                        ₹{goldPrice.toFixed(2)}
                        <span className="text-xs block text-gray-500">(20% off original price)</span>
                      </td>
                      <td className="py-2 px-4 border">
                        {user?.role === 'superadmin' && (
                          <button
                            onClick={() => handleDelete(test._id)}
                            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* ✅ User View: Show as Cards */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
          {currentTests.map((test) => {
            const finalPrice = test.price * (1 - test.discount / 100);
            const goldPrice = test.price * 0.8; // 20% off original price
            return (
              <div
                key={test._id}
                className="bg-gray-300 p-4 rounded-lg flex flex-col h-full relative"
              >
                {/* Content Section */}
                <div className="flex-grow">
                  <h3 className="text-sm md:text-xl font-semibold mb-2 mt-2">{test.name}</h3>
                  <p className="text-gray-600 mb-2 text-sm">TestCode: {test.testCode}</p>
        
                  <div className="flex flex-col justify-between mt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 line-through">₹{test.price}</span>
                      <span className="text-green-600 text-md md:text-xl font-bold">
                        ₹{finalPrice.toFixed(2)}
                        <span className="text-[10px] md:text-xs ml-1 absolute -top-3 right-2 bg-red-500 text-white p-2 rounded-xl">
                          {test.discount}% off
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
        
                {/* Buttons Section (Always at Bottom) */}
                <div className="mt-4">
                  {/* Gold Membership Price */}
                  <span className="text-yellow-800 bg-gradient-to-r border-yellow-400 from-yellow-400 via-yellow-500 to-yellow-600 p-2 rounded-lg font-bold relative flex flex-col items-center md:justify-between md:flex-row">
                    <div className="text-[10px] md:text-sm">
                      <i className="fa-solid fa-sack-dollar"></i> For Members Only
                    </div>
                    <div className="text-xs md:text-xl">₹{goldPrice.toFixed(0)}</div>
                  </span>
        
                  {/* Book Now Button */}
                  <button
                    className="text-sm md:text-lg w-full bg-black text-white font-semibold rounded p-2 mt-2"
                    onClick={() => handleBook()}
                  >
                    <i className="fa-regular fa-pen-to-square"></i> Book Now
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        )}

        {/* ✅ Pagination Controls */}
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 mx-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {!isAdminView && <Footer/>}
    </>
  );
};

export default ViewTests;
