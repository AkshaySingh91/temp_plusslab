import React, { useEffect, useState } from "react";

const ViewTests = () => {
  const [tests, setTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all tests
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tests");
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, []);

  // Delete a test
  const handleDelete = async (testId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tests/${testId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Test deleted successfully!");
        setTests(tests.filter((test) => test._id !== testId)); // Update state
      } else {
        alert("Failed to delete test.");
      }
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  // Filtered tests based on search input
  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">View Tests</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search test by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Tests Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Discount</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTests.length > 0 ? (
            filteredTests.map((test) => (
              <tr key={test._id} className="text-center">
                <td className="border p-2">{test.name}</td>
                <td className="border p-2">{test.description}</td>
                <td className="border p-2">₹{test.price}</td>
                <td className="border p-2">{test.discount}%</td>
                <td className="border p-2">{test.category}</td>
                <td className="border p-2">
                  <button onClick={() => handleDelete(test._id)} className="px-3 py-1 bg-red-500 text-white rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No tests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTests;
