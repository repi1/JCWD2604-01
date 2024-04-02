import Image from 'next/image';
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={`${product.title}`}
        height="140"
        image={`/product-image/${product.img}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rp. {product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add To Cart</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
