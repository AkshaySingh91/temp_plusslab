import React, { useState } from "react";

const ConcernHealthCheckups = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Simplified key-based image map
  const imageMap = {
    firm: "/assets/org.png",
    gym: "/assets/gyms.png",
    school: "/assets/schools.png",
  };

  return (
    <section id="concern-health-checkups" className="w-full py-12 px-6">
      <h2 className="text-3xl md:text-6xl bebas-neue-regular font-bold text-black text-center mb-6">
        SMART HEALTH PLANS FOR ORGANIZATIONS
      </h2>

      <div className="flex flex-wrap justify-around gap-5 lg:px-36 flex-row">
        {/* Firm Card */}
        <div
          className="h-60 w-80 bg-[#feeb68] rounded-2xl p-5 relative overflow-hidden cursor-pointer"
          onClick={() => setSelectedImage(imageMap.firm)}
        >
          <h1 className="text-lg text-gray-800 font-semibold w-[75%]">
            Firm and Organization Checkup
          </h1>
          <h2 className="text-[13px] w-1/2 mt-2 text-gray-600">
            Customized checkups for Employees.
          </h2>
          <button className="text-2xl font-bold bebas-neue-regular mt-5 bg-slate-800 text-white text-center p-2 rounded-xl">
            KNOW MORE
          </button>
          <img
            src="/assets/firm.png"
            alt=""
            height={250}
            width={250}
            className="absolute top-12 md:top-4 left-40"
          />
        </div>

        {/* Gym Card */}
        <div
          className="h-60 w-80 bg-[#a0e2e1] rounded-2xl p-5 relative overflow-hidden cursor-pointer"
          onClick={() => setSelectedImage(imageMap.gym)}
        >
          <h1 className="text-lg text-gray-800 font-semibold w-[50%] z-10">
            Gym wellness services
          </h1>
          <h2 className="text-[13px] w-1/2 mt-2 text-gray-600">
            Track your gym members' health parameters easily.
          </h2>
          <button className="text-2xl font-bold bebas-neue-regular mt-5 bg-slate-800 text-white text-center p-2 rounded-xl">
            KNOW MORE
          </button>
          <img
            src="/assets/male-gym.png"
            alt=""
            height={50}
            width={50}
            className="absolute h-60 w-64 top-0 left-32 md:left-32 -z-9"
          />
        </div>

        {/* School/College Card */}
        <div
          className="h-60 w-80 bg-[#fec091] rounded-2xl p-5 relative overflow-hidden cursor-pointer"
          onClick={() => setSelectedImage(imageMap.school)}
        >
          <h1 className="text-lg text-gray-800 font-semibold w-[75%]">
            Health service for Schools & Colleges
          </h1>
          <h2 className="text-[13px] w-1/2 mt-2 text-gray-600">
            Track your student progress easily
          </h2>
          <button className="text-2xl font-bold bebas-neue-regular mt-5 bg-slate-800 text-white text-center p-2 rounded-xl">
            KNOW MORE
          </button>
          <img
            src="https://cdn-icons-png.flaticon.com/512/6401/6401473.png"
            alt=""
            height={200}
            width={200}
            className="absolute bottom-0 left-40"
          />
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-lg">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-xl text-gray-700 hover:text-gray-900"
            >
              ✖
            </button>
            <img src={selectedImage} alt="Selected Checkup" className="w-full rounded-md" />
          </div>
        </div>
      )}
    </section>
  );
};

export default ConcernHealthCheckups;
