import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
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
            <li><a href="#" className="hover:text-yellow-500">Home</a></li>
            <li><a href="#" className="hover:text-yellow-500">Services</a></li>
            <li><a href="#" className="hover:text-yellow-500">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-500">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-lg font-semibold">Our Services</h2>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-yellow-500">Pathology Tests</a></li>
            <li><a href="#" className="hover:text-yellow-500">Health Packages</a></li>
            <li><a href="#" className="hover:text-yellow-500">Home Sample Collection</a></li>
            <li><a href="#" className="hover:text-yellow-500">Corporate Wellness</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold">Follow Us</h2>
          <div className="flex mt-3 space-x-4 justify-center">
            <a href="#" className="text-gray-400 hover:text-yellow-500 text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-500 text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-500 text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-500 text-xl">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-5">
        &copy; {new Date().getFullYear()} Plusslabs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
