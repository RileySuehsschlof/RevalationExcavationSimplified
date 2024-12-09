import React from "react";
import Navbar from "../components/Navbar";
import Quote from "../components/Quote";
import About from "../components/About";
import Services from "../components/Services";
import Footer from "../components/Footer";
import GoogleMap from "../components/Map";
import GoogleReview from "../components/GoogleReview"; 

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Quote />
      <About />
      <Services />
      <GoogleMap />
      <GoogleReview /> 
      <Footer />
    </div>
  );
};

export default HomePage;
