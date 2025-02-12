import react from "react";
import Landing from "./components/Landing";
import FeaturedHealthCheckup from "./components/FeaturedHealthCheckup";
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from "./components/footer";
import ConcernHealthCheckups from "./components/ConcernHealthCheckups";
import FunctionSection from "./components/FunctionSection";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/function" element={<FunctionSection />} />
        <Route path="/featured" element={<FeaturedHealthCheckup />} />
        <Route path="/concern" element={<ConcernHealthCheckups />} />
        <Route path="/whychooseus" element={<WhyChooseUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;