import React, { useEffect, useState } from 'react';
import { axiosInstance } from '@/axios/axios';
import SalesLineChart from './SalesLineChart';
import { useDebounce } from 'use-debounce';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
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
  const [sales, setSales] = useState<Sales[]>([]);
  const [value] = useDebounce(date, 500);
  const [isChart, setIsChart] = useState(true);

  const fetchSales = () => {
    axiosInstance()
      .get('/sales/', {
        params: { date, storeId, productId, categoryId },
      })
      .then((res) => {
        setSales(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSales();
  }, [value, storeId, productId, categoryId]);

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
        ;
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-7">
        <SalesTablePCComponent sales={sales} />
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
