"use client";
import React, { useState } from "react";

const ValidateCheckIn = () => {
  const [location, setLocation] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  function errorFunc() {
    console.log("Unable to retrieve your location");
    setError("Unable to retrieve your location");
  }

  async function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, errorFunc);
    } else {
      console.log("Geolocation not supported");
      setError("Geolocation not supported");
    }
  }

  async function success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Check for VPN usage
    const vpnCheck = await checkVPN();
    if (vpnCheck) {
      console.log("VPN detected. Please disable VPN to check-in.");
      setError("VPN detected. Please disable VPN to check-in.");
      return;
    }

    // Validate IP address
    const ipValidation = await validateIP();
    if (!ipValidation) {
      console.log("IP address validation failed.");
      setError("IP address validation failed.");
      return;
    }

    // Additional checks can be added here

    // Make API call to OpenWeatherMap or other services

    console.log(location);
  }

  async function checkVPN() {
    try {
      const response = await fetch("https://ipinfo.io/json");
      const data = await response.json();
      console.log("🚀 ~ checkVPN ~ data:", data);

      return data.vpn || false;
    } catch (error) {
      console.error("Error checking VPN:", error);
      return false;
    }
  }

  async function validateIP() {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      console.log("🚀 ~ validateIP ~ data:", data)
      // Replace 'Expected Country' with the actual expected country
      return data.country === "Expected Country";
    } catch (error) {
      console.error("Error validating IP:", error);
      return false;
    }
  }

  return (
    <div>
      <button onClick={handleLocationClick}>Get Location</button>
      {location ? (
        <>
          <p>
            Latitude: {location.latitude} Longitude: {location.longitude}
          </p>
          <br />
          <button onClick={() => window.location.reload()}>Refresh</button>
        </>
      ) : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
};

export default ValidateCheckIn;
