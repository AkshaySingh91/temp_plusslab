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
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 max-w-[1440px] mx-auto">
          {/* Left Hero Section */}
          <div className="bg-[#f1da6a] rounded-3xl p-6 md:p-8 lg:p-10 flex flex-col justify-between text-black w-full lg:w-1/2 min-h-[300px] lg:min-h-[500px] hover:shadow-2xl transition-shadow duration-300">
            <div className="flex flex-col h-full justify-between text-center">
              <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl font-bold bebas-neue-regular leading-tight">
                 PLUSSLABS 
              </h1>
              <h6 className="text-sm md:text-xl uppercase font-bold  mb-2">Bringing care to life!</h6>
              
              <CustomCarousel>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomCarousel>
              <p className="text-lg md:text-4xl font-semibold rounded-2xl bg-[#191c1e] text-white bebas-neue-regular p-2 md:p-4 text-center mt-4 flex items-center justify-center gap-4"><i className="fa-solid fa-vial-circle-check border-r-2 px-3"></i> 
                TESTS STARTING ONLY AT <span className="md:text-5xl">₹ 50</span>/-
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
                 CALL FOR FREE 
                </h2>
                <p className="text-center text-sm md:text-base opacity-90">
                  Need help with booking your tests?
                </p>
              </div>
              <div className="flex gap-4 text-sm md:text-xl">
              <a 
                href="tel:8237006990" 
                className="rounded-2xl p-2 font-semibold bg-[#260b2e] text-[#f8be88]"
              >
                <i className="fa-solid fa-phone-volume"></i> 8237006990
              </a>
              <a 
                href="tel:8237006990" 
                className="rounded-2xl p-2 font-semibold bg-[#260b2e] text-[#f8be88]"
              >
                <i className="fa-solid fa-phone-volume"></i> 8237006990
              </a>
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
              <div className="bg-gradient-to-br from-[#e9b2cd] to-[#d4a5c0] rounded-3xl p-5 md:p-6 flex flex-col justify-between text-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 backdrop-blur-sm relative overflow-hidden group h-[500px]">
  {/* Decorative elements */}
  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
  <div className="absolute bottom-0 left-0 w-20 h-20 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-lg"></div>
  
  {/* Content container */}
  <div className="relative z-10 flex flex-col h-full">
    {/* Header section - more compact */}
    <div className="flex items-start justify-between mb-3">
      <div>
        <span className="inline-block px-3 py-1 bg-white/30 rounded-full text-xs font-medium mb-2">Premium</span>
        <h3 className="text-xl md:text-2xl font-bold mb-1 text-gray-900">Client Benefits</h3>
        <div className="w-16 h-1 bg-black/70 rounded-full"></div>
      </div>
      <div className="p-2 bg-white/20 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
    
    {/* Main content - condensed */}
    <p className="text-md mb-3 text-gray-800 leading-tight">
      Unlock exclusive advantages designed for our valued clients. Our membership program elevates your experience with us.
    </p>
    
    {/* Benefits list - more compact */}
    <div className="grid grid-cols-2 gap-2 mb-4 mt-5">
      <div className="flex items-start">
        <div className="bg-white/30 p-1.5 rounded-lg mr-2 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-900">25% Discounts</h4>
          <p className="text-xs text-gray-700">On all services</p>
        </div>
      </div>
      
      <div className="flex items-start">
        <div className="bg-white/30 p-1.5 rounded-lg mr-2 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-900">Priority Support</h4>
          <p className="text-xs text-gray-700">24/7 dedicated team</p>
        </div>
      </div>
      
      <div className="flex items-start">
        <div className="bg-white/30 p-1.5 rounded-lg mr-2 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-900">Early Access</h4>
          <p className="text-xs text-gray-700">Preview new services</p>
        </div>
      </div>
      
      <div className="flex items-start">
        <div className="bg-white/30 p-1.5 rounded-lg mr-2 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332
            9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-900">Premium Protection</h4>
          <p className="text-xs text-gray-700">Enhanced warranty</p>
        </div>
      </div>
    </div>
    
    {/* Middle section with testimonial and tiers */}
    <div className="flex flex-col md:flex-row gap-3 mb-4 mt-5">
      {/* Testimonial - simplified */}
      <div className="bg-white/20 rounded-xl p-3 border border-white/30 flex-1">
        <div className="flex items-center mb-1">
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2 text-xs">JD</div>
          <div className="mr-auto">
            <h5 className="font-semibold text-xs text-gray-900">Jane Doe</h5>
          </div>
          <div className="flex">
            {[...Array(4)].map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-xs italic text-gray-700">"The premium benefits have completely transformed my experience!"</p>
      </div>
      
      
    </div>
    
    
  </div>
</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;