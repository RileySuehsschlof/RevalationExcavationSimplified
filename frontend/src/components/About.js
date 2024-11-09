import "./About.css";
import Picture2 from "./Picture2.png";
function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h2 className="aboutH2">About us</h2>
          <p className="aboutP">
            Revelation Excavation is an owner operated excavation business
            delivering quality and honest service. With 15 years of experience,
            we specialize in all types of excavation bringing efficiency and
            precision while providing exemplary customer service. Whatever your
            excavation needs may be, from fine grading to a complex foundation,
            we are here to help. Fully Insured and WCB compliant. Contact us
            today for more information and a free quote.
          </p>
        </div>
        <div className="about-image">
          <img src={Picture2} alt="Excavator" />
        </div>
      </div>
    </div>
  );
}

export default About;
