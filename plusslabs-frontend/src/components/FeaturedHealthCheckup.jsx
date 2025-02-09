import React, { useState } from "react";

const healthPackages = [
  {
    title: "MEDICARE FULL BODY HEALTH CHECKUP",
    tests: "Includes 10 Tests",
    price: "₹ 2000.00",
    color: "bg-yellow-200",
    category: "FULL BODY CHECKUP",
  },
  {
    title: "DIABETES SCREENING",
    tests: "Includes 22 Tests",
    price: "₹ 2000.00",
    color: "bg-pink-200",
    category: "DIABETES",
  },
  {
    title: "FULL BODY CHECKUP WITH VITAMIN D & B12",
    tests: "Includes 12 Tests",
    price: "₹ 2000.00",
    color: "bg-green-200",
    category: "FULL BODY CHECKUP",
  },
  {
    title: "WOMAN’S HEALTH CHECKUP",
    tests: "Includes 12 Tests",
    price: "₹ 2000.00",
    color: "bg-blue-200",
    category: "WOMEN HEALTH",
  },
];

const categories = [
  "ALL TESTS",
  "FULL BODY CHECKUP",
  "DIABETES",
  "HEART",
  "WOMEN HEALTH",
  "VITAMINS",
  "LIVER",
  "KIDNEY",
  "CANCER",
];

const FeaturedHealthCheckup = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL TESTS");

  const filteredPackages =
    selectedCategory === "ALL TESTS"
      ? healthPackages
      : healthPackages.filter((pkg) => pkg.category === selectedCategory);

  return (
    <section className="w-full py-12 px-6">
      <h2 className="text-3xl font-bold text-black text-center mb-6">
        FEATURED HEALTH CHECK-UP PACKAGES
      </h2>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 ${
              selectedCategory === category ? "bg-gray-300" : "bg-gray-200"
            } text-gray-700 rounded-full text-sm hover:bg-gray-300`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {filteredPackages.map((pkg, index) => (
          <div key={index} className={`${pkg.color} p-6 rounded-lg shadow-md`}>
            <h3 className="text-lg font-semibold">{pkg.title}</h3>
            <p className="text-sm text-gray-700">{pkg.tests}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold">{pkg.price}</span>
              <button className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-gray-700 hover:bg-gray-300">
                🛒 ADD
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedHealthCheckup;
