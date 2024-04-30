'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import QuantityInput from './QuantityInput';
import axios from 'axios';
import Swal from 'sweetalert2';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/cart`);
        const userData = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();

    return () => {
      // Cleanup logic
    };
  }, []);

  async function addToCart() {
    try {
      const postData = {
        userId: '1',
        productId: product.id,
        quantity: quantity,
      };
      const response = await axios.post('http://localhost:8000/cart', postData);
      Swal.fire({
        title: 'Success!',
        text: 'Add Product To cart!',
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Failed to Add to Cart',
      });
    }
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={`${product.name}`}
        height="140"
        image={`http://localhost:8000/${product.productPhotos[0].photoURL}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rp. {product.price}
        </Typography>
        <QuantityInput onChange={setQuantity} />
      </CardContent>
      <CardActions>
        <Button size="small" onClick={addToCart}>
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
