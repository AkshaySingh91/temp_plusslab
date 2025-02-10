import react from "react";
import Landing from "./components/Landing";
import FeaturedHealthCheckup from "./components/FeaturedHealthCheckup";
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from "./components/footer";
import ConcernHealthCheckups from "./components/ConcernHealthCheckups";
import FunctionSection from "./components/FunctionSection";

function App() {
  return (
    <>

      
      <Landing />
      <FunctionSection />
      <FeaturedHealthCheckup />
      <ConcernHealthCheckups />
      <WhyChooseUs />
      <Footer />
    </>
  );
}

export default App;
