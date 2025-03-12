import React from "react";
import Landing from "./components/Landing";
import FeaturedHealthCheckup from "./components/FeaturedHealthCheckup";
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from "./components/footer";
import ConcernHealthCheckups from "./components/ConcernHealthCheckups";
import FunctionSection from "./components/FunctionSection";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllTests from "./components/AllTests";
import PastConsultancies from "./components/PastConsultancies";
import AllPatients from "./components/AllPatients";
import DashboardContent from "./components/dashboard/DashboardContent";
import ViewPatients from "./components/ViewPatients";
import ViewTests from "./components/ViewTests";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Landing />
            <FunctionSection />
            <FeaturedHealthCheckup />
            <ConcernHealthCheckups />
            <WhyChooseUs />
            <Footer />
          </>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/all-tests" element={<AllTests />} />
        <Route path="/dashboard/all-patients" element={<AllPatients />} />
        <Route path="/dashboard/view-patients" element={<ViewPatients />} />
        <Route path="/dashboard/view-tests" element={<ViewTests />} />


        <Route path="/dashboard" element={<DashboardContent />} />

        <Route path="/past-consultancies" element={<PastConsultancies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;