import React from 'react';

const Address = ({ address }) => {
  return (
    <div className="p-4 m-4 border border-black rounded-md bg-orange-100">
      {address && <h1>{address.streetName}</h1>}
    </div>
  );
};

export default Address;
