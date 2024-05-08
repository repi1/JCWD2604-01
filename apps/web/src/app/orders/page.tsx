import React from 'react';
import OrderList from './components/OrderList';
import Navbar from '@/components/Navbar';

const page = () => {
  return (
    <div>
      <Navbar />
      <OrderList />
    </div>
  );
};

export default page;
