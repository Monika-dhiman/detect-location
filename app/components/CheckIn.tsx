"use client";
import React, { useState } from "react";
interface Location {
  latitude: number;
  longitude: number;
}
const CheckIn = () => {
  const [location, setLocation] = useState<Location | null>(null);

  function errorFunc() {
    console.log("Unable to retrieve your location");
  }
  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, errorFunc);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  }

  // Make API call to OpenWeatherMap

  return (
    <div>
      {!location ? (
        <button onClick={handleLocationClick}>Get Lat & Long</button>
      ) : null}
      {location ? (
        <>
          <p>
            Latitude: {location.latitude} Longitude: {location.longitude}
          </p>
          <br />
          <button onClick={() => window.location.reload()}>Refresh</button>
        </>
      ) : null}
    </div>
  );
};

export default CheckIn;
