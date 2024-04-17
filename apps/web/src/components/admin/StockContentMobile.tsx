'use client';
import React from 'react';
import { Button, Paper, Typography } from '@mui/material';
import { Stock } from './StockHistory';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
interface StockContentProps extends Stock {
  index: number;
}
const StockContentMobileComponent: React.FC<StockContentProps> = (stock) => {
  return (
    <Paper key={stock.id} className="mb-4 p-4">
      <div className=" flex flex-col bg-green-100 p-5 rounded-lg">
        <div>
          <Typography variant="body1" className="font-bold text-green-800">
            No:{' '}
            <span className="font-normal text-green-600">
              {stock.index + 1}
            </span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            Name:{' '}
            <span className="font-normal text-green-600">{stock.name}</span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            Store:{' '}
            <span className="font-normal text-green-600">{stock.store}</span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            In:{' '}
            <span className="font-normal text-green-600">
              {stock.in.toLocaleString('id-ID')}
            </span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            Out:{' '}
            <span className="font-normal text-green-600">
              {stock.out.toLocaleString('id-ID')}
            </span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            Current Stock:{' '}
            <span className="font-normal text-green-600">
              {stock.totalStock.toLocaleString('id-ID')}
            </span>
          </Typography>
        </div>
        <div className="flex justify-end items-center gap-2 mt-2">
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
        </div>
      </div>
    </Paper>
  );
};
export default StockContentMobileComponent;
