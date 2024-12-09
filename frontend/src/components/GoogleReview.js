import React from "react";

const GoogleReview = () => {
  return (
    <div className="google-reviews">
      <h2>Google Reviews</h2>
      {/* Embed the SociableKit widget using iframe */}
      <iframe
        src="https://widgets.sociablekit.com/google-reviews/iframe/25495168"
        width="100%" 
        height="500" 
        frameBorder="0"
        style={{ border: "none" }}
        title="Google Reviews"
      ></iframe>
    </div>
  );
};

export default GoogleReview;
