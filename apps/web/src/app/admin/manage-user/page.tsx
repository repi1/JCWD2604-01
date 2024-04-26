'use client';
import Typography from '@mui/material/Typography';
import UserManageComponent from '@/components/admin/UserManage';
import FilterStoreComponent from '@/components/admin/FilterStore';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/axios/axios';
import { TextField } from '@mui/material';
export interface Store {
  id: string;
  name: string;
}
export default function Home() {
  const [search, setSearch] = useState('');
  const [store, setStore] = useState<string>('');
  const [stores, setStores] = useState<Store[]>([]);
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
    <Typography paragraph>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 lg:mb-4 lg:items-center">
        <h2 className="text-3xl font-bold text-green-500 mb-4">
          User Management
        </h2>
        <FilterStoreComponent
          store={store}
          stores={stores}
          setStore={setStore}
        />
        <TextField
          label="Email"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <UserManageComponent email={search} storeId={store} />
    </Typography>
  );
}
