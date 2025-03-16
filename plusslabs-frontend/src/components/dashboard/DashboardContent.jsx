import React from 'react'
import DashboardHeader from './DashboardMaterial'
import Sidebar from './Sidebar'
import Navbar from '../Navbar'

const DashboardContent = () => {
  return (
    <>
      <div>
        <Navbar />
        <Sidebar />
        <DashboardHeader />
    </div>
    <div>

    </div>
    </>
  
  )
}

export default DashboardContent