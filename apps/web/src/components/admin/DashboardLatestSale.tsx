'use client';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material';
import { axiosInstance } from '@/axios/axios';
import moment from 'moment';

interface Order {
  id: string;
  createdAt: Date;
  name: string;
  status: string;
  totalSales: number;
}

interface StoreId {
  storeId: string;
}

const DashboardLatestSales: React.FC<StoreId> = ({ storeId }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const fetchOrders = () => {
    axiosInstance()
      .get('/summaries/v6', {
        params: { storeId },
      })
      .then((res) => {
        setOrders(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOrders();
  }, [storeId]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const renderStatusIndicator = (status: Order['status']) => {
    switch (status) {
      case 'deliveryDone':
        return <div className=" text-green-500">Done</div>;
      case 'cancelled':
        return <div className=" text-red-500">Cancelled</div>;
      case 'paymentPending':
        return <div className=" text-orange-500">Payment Pending</div>;
      case 'paymentConfirmation':
        return <div className=" text-amber-500">Payment Confirmation</div>;
      case 'processing':
        return <div className=" text-blue-500">Processing</div>;
      case 'delivered':
        return <div className=" text-lime-500">Delivered</div>;
      default:
        return <div>Status Unknown</div>;
    }
  };

  if (isSmallScreen) {
    return (
      <Box>
        {orders.map((order, index) => (
          <Paper key={order.id} className="mb-4 p-4">
            <div className=" flex justify-between items-center">
              <div>
                <Typography variant="body1" className="font-bold">
                  Date:{' '}
                  <span className="font-normal">
                    {moment(order.createdAt).format('DD-MM-YYYY')}
                  </span>
                </Typography>
                <Typography variant="body1" className="font-bold">
                  Customer: <span className="font-normal">{order.name}</span>
                </Typography>
                <Typography variant="body1" className="font-bold">
                  Total (IDR):{' '}
                  <span className="font-normal">
                    {order.totalSales.toLocaleString('id-ID')}
                  </span>
                </Typography>
              </div>
              <div className=" max-w-36 text-right">
                {renderStatusIndicator(order.status)}
              </div>
            </div>
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} className="overflow-x-auto">
      <Table className="min-w-[650px]" aria-label="simple table">
        <TableHead>
          <TableRow className="bg-green-500">
            <TableCell className="text-white">Date</TableCell>
            <TableCell className="text-white">Customer</TableCell>
            <TableCell className="text-white">Status</TableCell>
            <TableCell className="text-white">Total (IDR)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell component="th" scope="row">
                {moment(order.createdAt).format('DD-MM-YYYY')}
              </TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{renderStatusIndicator(order.status)}</TableCell>
              <TableCell>{order.totalSales.toLocaleString('id-ID')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default DashboardLatestSales;
