import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const api_url = import.meta.env.VITE_API_URL;

const services = [
  // {
  //   title: "View Lab Tests",
  //   imageUrl:
  //     "https://media.istockphoto.com/id/1420900785/vector/simple-and-clean-chemical-test-tube-vector-icon-illustration.jpg?s=612x612&w=0&k=20&c=LoxXUY39CSc0u2JpUFub-6LLHo4Tu3rZQiR_oat5cUg=",
  //   bgColor: "bg-green-300",
  //   path:'view-tests'
  // },
  {
    title: "Visit Past Consultancies",
    imageUrl:
      "https://media.istockphoto.com/id/1065743020/vector/stethoscope-icon.jpg?s=612x612&w=0&k=20&c=k0BDgRcsFea0D_zpbjOn9xgKRarrvo4ZsNjhdHdlajg=",
    bgColor: "bg-orange-200",
    path: 'past-consultancies',
  },
];

const FunctionSection = () => {
  const navigate = useNavigate();

  const handleProtectedLink = async (path) => {
    try {
      const res = await axios.get(`${api_url}/api/auth/profile`, { 
        withCredentials: true 
      });
      if (res.data) {
        navigate(path);
      }
    } catch (error) {
      navigate('/login');
    }
  };

  return (
    <div id="services"  className="flex flex-col justify-center items-center gap-5 md:gap-10 p-4">
      <div>
        <h1 className="text-5xl text-left font-bold bebas-neue-regular">
          OUR SERVICES
        </h1>
      </div>
      <div className="flex gap-5 flex-wrap justify-center items-center">
      {services.map((service, index) => (
        <div
          key={index}
          className={`w-60 p-3 rounded-lg shadow-md flex flex-row items-center cursor-pointer ${service.bgColor}`}
          onClick={()=> handleProtectedLink(service.path)}
        >
          <img
            src={service.imageUrl}
            alt={service.title}
            className="w-20 h-20 object-contain mix-blend-multiply"
          />
          <div className="flex gap-2 items-center mt-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {service.title}
            </h3>
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </div>
        </div>
      ))}
      </div>
     
    </div>
  );
};

export default FunctionSection;
