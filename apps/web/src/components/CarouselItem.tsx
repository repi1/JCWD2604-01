import React from 'react';
import { Paper, Button } from '@mui/material';
import Image from 'next/image';

const CarouselItem = ({ item }) => {
  return (
    <Paper className="w-full h-[300px]">
      <Image src={`/${item.image}`} alt={item.id} fill />
      <h2>{item.title}</h2>
    </Paper>
  );
};

export default CarouselItem;
