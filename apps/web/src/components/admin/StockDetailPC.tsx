'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { StockDetail } from '@/app/admin/stock-history/[stockId]/page';
import moment from 'moment';

interface StockDetailProps {
  stocks: StockDetail[];
}

function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

const StockDetailPCComponent: React.FC<StockDetailProps> = ({ stocks }) => {
  return (
    <TableContainer component={Paper} className="overflow-x-auto">
      <Table className="min-w-[650px]" aria-label="simple table">
        <TableHead>
          <TableRow className="bg-green-500">
            <TableCell>No</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Invoice No.</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((stock, index) => {
            const status = stock.invoiceNo ? 'sold' : stock.status;
            const statusColor =
              status === 'sold'
                ? 'text-green-500'
                : status === 'out'
                  ? 'text-red-500'
                  : 'text-blue-500';

            return (
              <TableRow key={stock.id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>
                  {moment(stock.createdAt).format('DD MMMM YYYY')}
                </TableCell>
                <TableCell>{stock.invoiceNo ? stock.invoiceNo : '-'}</TableCell>
                <TableCell>
                  <div className={statusColor}>
                    {capitalizeFirstLetter(status)}
                  </div>
                </TableCell>
                <TableCell>{stock.qty.toLocaleString('id-ID')}</TableCell>
                <TableCell>{stock.note ? stock.note : '-'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockDetailPCComponent;
