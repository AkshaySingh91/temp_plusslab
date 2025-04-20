import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path, section) => {
    navigate(path);
    // After navigation, scroll to the specific section if provided
    setTimeout(() => {
      if (section) {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
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
          <h2 className="text-lg font-semibold">About Plusslabs</h2>
          <p className="mt-3 text-gray-400">
            Plusslabs is a leading diagnostics company offering a wide range of health services.
          </p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold">Quick Links</h2>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li>
              <button 
                onClick={() => handleNavigation('/')} 
                className="hover:text-yellow-500"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/', 'services')} 
                className="hover:text-yellow-500"
              >
                Services
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/', 'featured-health-packages')} 
                className="hover:text-yellow-500"
              >
                Health Package
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/', 'concern-health-checkups')} 
                className="hover:text-yellow-500"
              >
                HealthCare Service
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/', 'why-choose-us')} 
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
                onClick={() => handleNavigation('/')} 
                className="hover:text-yellow-500"
              >
                Pathology Tests
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavigation('/')} 
                className="hover:text-yellow-500"
              >
                Health Packages
              </button>
            </li>
            <li>
              <button 
                onClick={() => window.location.href = 'tel:8237006990'} 
                className="hover:text-yellow-500"
              >
                Home Sample Collection
              </button>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex items-center space-x-6">
            <a 
              href="#"
              className="hover:text-yellow-400 transition-colors"
            >
              <FaInstagram className="text-2xl" />
            </a>
            
            <a 
              href="#"
              className="hover:text-yellow-400 transition-colors"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            
            <a 
              href="#"
              className="hover:text-yellow-400 transition-colors"
            >
              <FaTwitter className="text-2xl" />
            </a>
            
            <a 
              href="#"
              className="hover:text-yellow-400 transition-colors"
            >
              <FaLinkedinIn className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-5"></div>
        &copy; {new Date().getFullYear()} Plusslabs. All rights reserved.
    
    </footer>
  );
};

export default Footer;
