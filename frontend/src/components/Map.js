import React, { useEffect, useRef, useState } from "react";

function GoogleMap() {
  const apiKey = process.env.REACT_APP_MAP_KEY;
  const [showDirections, setShowDirections] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null); // Use ref to ensure DOM availability

  //location of business
  const destination = { lat: 52.69778300991096, lng: -113.46285083337204 };

  useEffect(() => {
    function initMap() {
      const mapElement = mapRef.current;

      if (!mapElement) {
        setError("Map element not found!");
        return;
      }

      // Get the user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(userPos);

            // Initialize map
            if (window.google) {
              const map = new window.google.maps.Map(mapElement, {
                //map settings
                zoom: 12,
                center: destination,
                streetViewControl: false,
                fullscreenControl: false,
                mapTypeId: "roadmap",
                mapTypeControl: false,
              });

              // Add markers
              new window.google.maps.Marker({
                position: userPos,
                map: map,
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "#4285F4",
                  fillOpacity: 1,
                  strokeColor: "#ffffff",
                  strokeWeight: 2,
                },
                title: "Your Location",
              });

              new window.google.maps.Marker({
                position: destination,
                map: map,
                title: "Destination",
              });

              // Set up directions service and renderer
              window.map = map;
              window.directionsService =
                new window.google.maps.DirectionsService();
              window.directionsRenderer =
                new window.google.maps.DirectionsRenderer();
              window.directionsRenderer.setMap(map);

              // Hide directions initially
              window.directionsRenderer.setDirections({ routes: [] });
            }
          },
          (error) => {
            setError("Error getting your location: " + error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    }

    // Load the Google Maps API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = initMap; // Set the callback
    document.head.appendChild(script);

    return () => {
      delete window.initMap;
      document.head.removeChild(script);
    };
  }, [apiKey]);

  function toggleRoute() {
    if (!userLocation) {
      setError("Unable to get your current location");
      return;
    }

    setShowDirections((prev) => !prev);

    if (window.directionsService && window.directionsRenderer) {
      const request = {
        origin: userLocation,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      };

      if (showDirections) {
        window.directionsRenderer.setDirections({ routes: [] });
        window.map.setCenter(destination);
        window.map.setZoom(12);
      } else {
        window.directionsService.route(request, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            window.directionsRenderer.setDirections(result);
          } else {
            setError("Directions request failed due to " + status);
          }
        });
      }
    }
  }

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={mapRef}
        id="map"
        style={{ height: "400px", width: "100%" }}
      ></div>
      <button
        onClick={toggleRoute}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 1,
          padding: "10px 20px",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
          width: "fit-content",
        }}
      >
        {showDirections ? "Hide Directions" : "Show Directions"}
      </button>
      {error && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            backgroundColor: "#ff4444",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
            zIndex: 1,
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default GoogleMap;
