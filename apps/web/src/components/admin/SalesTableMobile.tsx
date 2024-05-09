'use client';
import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { Sales } from './SalesReportDay';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
interface StockContentProps extends Sales {
  index: number;
}
const SalesTableMobileComponent: React.FC<StockContentProps> = (sales) => {
  return (
    <Paper key={sales.index} className="mb-4 p-4">
      <div className=" flex flex-col bg-green-100 p-5 rounded-lg">
        <div>
          <Typography variant="body1" className="font-bold text-green-800">
            Day: <span className="font-normal text-green-600">{sales.day}</span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            Total Sales:{' '}
            <span className="font-normal text-green-600">
              IDR &nbsp;
              {sales.totalSales.toLocaleString('id-ID')}
            </span>
          </Typography>
        </div>
        {/* <div className="flex justify-end items-center gap-2 mt-2">
          <Link href={'/admin/stock-history/' + stock.id}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              className="text-sm bg-blue-500 hover:bg-blue-600"
            >
              Detail
            </Button>
          </Link>
        </div> */}
      </div>
    </Paper>
  );
};
export default SalesTableMobileComponent;
