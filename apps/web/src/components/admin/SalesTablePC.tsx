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
import Link from 'next/link';
import { Sales } from './SalesReportDay';

interface SalesTableProps {
  sales: Sales[];
}
const SalesTablePCComponent: React.FC<SalesTableProps> = ({ sales }) => {
  return (
    <TableContainer component={Paper} className="overflow-x-auto">
      <Table className="min-w-[650px]" aria-label="simple table">
        <TableHead>
          <TableRow className="bg-green-500">
            <TableCell align="center">Day</TableCell>
            <TableCell align="center">Total Sales (IDR)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.map((sale, index) => (
            <TableRow key={index}>
              <TableCell align="center">{sale.day}</TableCell>
              <TableCell align="center">
                {sale.totalSales.toLocaleString('id-ID')}
              </TableCell>
              {/* <TableCell>
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
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default SalesTablePCComponent;
