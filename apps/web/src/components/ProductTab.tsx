'use client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { productData } from './data/productData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ProductTab = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="Susu Dan Olahan" {...a11yProps(0)} />
          <Tab label="Sayur" {...a11yProps(1)} />
          <Tab label="Buah" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="grid grid-cols-2 gap-5">
          {productData
            .filter((product) => product.category === 'susu dan olahan')
            .map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="grid grid-cols-2 gap-5">
          {productData
            .filter((product) => product.category === 'sayur')
            .map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <div className="grid grid-cols-2 gap-5">
          {productData
            .filter((product) => product.category === 'buah')
            .map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>
      </CustomTabPanel>
    </Box>
  );
};

export default ProductTab;
