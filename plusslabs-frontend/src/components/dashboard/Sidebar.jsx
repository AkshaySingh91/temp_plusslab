import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div className='h-full fixed w-[300px] bg-[wheat] flex justify-start items-center text-center flex-col'>
        <h1 className='bg-red-400 border-black border-2 text-3xl bebas-neue-regular p-5 w-[85%] mt-5 rounded-2xl text-center text-gray-800'><i className="fa-solid fa-user-tie mr-2"></i> ADMIN DASHBOARD</h1>
        <h1 onClick={()=> navigate('all-patients')} className='text-gray-800 font-semibold text-3xl p-4 cursor-pointer hover:bg-[#f1eeee] hover:text-black rounded-2xl w-[95%] mt-5'>
            Add Patient
        </h1>
        <h1 onClick={()=> navigate('all-tests')} className='text-gray-800 text-3xl font-semibold p-4 cursor-pointer hover:bg-[#f1eeee] hover:text-black rounded-2xl w-[95%]'>
            Add Tests
        </h1>
        <h1 onClick={()=> navigate('view-patients')} className='text-gray-800 text-3xl font-semibold p-4 cursor-pointer hover:bg-[#f1eeee] hover:text-black rounded-2xl w-[95%]'>
            View Patients
        </h1>
        <h1 onClick={()=> navigate('view-tests')} className='text-gray-800 text-3xl font-semibold p-4 cursor-pointer hover:bg-[#f1eeee] hover:text-black rounded-2xl w-[95%]'>
            View Tests
        </h1>
    </div>
  )
}

export default Sidebar