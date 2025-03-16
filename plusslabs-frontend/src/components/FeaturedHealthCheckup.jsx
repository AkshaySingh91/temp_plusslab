import React, { useState } from "react";

const healthPackages = [
  {
    title: "MEDICARE FULL BODY HEALTH CHECKUP",
    tests: "Includes 10 Tests",
    price: "₹2000",
    discount: "",
    color:"bg-green-300",
    icon: "https://cdn-icons-png.flaticon.com/512/6124/6124131.png",
    category: "FULL BODY CHECKUP",
  },
  {
    title: "DIABETES SCREENING",
    tests: "Includes 22 Tests",
    price: "₹2000",
    discount: "",
    color:"bg-yellow-300",
    icon: "https://cdn-icons-png.freepik.com/256/3209/3209082.png?semt=ais_hybrid",
    category: "DIABETES",
  },
  {
    title: "FULL BODY CHECKUP WITH VITAMIN D & B12",
    tests: "Includes 12 Tests",
    price: "₹2000",
    icon: "https://cdn-icons-png.flaticon.com/512/4464/4464982.png",
    discount: "",
    color:"bg-pink-300",
    category: "FULL BODY CHECKUP",
  },
  {
    title: "WOMAN’S HEALTH CHECKUP",
    tests: "Includes 12 Tests",
    price: "₹2000",
    icon: "https://cdn-icons-png.flaticon.com/512/2463/2463980.png",
    discount: "",
    color:"bg-blue-400",
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

  const handleBook = () => {
    window.location.href = 'tel:8237006990';
  };

  const filteredPackages =
    selectedCategory === "ALL TESTS"
      ? healthPackages
      : healthPackages.filter((pkg) => pkg.category === selectedCategory);

  return (
    <section className="w-full py-12 px-6">
      <h2 className="text-3xl md:text-6xl bebas-neue-regular font-bold text-black text-center mb-6">
        FEATURED HEALTH CHECK-UP PACKAGES
      </h2>
      <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-6">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-2xl border-[1px] border-gray-400 ${
              selectedCategory === category ? "bg-gray-800 text-white" : "bg-transparent"
            } text-black rounded-full text-[10px] md:text-sm font-semibold md:font-normal`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex overflow-x-auto snap-x snap-mandatory space-x-6 p-4 max-w-7xl mx-auto scrollbar-hide">
  {filteredPackages.map((pkg, index) => (
    <div 
      key={index} 
      className={`snap-start bg-gray-300 rounded-2xl h-60 md:h-80 lg:h-[20rem] min-w-[250px] sm:min-w-[300px] md:min-w-[350px] p-4 md:p-6 flex flex-col gap-3 ${pkg.color} justify-between`}
    >
      {/* Top Section */}
      <div>
        <div className="px-4 py-2">
          <img src={pkg.icon} alt="test" className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
        </div>
        <div className="font-semibold mt-4 text-[18px]">{pkg.title}</div>
        <p className="text-gray-700 text-xs md:text-sm lg:text-base">{pkg.tests}</p>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center">
        <div className="text-lg lg:text-xl font-semibold">{pkg.price}</div>
        <button 
          onClick={handleBook}
          className="bg-black text-white px-4 py-2 rounded-2xl text-sm md:text-base lg:text-2xl hover:bg-gray-800 transition-colors"
        >
          BOOK
        </button>
      </div>
    </div>
  ))}
</div>

    </section>
  );
};

export default FeaturedHealthCheckup;

