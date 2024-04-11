'use client';
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { axiosInstance } from '@/axios/axios';

interface Product {
  id: string;
  name: string;
  totalSales: number;
}

interface StoreId {
  storeId: string;
}

const DashboardTopSales: React.FC<StoreId> = ({ storeId }) => {
  const fetchProducts = () => {
    axiosInstance()
      .get('/summaries/v5', {
        params: { storeId },
      })
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetchProducts();
  }, [storeId]);

  return (
    <List className="w-full max-w-md bg-green-50 shadow-md rounded-lg overflow-hidden">
      {products.map((product) => (
        <ListItem
          key={product.id}
          className="border-b last:border-b-0"
          divider
          style={{ borderBottomColor: '#4caf50' }}
        >
          <ListItemText
            primary={
              <div className="flex justify-between w-full">
                <span className="text-green-700">{product.name}</span>
                <span className="text-right text-green-700">
                  {product.totalSales}
                </span>
              </div>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default DashboardTopSales;
