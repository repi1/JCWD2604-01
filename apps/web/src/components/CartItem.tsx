'use client';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { TiDelete } from 'react-icons/ti';

const CartItem = ({ item }) => {
  const imageUrl = `http://localhost:8000/${item.products.productPhotos[0].photoURL}`;
  const totalPrice = item.products.price * item.qty;
  const totalWeight = item.products.weight * item.qty;
  function deleteItem() {
    
  }

  return (
    <div className="flex flex-col justify-between border border-lightblue rounded-xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-shrink-0">
          <Image src={imageUrl} height={100} width={100} alt="product image" />
        </div>
        <div className="ml-4">
          <h1 className="text-lg font-semibold">{item.products.name}</h1>
          <h1 className="text-lg font-semibold">
            Total weight: {totalWeight} grams
          </h1>
          <h3 className="text-lg font-semibold">Price: Rp. {totalPrice}</h3>
          <p>Quantity: {item.qty}</p>
        </div>
      </div>
      <TiDelete className="w-6 h-6" onClick={deleteItem}/>
    </div>
  );
};

export default CartItem;
