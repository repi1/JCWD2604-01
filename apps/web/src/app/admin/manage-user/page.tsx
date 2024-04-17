'use client';
import Typography from '@mui/material/Typography';
import UserManageComponent from '@/components/admin/UserManage';
import FilterStoreComponent from '@/components/admin/FilterStore';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/axios/axios';
import { TextField } from '@mui/material';
import { useDebounce } from 'use-debounce';
export interface Store {
  id: string;
  name: string;
}
export default function Home() {
  const [search, setSearch] = useState('');
  const [store, setStore] = useState<string>('');
  const [stores, setStores] = useState<Store[]>([]);
  const [value] = useDebounce(search, 500);
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
  }, [value, store]);
  return (
    <Typography paragraph>
      <div className="flex gap-10 mb-4 items-center">
        <h2 className="text-3xl font-bold text-green-500 mb-4">
          User Management
        </h2>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FilterStoreComponent
          store={store}
          stores={stores}
          setStore={setStore}
        />
      </div>
      <UserManageComponent email={search} storeId={store} />
    </Typography>
  );
}
