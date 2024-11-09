import Navbar from "../components/Navbar";
import Quote from "../components/Quote";
import About from "../components/About";
import Services from "../components/Services";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <Quote />
            <About />
            <Services />
            <Footer />
        </div>
    );
};

export default HomePage;