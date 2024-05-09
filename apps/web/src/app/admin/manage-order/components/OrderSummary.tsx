import Image from 'next/image';
import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';

const OrderSummary = ({ order }) => {
  async function confirmPayment() {
    try {
      const response = await axios.patch(
        `http://localhost:8000/order/paymentConfirmation/${order.id}`,
      );
      Swal.fire({
        title: 'Good job!',
        text: 'Order Confirmed',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Confirm Order',
        text: 'Something went wrong!',
      });
      console.log(error);
    }
  }
  async function confirmDelivering() {
    try {
      const response = await axios.patch(
        `http://localhost:8000/order/processing/${order.id}`,
      );
      Swal.fire({
        title: 'Good job!',
        text: 'Order Confirmed',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Confirm Order',
        text: 'Something went wrong!',
      });
      console.log(error);
    }
  }
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
        {order.status == 'paymentConfirmation' && (
          <div className="flex gap-5 mt-4">
            <Button
              variant="contained"
              disableElevation
              color="error"
              onClick={confirmPayment}
            >
              Confirm Order
            </Button>
          </div>
        )}
        {order.status == 'processing' && (
          <div className="flex gap-5 mt-4">
            <Button
              variant="contained"
              disableElevation
              color="error"
              onClick={confirmDelivering}
            >
              Confirm to Delivery
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
