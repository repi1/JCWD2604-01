'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  const [sort, setSort] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };
  const userSelector = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/order/${userSelector?.id}`,
        );
        const orderData = response.data;
        if (sort === 'date latest') {
          orderData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          );
        } else if (sort === 'date oldest') {
          orderData.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
          );
        } else if (sort === 'price highest') {
          orderData.sort((a, b) => b.total - a.total);
        } else if (sort === 'price lowest') {
          orderData.sort((a, b) => a.total - b.total);
        }

        setOrderList(orderData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchOrder();

    return () => {};
  }, [orderList, sort]);
  return (
    <>
      <div className="m-4">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Sort By"
            onChange={handleChange}
          >
            <MenuItem value="date latest">Date latest</MenuItem>
            <MenuItem value="date oldest">Date oldest</MenuItem>
            <MenuItem value="price highest">price highest</MenuItem>
            <MenuItem value="price lowest">price lowest</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div>
        {orderList.map((order) => (
          <OrderItem order={order} key={order.id} />
        ))}
      </div>
    </>
  );
};

export default OrderList;
