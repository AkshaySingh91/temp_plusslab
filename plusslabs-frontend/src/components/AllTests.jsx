import React, { useEffect, useState } from "react";

const AllTests = () => {
  const [tests, setTests] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: 0,
    category: "",
  });

  // Fetch tests from backend
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

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/tests/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Test added successfully!");
        setTests([...tests, result.test]); // Update state to include new test
        setFormData({ name: "", description: "", price: "", discount: 0, category: "" }); // Reset form
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error adding test:", error);
      alert("Failed to add test.");
    }
  };

  return (
    <div className="h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">All Tests</h1>

      {/* Form to add tests */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Add a New Test</h2>
        <input
          type="text"
          name="name"
          placeholder="Test Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount"
          value={formData.discount}
          onChange={handleChange}
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Test</button>
      </form>

      {/* Display all tests */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tests.map((test) => (
          <div key={test._id} className="p-4 border rounded-lg shadow">
            <h2 className="text-lg font-semibold">{test.name}</h2>
            <p>{test.description}</p>
            <p><strong>Price:</strong> ₹{test.price}</p>
            <p><strong>Gold Price:</strong> ₹{test.goldPrice}</p>
            <p><strong>Category:</strong> {test.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTests;
