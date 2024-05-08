'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';
import { useSelector } from 'react-redux';

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const userSelector = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/order/${userSelector?.id}`,
        );
        const orderData = response.data;
        setOrderList(orderData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchOrder();

    return () => {};
  }, [orderList]);
  return (
    <div>
      {orderList.map((order) => (
        <OrderItem order={order} key={order.id} />
      ))}
    </div>
  );
};

export default OrderList;
