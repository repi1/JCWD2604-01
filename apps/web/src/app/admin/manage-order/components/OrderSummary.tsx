import Image from 'next/image';
import React from 'react';

const OrderSummary = ({ order }) => {
  return (
    <div>
      <div className="p-4 m-4 border border-black rounded-md bg-orange-100">
        {order.ImageUrl != '' && (
          <Image
            src={`http://localhost:8000/${order.ImageUrl}`}
            height={300}
            width={300}
          />
        )}
        <h1 className="font-bold text-2xl underline">{order.invoiceNo}</h1>
        <h1 className="font-bold text-xl">Store:</h1>
        <p>{order.stores.name}</p>
        <p>{order.stores.streetName}</p>
        <h1 className="font-bold text-xl">Destination Address:</h1>
        <p>{order.address.streetName}</p>
        <h1 className="font-bold text-xl">Status:</h1>
        <h1>Status: {order.status}</h1>
        <h1 className="font-bold text-xl">Total</h1>
        <h1 className="text-md font-bold">Rp. {order.total}</h1>
      </div>
    </div>
  );
};

export default OrderSummary;
