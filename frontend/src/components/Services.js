import "./Services.css";
import Picture3 from "./Picture3.png";
import Picture4 from "./Picture4.png";
import Picture5 from "./Picture5.png";
import Picture6 from "./Picture6.png";

function Services() {
  return (
    <>
      <div className="serviceBackground">
        <h2 className="serviceHeader">Services</h2>
        <div className="servicesContainer">
          <div className="service1">
            <img
              className="serviceImg"
              src={Picture3}
              alt="Image Description"
            ></img>
            <h3 className="title">FOUNDATIONS</h3>
            <p className="serviceP">
              Basement digs, underground utilities, foundation repair.
            </p>
          </div>

          <div className="service2">
            <img
              className="serviceImg"
              src={Picture4}
              alt="Image Description"
            ></img>
            <h3 className="title">DEMOLITION</h3>
            <p className="serviceP">
              Demolish old structures safely and efficiently.
            </p>
          </div>

          <div className="service3">
            <img
              className="serviceImg"
              src={Picture5}
              alt="Image Description"
            ></img>
            <h3 className="title">LANDSCAPING</h3>
            <p className="serviceP">
              Rock walls/retaining walls, grading, design.
            </p>
          </div>

          <div className="service4">
            <img
              className="serviceImg"
              src={Picture6}
              alt="Image Description"
            ></img>
            <h3 className="title">FARMS</h3>
            <p className="serviceP">
              Land clearing, Pen Cleaning, Drainage, and anything in between.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Services;
