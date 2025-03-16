import React, { useState } from "react";
import axios from "axios"; // Add missing import

const AllTests = () => {
  const [formData, setFormData] = useState({
    testCode: "",
    name: "",
    description: "",
    price: "",
    discount: 0,
    category: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [testId, setTestId] = useState(null);

  const handleTestCodeChange = async (e) => {
    const code = e.target.value;
    setFormData(prev => ({ ...prev, testCode: code }));

    if (!code) {
      // Clear form when test code is removed
      setFormData({
        testCode: "",
        name: "",
        description: "",
        price: "",
        discount: 0,
        category: "",
      });
      setIsEditing(false);
      setTestId(null);
      return;
    }

    if (code.length >= 3) {
      try {
        const response = await axios.get(`http://localhost:3000/api/tests/code/${code}`);
        if (response.data) {
          setIsEditing(true);
          setTestId(response.data._id);
          setFormData({
            testCode: response.data.testCode,
            name: response.data.name,
            description: response.data.description,
            price: response.data.price,
            discount: response.data.discount,
            category: response.data.category,
          });
        }
      } catch (error) {
        setIsEditing(false);
        setTestId(null);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generate a random test code if none is provided
  const generateTestCode = () => {
    return 'T' + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        testCode: formData.testCode || generateTestCode(),
      };

      if (isEditing && testId) {
        await axios.put(`http://localhost:3000/api/tests/update/${testId}`, dataToSubmit);
        alert("Test updated successfully!");
      } else {
        const response = await axios.post("http://localhost:3000/api/tests/add", dataToSubmit);
        if (response.status === 201) {
          alert("Test added successfully!");
          setFormData({ testCode: "", name: "", description: "", price: "", discount: 0, category: "" });
        }
      }
      setIsEditing(false);
      setTestId(null);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to process request");
    }
  };

  return (
    <div className="h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">{isEditing ? "Update Test" : "Add a New Test"}</h1>
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg shadow">
        <input 
          type="text" 
          name="testCode" 
          placeholder="Test Code" 
          value={formData.testCode} 
          onChange={handleTestCodeChange}
          required 
          className="block w-full p-2 border rounded mb-2" 
        />
        <input type="text" name="name" placeholder="Test Name" value={formData.name} onChange={handleChange} required className="block w-full p-2 border rounded mb-2" />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="block w-full p-2 border rounded mb-2" />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="block w-full p-2 border rounded mb-2" />
        <input type="number" name="discount" placeholder="Discount" value={formData.discount} onChange={handleChange} className="block w-full p-2 border rounded mb-2" />
        <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} required className="block w-full p-2 border rounded mb-2" />
        <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isEditing ? "Update Test" : "Add Test"}
        </button>
      </form>
    </div>
  );
};

export default AllTests;
