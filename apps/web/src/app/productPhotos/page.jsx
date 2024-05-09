'use client';
import { axiosInstance, axiosInstanceSSR } from '@/axios/axios';
import Link from '@mui/material/Link';
import { useState, useEffect } from 'react';

// export const metadata = {
//   title: 'Product Detail',
//   description: 'tempat jualan :)',
// };

function Page() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const button = document.getElementById('detect-location-button');
    if (button) {
      button.addEventListener('click', handleDetectLocation);
    }

    return () => {
      button.removeEventListener('click', handleDetectLocation);
    };
  }, []);

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        },
      );
    } else {
      setError('Browser not supported');
    }
  };

  return (
    <div>
      <form>{/* your form fields */}</form>
      <div>
        <div id="location_details">
          {location ? (
            <p>
              Your location: {location.latitude}, {location.longitude}
            </p>
          ) : (
            <p>No location detected</p>
          )}
          {error ? <p>Error: {error}</p> : null}
        </div>
        <button id="detect-location-button">Detect your location</button>      
      </div>
    </div>
  );
}

export default Page;
