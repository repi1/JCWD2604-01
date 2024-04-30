'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CartListItem from './CartListItem';

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
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

    return () => {
      // Cleanup logic
    };
  }, []);
  return (
    <div>
      <h1>Your Order: </h1>
      {cartItems ? (
        cartItems.map((item) => (
          <CartListItem key={item.products.id} item={item} />
        ))
      ) : (
        <h1>No Items on Your cart</h1>
      )}
    </div>
  );
};

export default CartList;
