'use client';
import React, { ChangeEvent, createContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, Pagination } from '@mui/material';
import { axiosInstance } from '@/axios/axios';
import StockContentMobileComponent from './StockContentMobile';
import StockContentPCComponent from './StockContentPC';
import { useDebounce } from 'use-debounce';

export interface Stock {
  id: string;
  storeId: string;
  store: string;
  productId: string;
  name: string;
  totalStock: number;
  in: number;
  out: number;
}
interface ProductStore {
  date: string;
  productName: string;
  storeId: string;
}

const StockHistoryComponent: React.FC<ProductStore> = ({
  date,
  productName,
  storeId,
}) => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [value] = useDebounce(productName, 500);
  const [value2] = useDebounce(date, 500);
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const fetchStocks = () => {
    axiosInstance()
      .get('/summaries/v8/page/' + page, {
        params: { date, productName, storeId },
      })
      .then((res) => {
        setStocks(res.data.result);
        setPageCount(res.data.pageCount);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchStocks();
  }, [value2, value, storeId, page]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  if (isSmallScreen) {
    return (
      <Box>
        {stocks.map((stock, index) => (
          <StockContentMobileComponent
            {...stock}
            key={stock.id}
            index={index}
          />
        ))}
        <Pagination
          count={pageCount}
          page={page}
          color="primary"
          className=" flex justify-center my-4"
          onChange={handleChange}
        />
      </Box>
    );
  }

  return (
    <>
      <StockContentPCComponent stocks={stocks} />
      <Pagination
        count={pageCount}
        page={page}
        color="primary"
        className=" flex justify-center my-4"
        onChange={handleChange}
      />
    </>
  );
};
export default StockHistoryComponent;
