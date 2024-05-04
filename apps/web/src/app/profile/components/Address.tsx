import React from 'react';

const Address = ({ address }) => {
  return <div>{address && <h1>{address.streetName}</h1>}</div>;
};

export default Address;
