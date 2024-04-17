'use client';
import Typography from '@mui/material/Typography';
import StockHistoryComponent from '@/components/admin/StockHistory';
import FilterStoreComponent from '@/components/admin/FilterStore';
import { createContext, useEffect, useState } from 'react';
import { axiosInstance } from '@/axios/axios';
import { TextField } from '@mui/material';
import { useDebounce } from 'use-debounce';
import moment from 'moment';
export interface Store {
  id: string;
  name: string;
}
interface DateContextType {
  date: string;
}
const currentDate = moment().format('YYYY-MM');
export const DateContext = createContext<DateContextType>({
  date: currentDate,
});
export default function Home() {
  const [search, setSearch] = useState('');
  const [store, setStore] = useState<string>('');
  const [stores, setStores] = useState<Store[]>([]);
  const [value] = useDebounce(search, 500);
  const [date, setDate] = useState(currentDate);
  const [value2] = useDebounce(date, 500);
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
  }, [value, value2, store]);
  return (
    <DateContext.Provider value={{ date }}>
      <Typography paragraph>
        <h2 className="text-3xl font-bold text-green-500 mb-4">
          Stock History
        </h2>
        <div className="flex gap-10 mb-4 items-center">
          <input
            type="month"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Product Name"
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
        <StockHistoryComponent
          date={date}
          productName={search}
          storeId={store}
        />
      </Typography>
    </DateContext.Provider>
  );
}
