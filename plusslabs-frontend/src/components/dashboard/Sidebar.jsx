import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div className='h-full fixed w-[300px] border-r-2 border-black flex justify-start items-center text-center flex-col'>
        <h1 className='bg-[#191c1e] border-black border-2 text-3xl bebas-neue-regular p-5 w-[85%] mt-5 rounded-2xl text-center text-white'><i className="fa-solid fa-user-tie mr-2"></i> ADMIN DASHBOARD</h1>
        <h1 onClick={()=> navigate('all-patients')} className='text-gray-800 font-semibold text-3xl p-4 cursor-pointer hover:bg-[#191c1e] hover:text-white rounded-2xl w-[95%] mt-5 bebas-neue-regular'>
            Add Patient
        </h1>
        <h1 onClick={()=> navigate('all-tests')} className='text-gray-800 text-3xl font-semibold p-4 cursor-pointer hover:bg-[#191c1e] hover:text-white rounded-2xl w-[95%] bebas-neue-regular'>
            Add Tests
        </h1>
        <h1 onClick={()=> navigate('view-patients')} className='text-gray-800 text-3xl font-semibold p-4 cursor-pointer hover:bg-[#191c1e] hover:text-white rounded-2xl w-[95%] bebas-neue-regular'>
            View Patients
        </h1>
        <h1 onClick={()=> navigate('view-tests')} className='text-gray-800 text-3xl font-semibold p-4 cursor-pointer hover:bg-[#191c1e] hover:text-white rounded-2xl w-[95%] bebas-neue-regular'>
            View Tests
        </h1>
        <div className='flex flex-col justify-center items-center'>
        <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-white p-1">
          <img
            src="https://res.cloudinary.com/dmo8bqzrx/image/upload/v1745683977/logo_q6sy35.jpg"
            
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        
            <h1 onClick={()=> navigate('/')} className='text-4xl bebas-neue-regular mt-8 cursor-pointer hover:bg-black hover:text-white p-4 rounded-2xl'><i className="fa-solid fa-house-chimney mr-1 -mt-2"></i> HOMEPAGE</h1>
        </div>
    </div>
  )
}

export default Sidebar