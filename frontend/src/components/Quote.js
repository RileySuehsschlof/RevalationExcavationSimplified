import Picture1 from "./Picture1.png";
import "./Quote.css";
function Quote() {
  return (
    <>
      <div className="quoteContainer">
        <img src={Picture1} />
        <div className="quote">
          <p className="quoteP">Revolutionize Your Excavation</p>
          <p className="quoteP">With Revelation Excavation</p>
          <br />
          <p className="quoteP">Digging up Possibilies</p>
        </div>
      </div>
    </>
  );
}
export default Quote;
