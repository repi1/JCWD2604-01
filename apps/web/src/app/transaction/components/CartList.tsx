'use client';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import CartListItem from './CartListItem';
import CartWeight from './CartWeight';
import { useSelector } from 'react-redux';

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrices, setTotalPrices] = useState(0);
  const userSelector = useSelector((state) => state.auth);

  const handlePriceUpdate = (price) => {
    console.log(price);
    setTotalPrices((totalPrices) => totalPrices + price);
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/cart/${userSelector?.id}`,
        );
        const cartData = response.data;
        setCartItems(cartData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchCart();

    return () => {};
  }, []);

  return (
    <div className="lg:flex m-4">
      <div className="lg:w-1/2">
        <h1 className="text-xl font-bold">Your Order: </h1>
        {cartItems ? (
          cartItems.map((item) => (
            <CartListItem
              key={item.products.id}
              item={item}
              onPriceUpdate={handlePriceUpdate}
            />
          ))
        ) : (
          <h1>No Items on Your cart</h1>
        )}
      </div>
      <div className="lg:w-1/2 m-4 p-4 border border-black rounded-md bg-orange-100">
        <h1 className="text-xl font-bold">Your Order: </h1>

        <CartWeight productTotal={totalPrices / 2} />
      </div>
    </div>
  );
};

export default CartList;
