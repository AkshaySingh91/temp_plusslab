import React, { useState } from "react";

const AllTests = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discount: 0,
    category: "",
  });

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
      <h1 className="text-2xl font-bold mb-4">Add a New Test</h1>
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg shadow">
        <input type="text" name="name" placeholder="Test Name" value={formData.name} onChange={handleChange} required className="block w-full p-2 border rounded mb-2" />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="block w-full p-2 border rounded mb-2" />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="block w-full p-2 border rounded mb-2" />
        <input type="number" name="discount" placeholder="Discount" value={formData.discount} onChange={handleChange} className="block w-full p-2 border rounded mb-2" />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="block w-full p-2 border rounded mb-2" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Test</button>
      </form>
    </div>
  );
};

export default AllTests;
