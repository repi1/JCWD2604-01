'use client';
import Typography from '@mui/material/Typography';
import FilterStoreComponent from '@/components/admin/FilterStore';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/axios/axios';
import SalesReportDayComponent from '@/components/admin/SalesReportDay';
import moment from 'moment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FilterEntriesComponent from '@/components/admin/FilterEntries';

export interface Store {
  id: string;
  name: string;
}
const currentDate = moment().format('YYYY-MM');
export default function Home() {
  const [selector, setSelector] = useState('');
  const [id, setId] = useState('');
  const [store, setStore] = useState<string>('');
  const [stores, setStores] = useState<Store[]>([]);
  const [date, setDate] = useState(currentDate);
  const [productId, setProducitId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelector(event.target.value);
    setId('');
  };
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
  }, [store, id]);

  useEffect(() => {
    if (!selector) {
      setCategoryId('');
      setProducitId('');
    }
  }, [selector]);
  return (
    <Typography paragraph>
      <h2 className="text-3xl font-bold text-green-500 mb-4">Sales Report</h2>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-10 lg:mb-4 lg:items-center">
        <input
          type="month"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <FilterStoreComponent
          store={store}
          stores={stores}
          setStore={setStore}
        />
        <FormControl style={{ minWidth: 120 }}>
          <InputLabel>Filter By</InputLabel>
          <Select value={selector} label="Filter By" onChange={handleChange}>
            <MenuItem value={''}>None</MenuItem>
            <MenuItem value={'category'}>Category</MenuItem>
            <MenuItem value={'product'}>Product Name</MenuItem>
          </Select>
        </FormControl>
        {selector ? (
          <FilterEntriesComponent
            selector={selector}
            setProductId={setProducitId}
            setCategoryId={setCategoryId}
          />
        ) : (
          ''
        )}
      </div>
      <div className="flex gap-10 mb-4 items-center"></div>
      <SalesReportDayComponent
        date={date}
        productId={productId}
        storeId={store}
        categoryId={categoryId}
      />
    </Typography>
  );
}
