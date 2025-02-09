import react from "react";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import FeaturedHealthCheckup from "./components/FeaturedHealthCheckup";
import WhyChooseUs from "./components/WhyChooseUs";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <Landing />
      <FeaturedHealthCheckup />
      <WhyChooseUs />
      <Footer />

    </>
  );
}

export default App;
