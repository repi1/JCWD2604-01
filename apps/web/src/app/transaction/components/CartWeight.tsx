'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddressTransaction from './AddressTransaction';
import { useSelector } from 'react-redux';

const CartWeight = ({ productTotal }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartWeight, setCartWeight] = useState(0);
  const userSelector = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/cart/${userSelector?.id}`,
        );
        const cartData = response.data;
        setCartItems(cartData);

        let totalWeight = 0;
        cartData.forEach((item) => {
          const weight = item.products.weight * item.qty;
          totalWeight += weight;
        });

        setCartWeight(totalWeight);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCart();

    return () => {};
  }, []);

  return (
    <div>
      <h1>Cart Weight: {cartWeight}</h1>
      <AddressTransaction weight={cartWeight} productTotal={productTotal} />
    </div>
  );
};

export default CartWeight;
