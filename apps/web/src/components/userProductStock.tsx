'use client';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiosInstance } from '@/axios/axios';

function UserProductStock({ params }) {
  const [product, setProduct] = useState(null); // Initialize as null to handle initial loading state
  const userSelector = useSelector((state) => state.auth);
  const { productId } = params;

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axiosInstance().get(`/products/${productId}/`, {
          params: {
            storeId: userSelector.storeId,
          },
        });
        setProduct(response.data.result);
      } catch (error) {
        console.error('Error fetching product:', error);
        // Optionally handle error state
      }
    }

    fetchProduct();
  }, [productId, userSelector.storeId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-4/5">
      <div id="productName" className="font-bold text-3xl mb-5">
        Name: {product.name}
      </div>
      <div className="font-bold text-3xl">
        Category: {product.categories ? product.categories.name : 'No category'}
      </div>
      <div className="my-2">
        <div className="font-bold text-2xl flex">
          Price:
          <div className="font-bold text-2xl text-green-600 pl-2">
            {product.price}
          </div>
        </div>
        <div className="font-bold text-2xl flex">
          Stock:
          <div className="font-bold text-2xl text-green-600 pl-2">
            {product.stocks ? product.stocks[0].stock : '0'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProductStock;
