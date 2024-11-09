import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Quote from "./components/Quote";
import About from "./components/About";
import Services from "./components/Services";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Quote />
      <About />
      <Services />
      <Footer />
    </>
  );
}

export default App;
