import React from 'react'

const ConcernHealthCheckups = () => {
  return (
    <div className='w-full py-12 px-6'>
      <h2 className="text-3xl md:text-6xl bebas-neue-regular font-bold text-black text-center mb-6">
        FIND TESTS BY HEALTH CONCERN
      </h2>
      <div className='flex flex-wrap justify-around gap-5 lg:px-36 flex-row'>
        <div className='h-60 w-80 bg-[#feeb68] rounded-2xl p-5 relative overflow-hidden cursor-pointer'>
            <h1 className='text-lg text-gray-800 font-semibold w-[75%]'>Senior Citizen Health Checkup</h1>
            <h2 className='text-[13px] w-1/2 mt-2 text-gray-600'>Offering 20+ tests concerned to Senior citizens. </h2>
            <h1 className='text-[12px] mt-5'>Starts at</h1>
            <h1 className='text-2xl font-bold bebas-neue-regular'>Rs.999/- Only</h1>
            <img src="/assets/elder.png" alt="" height={300} width={300} className='absolute top-12 md:top-4 left-28'/>
        </div>
        <div className='h-60 w-80 bg-[#a0e2e1] rounded-2xl p-5 relative overflow-hidden cursor-pointer'>
        <h1 className='text-lg text-gray-800 font-semibold w-[70%]'>Gym Package for always staying healthy Checkup</h1>
        <h2 className='text-[13px] w-1/2 mt-2 text-gray-600'>Offering 20+ tests concerned to Senior citizens.</h2>
        <h1 className='text-[12px] mt-2'>Starts at</h1>
        <h1 className='text-2xl  font-bold bebas-neue-regular'>Rs.299/- Only</h1>
        <img src="/assets/gym.png" alt="" height={50} width={50} className='absolute h-60 w-64 top-0 left-24 md:left-28'/>

        </div>
        <div className='h-60 w-80 bg-[#fec091] rounded-2xl p-5 relative overflow-hidden cursor-pointer'>
        <h1 className='text-lg text-gray-800 font-semibold w-[75%]'>Women's staying strong health Checkup</h1>
        <h2 className='text-[13px] w-1/2 mt-2 text-gray-600'>Offering 20+ tests concerned to Senior citizens. </h2>
        <h1 className='text-[12px] mt-5'>FLAT</h1>
        <h1 className='text-2xl font-bold bebas-neue-regular'>10% Discount</h1>
        <img src="https://proactiveforher.com/_next/image/?url=https%3A%2F%2Fpfh-images-production.s3.ap-south-1.amazonaws.com%2FHero_Image_1_e54d12f321.png&w=3840&q=75" alt="" height={300} width={300} className='absolute bottom-0 left-32'/>

        </div>
        
      </div>
    </div>
  )
}

export default ConcernHealthCheckups