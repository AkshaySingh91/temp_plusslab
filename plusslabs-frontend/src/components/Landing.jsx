import React from "react";
import Navbar from "./Navbar";
import CustomCarousel from "../utils/customer-slider/custom.slider.jsx"; // Make sure the file name matches
const images = [
  {
    imgURL:
      "https://www.metropolisindia.com/newdata/landing_page/savetax23_12_2024_04_51_28_90_1736336300.webp",
    imgAlt: "img-1"
  },
  {
    imgURL:
      "https://www.metropolisindia.com/newdata/images/bannerimages/Metropolis-web-banner-1-with-text.webp",
    imgAlt: "img-2"
  },
  {
    imgURL:
      "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    imgAlt: "img-3"
  },
  {
    imgURL:
      "https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    imgAlt: "img-4"
  }
];
const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 max-w-[1440px] mx-auto">
          {/* Left Hero Section */}
          <div className="bg-[#f1da6a] rounded-3xl p-6 md:p-8 lg:p-10 flex flex-col justify-between text-black w-full lg:w-1/2 min-h-[300px] lg:min-h-[500px] hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col h-full justify-between text-center">
              <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-9xl font-bold bebas-neue-regular leading-tight">
                + PLUSSLABS 
              </h1>
              <h6 className="text-xl uppercase font-bold bebas-neue-regular">Bringing care to life!</h6>
              
              <CustomCarousel>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomCarousel>
              <p className="text-lg md:text-xl mt-4 max-w-xl">
                TESTS STARTING ONLY AT ₹ 50 /-
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6">
            {/* Top Right - Doctor Consultation */}
            <div className="bg-[#260b2e] rounded-3xl p-6 md:p-8 flex flex-col gap-5 md:flex-row items-center justify-between text-[#f8be88]  ">
              <div className="">
                <h2 className="text-2xl md:text-4xl font-bold mb-3 bebas-neue-regular">
                 CALL FOR FREE 
                </h2>
                <p className="text-center text-sm md:text-base opacity-90">
                  Need help with booking your tests?
                </p>
              </div>
              <div className="flex md:flex-col gap-2">
              <div className=" rounded-2xl p-2 font-semibold bg-[#f8be88] text-black "><i class="fa-solid fa-phone-volume"></i> 8237006990</div>
              <div className=" rounded-2xl p-2 font-semibold bg-[#f8be88] text-black "><i class="fa-solid fa-phone-volume"></i> 8237006990</div>
              </div>
              
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 flex-1">
              {/* Healthy Lifestyle Card */}
              <div className="bg-[#fef8ec] text-black rounded-3xl p-6 shadow-lg  transition-all duration-300 flex flex-col gap-4 text-center md:text-left overflow-hidden relative h-[500px] md:min-h-[520px]">
                  <span className="text-[10px] border border-gray-800 p-1 rounded-md inline-block w-fit">
                    MOST POPULAR
                  </span>
                  <h1 class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 font-bold text-3xl">GOLD MEMBERSHIP</h1>
                  <div className="flex flex-col gap-5 ">
                  <h2 className="text-3xl text-left text-[#0f4726] font-semibold">Membership has --</h2>
                  <h2 className="text-5xl text-center text-[#0f4726] font-bold bebas-neue-regular">It's Perks</h2>
                  <div className="flex flex-col gap-3 justify-center itemce\">
                  <h2 className="text-left text-sm md:text-[18px] font-semibold text-[#0f4726]"><i className="fa-solid fa-tag text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> 20% off <br />on all tests</h2>
                  <h2 className="text-left text-sm md:text-[18px] font-semibold text-[#0f4726]"><i className="fa-solid fa-clipboard text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> View past <br /> Consultancies</h2>
                  <h2 className="text-left text-sm md:text-[18px] font-semibold text-[#0f4726]"><i className="fa-solid fa-clock text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></i> Get Reports <br /> within 2 hrs</h2>
                 
                  </div>
                
                  </div>
                  <button className="bg-[#0f4726] px-5  py-2 text-white absolute bottom-4 rounded-2xl ">Discover the benefits</button>
                  <img src="/assets/doctor-member.png" alt="" className="absolute -right-16 bottom-0 h-[300px] w-[250px]"/>


              </div>

              {/* Benefits Card */}
              <div className="bg-[#e7c2d4] rounded-3xl p-6 flex flex-col justify-between text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3">
                    Client Benefits
                  </h3>
                  <p className="text-sm md:text-base mb-4 opacity-90">
                    Enjoy discounts, priority support, and more with our premium memberships.
                  </p>
                </div>
                <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-900 transition-colors w-fit">
                  Explore Benefits
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;