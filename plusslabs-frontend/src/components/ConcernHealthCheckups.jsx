import React from 'react'

const ConcernHealthCheckups = () => {
  return (
    <div className='w-full py-12 px-6'>
      <h2 className="text-3xl md:text-6xl bebas-neue-regular font-bold text-black text-center mb-6">
        FIND TESTS BY HEALTH CONCERN
      </h2>
      <div className='flex flex-wrap justify-around gap-5 lg:px-36 flex-row'>
        <div className='h-60 w-80 bg-[#feeb68] rounded-2xl p-5 relative'>
            <h1 className='text-lg text-gray-800 font-semibold w-[75%]'>Senior Citizen Health Checkup</h1>
            <h2 className='text-[13px] w-1/2 mt-2 text-gray-600'>Offering 20+ tests concerned to Senior citizens. Make them live longer with Plusslabs</h2>
            <h1 className='text-[12px] mt-5'>Starts at</h1>
            <h1 className='text-2xl font-bold bebas-neue-regular'>Rs.999/- Only</h1>
        </div>
        <div className='h-60 w-80 bg-[#a0e2e1] rounded-2xl p-5 relative'>
        <h1 className='text-lg text-gray-800 font-semibold w-[75%]'>Gym Package for always staying healthy Checkup</h1>
        <h2 className='text-[13px] w-1/2 mt-2 text-gray-600'>Offering 20+ tests concerned to Senior citizens. Make them live</h2>
        <h1 className='text-[12px] mt-5'>Starts at</h1>
        <h1 className='text-2xl  font-bold bebas-neue-regular'>Rs.299/- Only</h1>

        </div>
        <div className='h-60 w-80 bg-[#fec091] rounded-2xl p-5 relative'>
        <h1 className='text-lg text-gray-800 font-semibold w-[75%]'>Women's staying strong health Checkup</h1>
        <h2 className='text-[13px] w-1/2 mt-2 text-gray-600'>Offering 20+ tests concerned to Senior citizens. </h2>
        <h1 className='text-[12px] mt-5'>FLAT</h1>
        <h1 className='text-2xl font-bold bebas-neue-regular'>10% Discount</h1>

        </div>
      </div>
    </div>
  )
}

export default ConcernHealthCheckups