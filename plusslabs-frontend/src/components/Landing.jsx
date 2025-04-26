import React from "react";
import Navbar from "./Navbar";
import CustomCarousel from "../utils/customer-slider/custom.slider.jsx"; // Make sure the file name matches
const images = [
  {
    imgURL:
      "/assets/2.png",
    imgAlt: "img-1",
  },
  {
    imgURL:
      "/assets/3.png",
    imgAlt: "img-2",
  },
  {
    imgURL:
      "/assets/4.png",
    imgAlt: "img-3",
  },
  {
    imgURL:
      "/assets/1.png",
    imgAlt: "img-4",
  },
];

const healthMetrics = [
  {
    icon: "/assets/trans-fat.png",
    name: "Fat",
    value: "25%",
  },
  {
    icon: "/assets/weakness.png",
    name: "Muscle %",
    value: "70%",
  },
  {
    icon: "/assets/bone.png",
    name: "Bone Mass",
    value: "3.2kg",
  },
  {
    icon: "/assets/cholesterol.png",
    name: "Cholesterol",
    value: "220mg/dl",
  },
  {
    icon: "/assets/high-blood-sugar-1.png",
    name: "Sugar Level",
    value: "125mg/dl",
  },
  {
    icon: "/assets/blood-pressure-1.png",
    name: "Blood Pressure",
    value: "120/85mmHg",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 max-w-[1440px] mx-auto">
          {/* Left Hero Section */}
          <div className="bg-[#f1da6a] rounded-3xl p-6 md:p-8 lg:p-8 flex flex-col justify-between text-black w-full lg:w-1/2 min-h-[300px] lg:min-h-[500px] hover:shadow-2xl transition-shadow duration-300 relative">
            <div className="flex flex-col h-full justify-between text-center">
              {/* <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl font-bold bebas-neue-regular leading-tight">
                PLUSSLABS
              </h1>
              <h6 className="text-sm md:text-xl uppercase font-bold  mb-2">
                Bringing care to You!
              </h6> */}
              <div className="overflow-hidden w-full h-24 ">
              <img src="/assets/plusslogo.png" alt="" className="h-40 w-80 -mt-7 mx-auto mix-blend-overlay"/>

              </div>
              <CustomCarousel >
                {images.map((image, index) => {
                  return (
                    <img key={index} src={image.imgURL} alt={image.imgAlt} className="h-[200px] md:h-[400px] outline-none border-4 border-white rounded-2xl mt-5"/>
                  );
                })}
              </CustomCarousel>
              <p className="text-lg md:text-4xl font-semibold rounded-2xl bg-[#191c1e] text-white bebas-neue-regular p-2 md:p-4 text-center mt-4 flex items-center justify-center gap-2">
                <i className="fa-solid fa-vial-circle-check border-r-2 px-3"></i>
                TESTS STARS ONLY AT<span className="md:text-5xl">₹ 50</span>
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6">
            {/* Top Right - Doctor Consultation */}
            <div className="bg-[#f8be88] rounded-3xl p-6 md:p-8 flex flex-col gap-5 md:flex-row items-center justify-between text-[#260b2e]">
              <div className="">
                <h2 className="text-4xl font-bold  bebas-neue-regular">
                  <i className="fa-solid fa-headset mr-3"></i>
                  CALL NOW
                </h2>
                <p className="text-center text-sm md:text-base opacity-90">
                  For Home checkup & Blood tests
                </p>
              </div>
              <div className="flex gap-4 text-sm md:text-xl">
                <a
                  href="tel:7276763563"
                  className="rounded-2xl py-2 px-4 font-semibold bg-[#260b2e] text-[#f8be88]"
                >
                  <i className="fa-solid fa-phone-volume"></i> 7276763563
                </a>
                <a
                  href="tel:9022936795"
                  className="rounded-2xl py-2 px-4 font-semibold bg-[#260b2e] text-[#f8be88]"
                >
                  <i className="fa-solid fa-phone-volume"></i> 9022936795
                </a>
              </div>
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 flex-1">
              {/* Healthy Lifestyle Card */}

              {/* Benefits Card - Keep original height */}
              <div className="bg-pink-300 rounded-3xl p-4 md:p-4 flex flex-col justify-between text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border-white/20 backdrop-blur-sm relative overflow-hidden group h-[550px]">
                {/* Content container */}
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header section */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-block px-3 py-1 bg-white/30 rounded-full text-xs sm:text-sm font-medium mb-2">
                        Premium
                      </span>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 text-gray-900">
                        Track Your Health
                      </h3>
                      <div className="w-16 h-1 bg-black/70 rounded-full"></div>
                    </div>
                    <div className="p-2 bg-white/20 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-800"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="text-sm sm:text-md text-gray-800 leading-tight">
                    Create your Health profile and easily track & check your health data and past reports anywhere and anytime.
                  </p>

                  <div className="w-full h-full py-2 sm:py-4 mx-auto grid grid-cols-2 gap-1 sm:gap-2 justify-center">
                    {healthMetrics.map((health, index) => (
                      <div key={index} className="h-20 sm:h-24 w-[90%] sm:w-36 bg-pink-200 rounded-xl sm:rounded-2xl p-1 sm:p-2 flex flex-col items-center text-center justify-center">
                          <img src={health.icon} alt="icons" className="h-6 w-6 sm:h-8 sm:w-8 mb-1"/>
                          <h1 className="text-xs sm:text-sm font-semibold">{health.name} - {health.value}</h1>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-[#fef8ec] text-black rounded-3xl p-6 shadow-lg  transition-all duration-300 flex flex-col gap-4 text-center md:text-left overflow-hidden relative h-[500px] md:min-h-[550px]">
                <span className="text-[10px] border border-gray-800 p-1 rounded-md inline-block w-fit">
                  MOST POPULAR
                </span>
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 font-bold text-2xl">
                  GOLD MEMBERSHIP
                </h1>
                <div className="flex flex-col gap-5 ">
                  <h2 className="text-3xl text-left text-[#0f4726] font-semibold">
                    Membership has{" "}
                  </h2>
                  <h2 className="text-3xl md:text-4xl text-center text-[#0f4726] font-bold bebas-neue-regular">
                    It's Perks
                  </h2>
                  <div className="flex flex-col gap-3 w-[50%] justify-center itemce\">
                    <h2 className="text-left text-sm md:text-[18px] font-semibold text-[#0f4726]">
                      <i className="fa-solid fa-tag text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i>{" "}
                      Free Doctor & Diet Consultations
                    </h2>
                    <h2 className="text-left text-sm md:text-[18px] font-semibold text-[#0f4726]">
                      <i className="fa-solid fa-clipboard text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i>{" "}
                      Track Reports & Health Online anytime
                    </h2>
                    <h2 className="text-left text-sm md:text-[18px] font-semibold text-[#0f4726]">
                      <i className="fa-solid fa-clock text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i>{" "}
                      Get Special discount on every visit{" "}
                    </h2>
                  </div>
                </div>
                <button className="bg-[#0f4726] px-5  py-2 text-white absolute bottom-12 rounded-2xl ">
                  Discover the benefits
                </button>
                <img
                  src="/assets/doctor-member.png"
                  alt=""
                  className="absolute -right-16 bottom-0 h-[300px] w-[250px]"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
