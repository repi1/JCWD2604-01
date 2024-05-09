'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const KurirCost = ({ userCity, storeCity, weight, productTotal, storeId }) => {
  const [jnePrice, setJnePrice] = useState(0);
  const [tikiPrice, setTikiPrice] = useState(0);
  const [selectedCourier, setSelectedCourier] = useState(null);
  const [grandTotal, setGrandTotal] = useState(0);
  const userSelector = useSelector((state) => state.auth);

  const handleChange = (event) => {
    setSelectedCourier(event.target.value);
  };

  const makeOrder = async () => {
    try {
      const total = Number(productTotal) + Number(selectedCourier);

      const response = await axios.post('http://localhost:8000/order', {
        storeId: storeId,
        userId: userSelector?.id,
        total: total,
      });
      Swal.fire({
        title: 'Good job!',
        text: 'Order Created',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Create Order',
        text: 'Something went wrong!',
      });
    }
  };

  useEffect(() => {
    const fetchPrice = async () => {
      console.log(userCity);
      console.log(storeCity);

      try {
        const jneResponse = await axios.post('http://localhost:8000/kurir', {
          weight: Number(weight),
          userCity,
          storeCity,
          kurir: 'jne',
        });
        const jneData = jneResponse.data.value;
        console.log(jneData);
        setJnePrice(jneData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchPrice();

    return () => {};
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const tikiResponse = await axios.post('http://localhost:8000/kurir', {
          weight: Number(weight),
          userCity,
          storeCity,
          kurir: 'tiki',
        });
        const tikiData = tikiResponse.data.value;
        setTikiPrice(tikiData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchPrice();

    return () => {};
  }, [jnePrice]);

  return (
    <div>
      {/* <h1>{userCity}</h1>
      <h1>{storeCity}</h1> */}
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          Choose Your Courier
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={selectedCourier}
          onChange={handleChange}
          name="radio-buttons-group"
        >
          <FormControlLabel
            value={jnePrice}
            control={<Radio />}
            label={`JNE: ${jnePrice}`}
          />
          <FormControlLabel
            value={tikiPrice}
            control={<Radio />}
            label={`TIKI: ${tikiPrice}`}
          />
        </RadioGroup>
        {selectedCourier && <h1>{`Kurir Price: ${selectedCourier}`}</h1>}
      </FormControl>
      <h1 className="text-xl font-bold mt-3">
        Grand Total: {String(Number(productTotal) + Number(selectedCourier))}
      </h1>
      <Link href="http://localhost:3000/">
        {selectedCourier ? (
          <Button variant="contained" onClick={makeOrder}>
            Order
          </Button>
        ) : (
          <Button variant="contained" onClick={makeOrder} disabled>
            Order
          </Button>
        )}
      </Link>
    </div>
  );
};

export default KurirCost;
