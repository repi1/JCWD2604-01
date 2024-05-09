'use client';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';

const OrderItem = ({ order }) => {
  const [imageClick, setImageClick] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const imageSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', e.target.elements.image.files[0]);
    setImageUrl(e.target.elements.image.files[0]);

    try {
      const response = await axios.post(
        `http://localhost:8000/order/${order.id}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const uploadedImageUrl = response.data.imageUrl;

      setImageUrl(uploadedImageUrl);
      setImageClick(false);
      const update = await axios.patch(
        `http://localhost:8000/order/paymentPending/${order.id}`,
      );
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  async function cancelOrder() {
    try {
      const response = await axios.delete(
        `http://localhost:8000/order/${order.id}`,
      );
      Swal.fire({
        title: 'Good job!',
        text: 'Order Deleted',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Delete Order',
        text: 'Something went wrong!',
      });
      console.log(error);
    }
  }
  async function confirmOrder() {
    try {
      const response = await axios.patch(
        `http://localhost:8000/order/delivered/${order.id}`,
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
      {order.status == 'paymentPending' && (
        <div className="flex gap-5 mt-4">
          {order.ImageUrl == '' && (
            <div>
              <Button
                variant="contained"
                disableElevation
                onClick={() => setImageClick(!imageClick)}
              >
                Upload Payment
              </Button>
              <Button
                variant="contained"
                disableElevation
                color="error"
                onClick={cancelOrder}
              >
                Cancel Order
              </Button>
            </div>
          )}
        </div>
      )}
      {order.status == 'delivered' && (
        <div className="flex gap-5 mt-4">
          <Button
            variant="contained"
            disableElevation
            color="error"
            onClick={confirmOrder}
          >
            Confirm Delivery
          </Button>
        </div>
      )}

      {imageClick && (
        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          <form encType="multipart/form-data" onSubmit={imageSubmit}>
            <input type="file" name="image" id="imageFile" />
            <input type="submit" value="Upload" />
          </form>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
