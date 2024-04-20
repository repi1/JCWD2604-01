import React, { useEffect, useState } from 'react';
import { axiosInstance } from '@/axios/axios';
import SalesLineChart from './SalesLineChart';
import { useDebounce } from 'use-debounce';

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

  return (
    <>
      <SalesLineChart sales={sales} />
    </>
  );
};

export default SalesReportDayComponent;
