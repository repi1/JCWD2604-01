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
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Stock } from './StockHistory';
import Link from 'next/link';

interface StockContentProps {
  stocks: Stock[];
}
const StockContentPCComponent: React.FC<StockContentProps> = ({ stocks }) => {
  return (
    <TableContainer component={Paper} className="overflow-x-auto">
      <Table className="min-w-[650px]" aria-label="simple table">
        <TableHead>
          <TableRow className="bg-green-500">
            <TableCell>No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Store</TableCell>
            <TableCell>In</TableCell>
            <TableCell>Out</TableCell>
            <TableCell>Current Stock</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((stock, index) => (
            <TableRow key={stock.id}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{stock.name}</TableCell>
              <TableCell>{stock.store}</TableCell>
              <TableCell>{stock.in.toLocaleString('id-ID')}</TableCell>
              <TableCell>{stock.out.toLocaleString('id-ID')}</TableCell>
              <TableCell>{stock.totalStock.toLocaleString('id-ID')}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default StockContentPCComponent;
