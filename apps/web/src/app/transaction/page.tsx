import { useEffect, useState } from 'react';
import CartList from './components/CartList';
import CartWeight from './components/CartWeight';
import AddressTransaction from './components/AddressTransaction';
import Navbar from '@/components/Navbar';

const page = () => {
  return (
    <>
      <Navbar />
      <CartList />
    </>
  );
};

export default page;
