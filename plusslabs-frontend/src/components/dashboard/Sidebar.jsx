import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();
  return (
    <div className='h-full fixed w-[300px] bg-red-500'>
        <h1 onClick={()=> navigate('all-patients')} className='text-white text-2xl font-bold p-4 cursor-pointer'>
            Add patient
        </h1>
        <h1 onClick={()=> navigate('all-tests')} className='text-white text-2xl font-bold p-4 cursor-pointer'>
            Add tests
        </h1>
        <h1 onClick={()=> navigate('view-patients')} className='text-white text-2xl font-bold p-4 cursor-pointer'>
            View Patients
        </h1>
        <h1 onClick={()=> navigate('view-tests')} className='text-white text-2xl font-bold p-4 cursor-pointer'>
            View Tests
        </h1>
    </div>
  )
}

export default Sidebar