'use client';
import React from 'react';
import { Paper, Typography } from '@mui/material';
import { StockDetail } from '@/app/admin/stock-history/[stockId]/page';
import moment from 'moment';

interface StockDetailProps extends StockDetail {
  index: number;
}

function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

const StockDetailMobileComponent: React.FC<StockDetailProps> = (stock) => {
  const status = stock.invoiceNo ? 'sold' : stock.status;
  const statusColor =
    status === 'sold'
      ? 'text-green-500'
      : status === 'out'
        ? 'text-red-500'
        : 'text-blue-500';

  return (
    <Paper key={stock.id} className="mb-4 p-4">
      <div className="flex flex-col bg-green-100 p-5 rounded-lg">
        <div>
          <Typography variant="body1" className="font-bold text-green-800">
            No:{' '}
            <span className="font-normal text-green-600">
              {stock.index + 1}
            </span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            Date:{' '}
            <span className="font-normal text-green-600">
              {moment(stock.createdAt).format('DD MMMM YYYY')}
            </span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            Invoice No.:{' '}
            <span className="font-normal text-green-600">
              {stock.invoiceNo ? stock.invoiceNo : '-'}
            </span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            Status:{' '}
            <span className={`font-normal ${statusColor}`}>
              {capitalizeFirstLetter(status)}
            </span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            Qty:{' '}
            <span className="font-normal text-green-600">
              {stock.qty.toLocaleString('id-ID')}
            </span>
          </Typography>
          <Typography variant="body1" className="font-bold text-green-800">
            Note:{' '}
            <span className="font-normal text-green-600">
              {stock.note ? stock.note : '-'}
            </span>
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default StockDetailMobileComponent;
