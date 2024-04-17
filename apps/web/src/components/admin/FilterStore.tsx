'use client';
import React, { useEffect, useState } from 'react';
import DashboardProfit from './DashboardProfit';
import DashboardSales from './DashboardSales';
import DashboardOrders from './DashboardOrders';
import DashboardCancelled from './DashboardCancelled';
import DashboardLatestSale from './DashboardLatestSale';
import DashboardTopSales from './DashboardTopSales';
import { axiosInstance } from '@/axios/axios';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useSelector } from 'react-redux';
import { Store } from './DashboardContent';

interface FilterStoreProps {
  stores: Store[];
  store: string;
  setStore: Function;
}

const FilterStoreComponent: React.FC<FilterStoreProps> = (props) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    props.setStore(event.target.value);
  };
  return (
    <>
      {' '}
      <FormControl variant="outlined" style={{ minWidth: 120 }}>
        <InputLabel id="store-select-label">Branch</InputLabel>
        <Select
          labelId="store-select-label"
          id="storeId"
          value={props.store}
          onChange={handleChange}
          label="Branch"
        >
          <MenuItem value={''}>All Branch</MenuItem>
          {props.stores.map((store) => (
            <MenuItem key={store.id} value={store.id}>
              {store.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default FilterStoreComponent;
