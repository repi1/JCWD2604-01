'use client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { productData } from './data/productData';
import { useEffect } from 'react';
import axios from 'axios';
import { axiosInstance, axiosInstanceSSR } from '@/axios/axios';
import { useDebounce } from 'use-debounce';

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
  const [allCategory, setAllCategory] = useState(null);
  const [susuCategory, setSusuCategory] = useState(null);
  const [buahCategory, setBuahCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [searchValue] = useDebounce(search, 500);

  function fetchProducts() {
    axiosInstance()
      .get('/products', {
        params: {
          name: search,
          category_name: category,
        },
      })
      .then((res) => {
        setProducts(res.data.result);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/products?name&category_name',
        );
        const productData = response.data.result;
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchProducts();

    return () => {
      // Cleanup logic
    };
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="w-full bg-orange-100">
      <div className="flex items-center gap-3  border-gray-300 border-b">
        <input
          type="search"
          placeholder="Search any products"
          className=" outline-none bg-orange-100"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Susu Dan Olahan" {...a11yProps(0)} />
            <Tab label="Buah" {...a11yProps(1)} />
            <Tab label="Semua Kategori" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {products
              .filter(
                (product) => product.categories.name === 'Susu dan Olahan',
              )
              .map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {products
              .filter((product) => product.categories.name === 'Sayur')
              .map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default ProductTab;
