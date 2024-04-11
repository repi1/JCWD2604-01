import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NumberAnimator = ({ target }) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [formattedNumber, setFormattedNumber] = useState('0');
  const duration = 2000;

  useEffect(() => {
    let start = Date.now();
    let interval = setInterval(() => {
      let timePassed = Date.now() - start;
      if (timePassed >= duration) {
        clearInterval(interval);
        setDisplayNumber(target);
        setFormattedNumber(target.toLocaleString('id-ID'));
        return;
      }
      let randomNum = Math.floor(Math.random() * target);
      setDisplayNumber(randomNum);
    }, 100);

    return () => clearInterval(interval);
  }, [target]);

  useEffect(() => {
    setFormattedNumber(displayNumber.toLocaleString('id-ID'));
  }, [displayNumber]);
  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {formattedNumber}
    </motion.div>
  );
};

export default NumberAnimator;
