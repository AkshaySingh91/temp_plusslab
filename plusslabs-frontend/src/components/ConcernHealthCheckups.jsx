import React, { useState } from "react";

const ConcernHealthCheckups = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Dummy image for now, replace with your own
  const imageMap = {
    "https://img.freepik.com/free-vector/illustrated-seniors-focusing-health_53876-37198.jpg": "/assets/gym.png",
    "https://img.freepik.com/free-vector/male-friends-exercising-gym-together_74855-7600.jpg?semt=ais_hybrid": "/assets/elder.png",
    "https://proactiveforher.com/_next/image/?url=https%3A%2F%2Fpfh-images-production.s3.ap-south-1.amazonaws.com%2FHero_Image_1_e54d12f321.png&w=3840&q=75":
      "/assets/gym.png",
  };

  return (
    <div className="w-full py-12 px-6">
      <h2 className="text-3xl md:text-6xl bebas-neue-regular font-bold text-black text-center mb-6">
        FIND TESTS BY HEALTH CONCERN
      </h2>
      <div className="flex flex-wrap justify-around gap-5 lg:px-36 flex-row">
        <div
          className="h-60 w-80 bg-[#feeb68] rounded-2xl p-5 relative overflow-hidden cursor-pointer"
          onClick={() => setSelectedImage(imageMap["/assets/elder.png"])}
        >
          <h1 className="text-lg text-gray-800 font-semibold w-[75%]">
            Senior Citizen Health Checkup
          </h1>
          <h2 className="text-[13px] w-1/2 mt-2 text-gray-600">
            Offering 20+ tests concerned to Senior citizens.
          </h2>
          <h1 className="text-[12px] mt-5">Starts at</h1>
          <h1 className="text-2xl font-bold bebas-neue-regular">Rs.999/- Only</h1>
          <img
            src="/assets/snior-gym.png"
            alt=""
            height={250}
            width={250}
            className="absolute top-12 md:top-8 left-40"
          />
        </div>

        <div
          className="h-60 w-80 bg-[#a0e2e1] rounded-2xl p-5 relative overflow-hidden cursor-pointer"
          onClick={() => setSelectedImage(imageMap["/assets/gym.png"])}
        >
          <h1 className="text-lg text-gray-800 font-semibold w-[50%] z-10">
            Gym Package for always staying healthy Checkup
          </h1>
          <h2 className="text-[13px] w-1/2 mt-2 text-gray-600">
            Offering 20+ tests concerned to Senior citizens.
          </h2>
          <h1 className="text-[12px] mt-2">Starts at</h1>
          <h1 className="text-2xl font-bold bebas-neue-regular">Rs.299/- Only</h1>
          <img
            src="/assets/male-gym.png"
            alt=""
            height={50}
            width={50}
            className="absolute h-60 w-64 top-0 left-24 md:left-32 -z-9"
          />
        </div>

        <div
          className="h-60 w-80 bg-[#fec091] rounded-2xl p-5 relative overflow-hidden cursor-pointer"
          onClick={() =>
            setSelectedImage(
              imageMap[
                "https://proactiveforher.com/_next/image/?url=https%3A%2F%2Fpfh-images-production.s3.ap-south-1.amazonaws.com%2FHero_Image_1_e54d12f321.png&w=3840&q=75"
              ]
            )
          }
        >
          <h1 className="text-lg text-gray-800 font-semibold w-[75%]">
            Women's staying strong health Checkup
          </h1>
          <h2 className="text-[13px] w-1/2 mt-2 text-gray-600">
            Offering 20+ tests concerned to Senior citizens.
          </h2>
          <h1 className="text-[12px] mt-5">FLAT</h1>
          <h1 className="text-2xl font-bold bebas-neue-regular">10% Discount</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/512/6401/6401473.png"
            alt=""
            height={200}
            width={200}
            className="absolute bottom-0 left-36 "
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
    </div>
  );
};

export default ConcernHealthCheckups;
