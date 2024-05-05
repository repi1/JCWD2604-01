import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Address from './Address';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const AddressSection = ({ user }) => {
  const [address, setAddress] = useState([]);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const userSelector = useSelector((state) => state.auth);

  const apiKey = 'f5df53c750014d129128dc96143e3feb';

  const getAddressFromCoordinate = async (latitude, longitude, apiKey) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`,
      );
      const formattedAddress = response.data.results[0].formatted;
      setCity(response.data.results[0].components.city);
      setLocation(formattedAddress);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLoading(true);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          if (latitude !== null && longitude !== null) {
            getAddressFromCoordinate(latitude, longitude, apiKey);
          }
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  async function addAddress() {
    try {
      // userId, latitude, longitude, city, streetName
      const response = await axios.post('http://localhost:8000/address', {
        userId: userSelector.id,
        latitude: String(latitude),
        longitude: String(longitude),
        streetName: location,
        city: city,
      });
      setShowAddAddress(false);
      Swal.fire({
        title: 'Good job!',
        text: 'You clicked the button!',
        icon: 'success',
      });
    } catch (error) {
      console.log('failed to create Location');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to Add Address!',
      });
      console.log(user.id, latitude, longitude, location, city);
    }
  }

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/address/${user.id}`,
        );
        const addressData = response.data;
        setAddress(addressData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchAddress();

    return () => {
      // Cleanup logic
    };
  }, []);
  return (
    <>
      <div>
        {address &&
          address.map((item) => <Address address={item} key={item.id} />)}
      </div>
      {showAddAddress && (
        <div className="flex flex-col">
          <h1>{latitude}</h1>
          <h1>{longitude}</h1>
          <h1>{location}</h1>
          <h1>{city}</h1>
          <button type="submit" onClick={getCurrentLocation}>
            Use Current Location
          </button>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={addAddress}
              >
                Add This Address
              </button>
            </div>
          )}
        </div>
      )}
      {!showAddAddress && (
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setShowAddAddress(true)}
        >
          Add Address
        </button>
      )}
    </>
  );
};

export default AddressSection;
