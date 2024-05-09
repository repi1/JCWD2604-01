'use client';

import { axiosInstance } from '@/axios/axios';
import { useEffect, useState } from 'react';
import NumberAnimator from './numberAnimator';
import { FaDollarSign } from 'react-icons/fa';

interface StoreId {
  storeId: string;
}
const DashboardProfit: React.FC<StoreId> = ({ storeId }) => {
  const [number, setNumber] = useState(0);
  const fetchNumber = () => {
    axiosInstance()
      .get('/summaries/v4', {
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
    <div className=" bg-green-500 rounded-lg shadow-lg p-5 relative flex justify-between items-center">
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Profit</h3>
        </div>
        <div className="text-lg flex">
          IDR &nbsp;
          <NumberAnimator target={number} />
        </div>
      </div>
      <FaDollarSign className="text-white" size={32} />{' '}
    </div>
  );
};
export default DashboardProfit;
