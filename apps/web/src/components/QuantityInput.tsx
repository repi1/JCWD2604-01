'use client';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface QuantityInputProps {
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  onChange: (value: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  initialValue = 1,
  minValue,
  maxValue,
  onChange,
}) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleIncrement = () => {
    if (maxValue === undefined || quantity < maxValue) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      onChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (minValue === undefined || quantity > minValue) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      onChange(quantity - 1);
    }
  };

  return (
    <div className="flex">
      <Button
        onClick={handleDecrement}
        className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
      >
        -
      </Button>
      <TextField
        type="number"
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
        className="mx-2"
      />
      <Button
        onClick={handleIncrement}
        className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
      >
        +
      </Button>
    </div>
  );
};

export default QuantityInput;
