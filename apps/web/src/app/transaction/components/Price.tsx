'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Price = () => {
  const [cartItems, setCartItems] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cart/1');
        const cartData = response.data;
        setCartItems(cartData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCart();

    return () => {};
  }, []);
  return <div>Price: {cartItems[0].price}</div>;
};

export default Price;
