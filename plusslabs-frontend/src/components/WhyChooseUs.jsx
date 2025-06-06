import React from "react";
import { MoveLeftIcon, Shield, ClipboardCheck } from "lucide-react";

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="w-[95%] m-auto py-20 px-6 text-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute rounded-3xl inset-0 bg-gradient-to-r from-yellow-200 to-yellow-400" />
        <div className="w-full h-full bg-[linear-gradient(30deg,transparent_70%,rgba(255,255,255,0.3)_70%)]" />
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 tracking-tight flex flex-col md:flex-row gap-2 items-center justify-center md:gap-5">
            <i className="fa-solid fa-users"></i>
              Why Choose US
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience excellence in healthcare with our premium services tailored just for you
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {/* Safe & Hygienic Card */}
            <div className="group hover:translate-y-[-8px] transition-all duration-300 ">
              <div className="bg-[#9ee86f] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full  ">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Track Health parameters</h3>
                <p className="text-gray-600 leading-relaxed">
                  Track Health Parameters and view past blood reports easily on your mobile. Thus reduce health risk factors!
                </p>
              </div>
            </div>

            {/* Home Pickup Card */}
            <div className="group hover:translate-y-[-8px] transition-all duration-300">
              <div className="bg-[#fec091] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full  ">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MoveLeftIcon className="w-8 h-8 text-pink-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Easy Home Painless checkup</h3>
                <p className="text-gray-600 leading-relaxed">
                  Easy Home painless checkups which includes ECG, BP, Blood tests, Flu, quick checkup in just 15 minutes!
                </p>
              </div>
            </div>

            {/* Online Reports Card */}
            <div className="group hover:translate-y-[-8px] transition-all duration-300">
              <div className="bg-[#feea66] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full ">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ClipboardCheck className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Partner with Plusslabs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Partner with Plusslabs and add value to your organization with health dashboard & checkup plans
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;