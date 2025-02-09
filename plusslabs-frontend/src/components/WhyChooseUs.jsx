import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-[#e7c2d4] py-12 px-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-green-200 p-6 rounded-lg shadow-md">
          <div className="text-green-800 text-3xl mb-4">🔒</div>
          <h3 className="text-lg font-semibold">100% Safe & Hygienic</h3>
          <p className="text-sm text-gray-700">
            Experience hassle-free healthcare with online doctor consultations.
          </p>
        </div>
        <div className="bg-pink-200 p-6 rounded-lg shadow-md">
          <div className="text-pink-800 text-3xl mb-4">📦</div>
          <h3 className="text-lg font-semibold">Home Sample Pick up</h3>
          <p className="text-sm text-gray-700">
            Experience hassle-free healthcare with online doctor consultations.
          </p>
        </div>
        <div className="bg-yellow-200 p-6 rounded-lg shadow-md">
          <div className="text-yellow-800 text-3xl mb-4">📑</div>
          <h3 className="text-lg font-semibold">View Reports Online</h3>
          <p className="text-sm text-gray-700">
            Experience hassle-free healthcare with online doctor consultations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
