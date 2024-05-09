'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import KurirCost from './KurirCost';

const AddressTransaction = ({ weight, productTotal }) => {
  const userSelector = useSelector((state) => state.auth);
  const [userAddresses, setUserAddresses] = useState([]);
  const [userActiveAddress, setUserActiveAddress] = useState({});
  const [storeAddresses, setStoreAddresses] = useState([]);
  const [closestStoreAddress, setClosestStoreAddress] = useState({});
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) *
        Math.cos(degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c;

    return distance;
  }

  function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/address/' + userSelector.id,
        );
        const addressesData = response.data;
        setUserAddresses(addressesData);

        const storeResponse = await axios.get('http://localhost:8000/store');
        const storeData = storeResponse.data;
        setStoreAddresses(storeData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchAddresses();

    return () => {};
  }, []);

  useEffect(() => {
    const activeAddress = userAddresses.find((address) => address.isActive);
    if (activeAddress) {
      setUserActiveAddress(activeAddress);
    }
  }, [userAddresses]);

  useEffect(() => {
    let closestStore = {
      id: null,
      distance: Infinity,
    };

    if (storeAddresses.length > 0 && userAddresses.length > 0) {
      for (let i = 0; i < storeAddresses.length; i++) {
        const storeDistance = calculateDistance(
          userActiveAddress.latitude,
          userActiveAddress.longitude,
          storeAddresses[i].latitude,
          storeAddresses[i].longitude,
        );
        if (closestStore.distance > storeDistance) {
          closestStore = {
            id: storeAddresses[i].id,
            distance: storeDistance,
          };
        }
      }
    }
    const closestAddress = storeAddresses.find(
      (address) => address.id == closestStore.id,
    );

    setClosestStoreAddress(closestAddress);
  }, [storeAddresses]);

  return (
    <div>
      {closestStoreAddress && (
        <div>
          <div className="border-b border-gray-500 mb-2 pb-2">
            <h1 className="text-xl font-bold">Destination:</h1>
            <h1>{userActiveAddress.streetName}</h1>

            <h1 className="text-xl font-bold">Closest Store:</h1>
            <h1>{closestStoreAddress.streetName}</h1>
          </div>

          <KurirCost
            userCity={userActiveAddress.city}
            storeCity={closestStoreAddress.city}
            weight={weight}
            productTotal={productTotal}
            storeId={closestStoreAddress.id}
          />
        </div>
      )}
    </div>
  );
};

export default AddressTransaction;
