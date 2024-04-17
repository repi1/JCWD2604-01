'use client';
import React, { useEffect, useState } from 'react';
import DashboardProfit from './DashboardProfit';
import DashboardSales from './DashboardSales';
import DashboardOrders from './DashboardOrders';
import DashboardCancelled from './DashboardCancelled';
import DashboardLatestSale from './DashboardLatestSale';
import DashboardTopSales from './DashboardTopSales';
import { axiosInstance } from '@/axios/axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useSelector } from 'react-redux';
import FilterStoreComponent from './FilterStore';

export interface Store {
  id: string;
  name: string;
}

interface State {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  gender: string;
  birthDate: string;
  role: string;
}
interface Auth {
  auth: State;
}

const DashboardContent = () => {
  const [store, setStore] = useState<string>('');
  const [stores, setStores] = useState<Store[]>([]);
  const userSelector = useSelector((state: Auth) => state.auth);

  const fetchStores = () => {
    axiosInstance()
      .get('summaries/v0')
      .then((res) => {
        setStores(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchStores();
  }, [store]);

  return (
    <div className="text-white">
      <div className="flex gap-10 mb-4 items-center">
        <h2 className="text-3xl font-bold text-green-500">Dashboard</h2>
        {userSelector.role == 'superAdmin' ? (
          <FilterStoreComponent
            store={store}
            stores={stores}
            setStore={setStore}
          />
        ) : (
          ''
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardProfit storeId={store} />
        <DashboardSales storeId={store} />
        <DashboardOrders storeId={store} />
        <DashboardCancelled storeId={store} />
      </div>
      <div className="grid grid-cols-1 lg:flex lg:justify-between gap-4 mt-5">
        <div className="lg:flex-grow lg:basis-3/5">
          <h2 className="text-3xl font-bold mb-4 text-green-500">
            Latest Orders
          </h2>
          <DashboardLatestSale storeId={store} />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4 text-green-500">
            Top Selling Products
          </h2>
          <DashboardTopSales storeId={store} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
