import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);

  const handleNavigation = (path, section) => {
    navigate(path);
    // After navigation, scroll to the specific section if provided
    setTimeout(() => {
      if (section) {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        window.scrollTo(0, 0);
      }
    }, 100);
  };

  return (
    <footer className="w-[95%] m-auto mt-10 bg-[#191c1e] rounded-tr-[40px] rounded-tl-[40px] text-white py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold">About Pluss labs</h2>
          <p className="mt-3 text-gray-400">
            Pluss labs is a leading diagnostics company offering a wide range of
            health services.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li>
              <button
                onClick={() => handleNavigation("/")}
                className="hover:text-yellow-500"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/", "services")}
                className="hover:text-yellow-500"
              >
                Services
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  handleNavigation("/", "featured-health-packages")
                }
                className="hover:text-yellow-500"
              >
                Health Package
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/", "concern-health-checkups")}
                className="hover:text-yellow-500"
              >
                HealthCare Service
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/", "why-choose-us")}
                className="hover:text-yellow-500"
              >
                Why Us
              </button>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-lg font-semibold">Our Services</h2>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li>
              <button
                onClick={() => handleNavigation("/")}
                className="hover:text-yellow-500"
              >
                Pathology Tests
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/")}
                className="hover:text-yellow-500"
              >
                Health Packages
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "tel:7276763563")}
                className="hover:text-yellow-500"
              >
                Home Sample Collection
              </button>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Our Mail</h2>
          <div className="flex flex-col space-y-3">
            <a
              href="mailto:plusslabscare@gmail.com"
              className="text-gray-400 hover:text-yellow-500"
            >
              plusslabscare@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-5">
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => setShowTerms(true)}
            className="text-gray-400 hover:text-yellow-500"
          >
            Terms & Conditions
          </button>
          <div>
            &copy; {new Date().getFullYear()} Plusslabs. All rights reserved.
          </div>
        </div>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-black p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Terms & Conditions</h2>
              <button
                onClick={() => setShowTerms(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              <p>By using our Site or Services, you agree to these Terms. If you do
              not agree, please do not use our Site.</p> 
              <p>Test results and information provided are for informational purposes only and do
              not replace professional medical advice. Always consult your
              healthcare provider for medical concerns after getting tests done.</p>

              <p>All lab tests must be booked and paid for according to the terms
              provided on our Site. We reserve the right to cancel orders at our
              discretion.</p>
              
              <p>All content, trademarks, logos, graphics, and software
              on this Site are the property of Pluss Labs and are protected by
              applicable intellectual property laws. Unauthorized use is
              prohibited. All content on this Site may not be copied,
              distributed, or modified without permission.</p>

              <p>To the maximum extent permitted by law, we are not liable for any indirect, incidental,
              special, or consequential damages arising out of your use of the
              Site or Services. </p>

              <p>We may terminate or suspend your access to the
              Site without prior notice if you violate these Terms or for any
              reason we deem appropriate. </p>

              <p>We may update these Terms at any time.
              Changes are effective once posted on the Site.</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
