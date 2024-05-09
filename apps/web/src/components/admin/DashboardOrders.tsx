'use client';

import { axiosInstance } from '@/axios/axios';
import { useEffect, useState } from 'react';
import NumberAnimator from './numberAnimator';
import { FaShoppingCart } from 'react-icons/fa';

interface StoreId {
  storeId: string;
}

const DashboardOrders: React.FC<StoreId> = ({ storeId }) => {
  const [number, setNumber] = useState(0);
  const fetchNumber = () => {
    axiosInstance()
      .get('/summaries/v1', {
        params: { storeId },
      })
      .then((res) => {
        setNumber(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchNumber();
  }, [storeId]);

  return (
    <div className=" bg-amber-500 rounded-lg shadow-lg p-5 relative flex justify-between items-center">
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Orders Count</h3>
        </div>
        <div className="text-lg">
          <NumberAnimator target={number} />
        </div>
      </div>
      <FaShoppingCart className="text-white" size={32} />{' '}
    </div>
  );
};
export default DashboardOrders;
