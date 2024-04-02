'use client';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import CarouselItem from './CarouselItem';

const CarouselComponent = () => {
  const items = [
    {
      id: 1,
      image: 'carousel1.webp',
      title: 'This is pic 1',
    },
    {
      id: 2,
      image: 'carousel2.webp',
      title: 'This is pic 2',
    },
    {
      id: 3,
      image: 'carousel3.webp',
      title: 'this is pic 3',
    },
  ];
  return (
    <Carousel navButtonsAlwaysVisible={true}>
      {items.map((item, i) => (
        <CarouselItem key={i} item={item} />
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
