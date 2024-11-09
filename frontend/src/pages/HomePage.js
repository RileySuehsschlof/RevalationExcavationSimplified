import Navbar from "../components/Navbar";
import Quote from "../components/Quote";
import About from "../components/About";
import Services from "../components/Services";
import Footer from "../components/Footer";
import GoogleMap from "../components/Map";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Quote />
      <About />
      <Services />
      <GoogleMap />
      <Footer />
    </div>
  );
};

export default HomePage;
