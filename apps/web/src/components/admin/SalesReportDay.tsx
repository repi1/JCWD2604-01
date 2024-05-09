import React, { ChangeEvent, useEffect, useState } from 'react';
import { axiosInstance } from '@/axios/axios';
import SalesLineChart from './SalesLineChart';
import { useDebounce } from 'use-debounce';
import {
  Box,
  Button,
  Pagination,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SalesTablePCComponent from './SalesTablePC';
import SalesTableMobileComponent from './SalesTableMobile';

export interface Sales {
  totalSales: number;
  day: number;
}

interface SalesDay {
  date: string;
  productId: string;
  categoryId: string;
  storeId: string;
}

const SalesReportDayComponent: React.FC<SalesDay> = ({
  date,
  productId,
  categoryId,
  storeId,
}) => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [sales, setSales] = useState<Sales[]>([]);
  const [value] = useDebounce(date, 500);
  const [isChart, setIsChart] = useState(true);
  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const fetchSales = () => {
    if (isChart) {
      axiosInstance()
        .get('/sales/', {
          params: { date, storeId, productId, categoryId },
        })
        .then((res) => {
          setSales(res.data.result);
        })
        .catch((err) => console.log(err));
    } else {
      axiosInstance()
        .get('/sales/page/' + page, {
          params: { date, storeId, productId, categoryId },
        })
        .then((res) => {
          setSales(res.data.result);
          setPageCount(res.data.pageCount);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    fetchSales();
  }, [value, storeId, productId, categoryId, page, isChart]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  if (isChart) {
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-7">
          <SalesLineChart sales={sales} />
          <Button
            sx={{
              color: 'white',
              bgcolor: 'primary.light',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
            onClick={() => {
              setIsChart(false);
              setPage(1);
            }}
          >
            Table / Card View
          </Button>
        </div>
      </>
    );
  }

  if (isSmallScreen) {
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-7">
          <Box>
            {sales.map((sale, index) => (
              <SalesTableMobileComponent {...sale} key={index} index={index} />
            ))}
          </Box>
          <Pagination
            count={pageCount}
            page={page}
            color="primary"
            className=" flex justify-center my-4"
            onChange={handleChange}
          />
          <Button
            sx={{
              color: 'white',
              bgcolor: 'primary.light',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
            onClick={() => {
              setIsChart(true);
            }}
          >
            Chart View
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-7">
        <SalesTablePCComponent sales={sales} />
        <Pagination
          count={pageCount}
          page={page}
          color="primary"
          className=" flex justify-center my-4"
          onChange={handleChange}
        />
        <Button
          sx={{
            color: 'white',
            bgcolor: 'primary.light',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
          onClick={() => {
            setIsChart(true);
          }}
        >
          Chart View
        </Button>
      </div>
    </>
  );
};

export default SalesReportDayComponent;
